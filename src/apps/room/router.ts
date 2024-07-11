import { Router } from 'express';
import { createMeeting, getMeetingId } from './controller';

const router = Router();

router.post('/create-meeting', createMeeting);
router.get('/meeting/:id', getMeetingId);

export default router;
