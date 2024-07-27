import { Request, Response } from "express";
import { generateMeetingId } from "../utils/generateMeetingId";

const generateMeetingUrl = async (req: Request, res: Response): Promise<void> => {
    try {
        const meetingId = await generateMeetingId();
        res.send({ meetingId });
    } catch (error) {
        console.error("Failed to generate meeting ID:", error);
        res.status(500).send({ error: "Failed to generate meeting ID" });
    }
};

const getMeetingId = async (req: Request, res: Response): Promise<void> => {
    try {
        const meetingId = req.params.id;
        res.json({ meetingId });
    } catch (error) {
        console.error("Failed to get meeting ID:", error);
        res.status(500).send({ error: "Failed to get meeting ID" });
    }
};

export { generateMeetingUrl, getMeetingId };
