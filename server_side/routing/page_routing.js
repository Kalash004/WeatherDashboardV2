import express from 'express';
import { getSessionFromToken } from "../services/session_service/session_service.js"
import 'dotenv/config';



export const router = express.Router()

router.get("/", (req, res) => {
    res.render("index");
})