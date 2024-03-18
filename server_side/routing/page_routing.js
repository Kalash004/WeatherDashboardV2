import express from 'express';
import { getSessionFromToken } from "../services/sessionServices/sessionService.js"
import 'dotenv/config';



export const router = express.Router()
router.get("/", (req, res) => {
    res.render("index");
})
router.get("/home", isAuth, (req, res) => {
    res.render("home", { username: getSessionFromToken(req.cookies['session_token']).username })
})
router.get("/chats", (req, res) => {
    res.render("chatdashboard")
})
router.get("/chat/:id", isAuth, chatConnectionHandler)