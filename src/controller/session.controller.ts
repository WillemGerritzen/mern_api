import {Request, Response} from 'express';
import {validatePassword} from "../service/user.service";
import {createSession, findSessions, updateSession} from "../service/session.service";
import {signJwt} from "../utils/jwt.utils";

export async function createUserSessionHandler(req: Request, res: Response) {
    const user = await validatePassword(req.body);

    if (!user) {
        return res.status(401).send("Invalid username or password");
    }

    const session = await createSession(user._id, req.get("user-agent") || "");

    const accessToken = signJwt(
        {...user, session: session._id},
        {expiresIn: process.env.ACCESS_TOKEN_TTL}
    );

    const refreshToken = signJwt(
        {...user, session: session._id},
        {expiresIn: process.env.REFRESH_TOKEN_TTL}
    );

    return res.send({accessToken, refreshToken});


}

export async function getUserSessionsHandler(req: Request, res: Response) {
    const userId = res.locals.user._id;

    const sessions = await findSessions({user: userId, valid: true});

    return res.send(sessions);
}

export async function deleteUserSessionHandler(req: Request, res: Response) {
    const session = res.locals.user.session;

    await updateSession({ _id: session }, { valid: false });

    return res.send({
        accessToken: null,
        refreshToken: null
    });
}