import 'dotenv/config';
import { v4 as uuid } from 'uuid';
import Session from './model_session';

export const cur_sessions = {}

export const generateSession = (username) => {
    const token = uuid();
    const nowTime = new Date();
    const expiresAt = new Date(+nowTime + process.env.SECONDS_BEFORE_EXPIRATION * 1000);
    const session = new Session(username, expiresAt);
    cur_sessions[token] = session;
    return { token: token, expires: expiresAt }
}

export const getSessionFromToken = (sessionToken) => {
    return cur_sessions[sessionToken];
}

export const removeSession = (sessionToken) => {
    delete cur_sessions[sessionToken];
}

export const findSessionByName = (username) => {
    for (const [key, value] of Object.entries(cur_sessions)) {
        if (value.username == username) {
            return key
        }
    }
} 