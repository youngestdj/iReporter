import redFlagFilled from '../helper';
import redFlags from '../mockdata';

export const createRedFlag = (request, response) => {
  if (!redFlagFilled(request.body)) {
    response.status(422).json({ status: 422, error: 'invalid data' });
  } else {
    const id = redFlags.length + 1;
    const title = request.body.title.trim();
    const dateObj = new Date();
    const createdOn = `${dateObj.getFullYear()} / ${(dateObj.getMonth() + 1)} / ${dateObj.getDate()}`;
    const status = 'new';
    const createdBy = 1;
    const type = 'red-flag';
    const location = request.body.location.trim();
    const comment = request.body.comment.trim();

    const data = {
      id, title, createdOn, status, createdBy, type, location, comment,
    };

    redFlags.push(data);
    response.status(201).json({ status: 201, data: [{ id, message: 'created red-flag record' }] });
  }
};

export const getRedFlags = (request, response) => {
  response.status(200).json({ status: 200, data: redFlags });
};
