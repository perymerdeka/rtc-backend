async function generateMeetingId(): Promise<string> {
  return new Promise((resolve) => {
      const characters = 'abcdefghijklmnopqrstuvwxyz';
      const segments = [];

      for (let i = 0; i < 3; i++) {
          let segment = '';
          for (let j = 0; j < 3; j++) {
              segment += characters.charAt(Math.floor(Math.random() * characters.length));
          }
          segments.push(segment);
      }
      const meetingId = segments.join('-');
      console.log(`new meeting id generated: ${meetingId}`);
      resolve(meetingId);
  });
}

export { generateMeetingId };
