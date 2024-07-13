import { Request, Response } from 'express';
import { generateMeetingId } from '../../utils/generateMeetingId';

const createMeeting = (req: Request, res: Response) => {
  const meetingId = generateMeetingId();
  console.log(`new meeting id generated: ${meetingId}`);
  res.json({ meetingId });
};

const getMeetingId = (req: Request, res: Response) => {
  const meetingId = req.params.id;
  res.json({ meetingId });
};

export { createMeeting, getMeetingId };
