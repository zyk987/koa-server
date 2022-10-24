import jwt from "jsonwebtoken";

var secret = "talkyapp";

const generateToken = function (e: string) {
  let payload = { id: e, time: new Date() };
  let token = jwt.sign(payload, secret, { expiresIn: 60 * 60 * 24 * 120 });
  return token;
};

const verifyToken = function (e: string) {
  let payload;
  jwt.verify(e, secret, function (err, result) {
    if (err) {
      payload = 0;
    } else {
      payload = 1;
    }
  });
  return payload;
};

export { generateToken, verifyToken };
