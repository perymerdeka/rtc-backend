import { Router } from "express";
import { generateMeetingUrl, getMeetingId } from "../controllers/meetingController";

const router = Router();

router.post('/create-meeting', generateMeetingUrl);
router.get('/meeting/:id', getMeetingId);

export default router;