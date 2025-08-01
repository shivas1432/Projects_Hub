import express, { Router } from "express";

import {
    getMessage,
    postMessage
} from "../controller/service.controller";

const router: Router = express.Router();

router.post('/post-message', postMessage);
router.get('/get-message', getMessage);

export default router;