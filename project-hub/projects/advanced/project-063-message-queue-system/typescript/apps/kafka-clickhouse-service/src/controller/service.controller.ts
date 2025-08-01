import {
    NextFunction,
    Request,
    Response
} from "express";

import {
    messages,
    producer
} from "../helper/service.helper";

export const postMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const message = req.body.message;

        await producer.connect();
        await producer.send({
            topic: 'test-topic',
            messages: [
                { key: 'test-message-key', value: message }
            ]
        });
        await producer.disconnect();

        res.json({ status: 200 });
    } catch (error) {
        return next(error)
    }
};

export const getMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(messages);
    } catch (error) {
        return next(error);
    }
}