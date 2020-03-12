import jwt from "jsonwebtoken";

const secret = process.env.USER_TOKEN_SECRET;

export default class TokenService {
  static create(data, lifeTime = "1h") {
    return jwt.sign(data, secret, { expiresIn: lifeTime });
  }

  static verify(token) {
    return jwt.verify(token, secret);
  }

  static middle(req, res, next) {
    const header = req.headers["authorization"];

    if (header) {
      const bearer = header.split(" ");
      const token = bearer[1];

      req.token = token;
      next();
    }
    res.sendStatus(403);
  }
}
