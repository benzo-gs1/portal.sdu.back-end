import jwt from "jsonwebtoken";

const secret = process.env.USER_TOKEN_SECRET;

export default class TokenService {
  static create(data, lifeTime = "3H") {
    return jwt.sign(data, secret, { expiresIn: lifeTime, algorithm: "RS256" });
  }

  static validate(token) {
    try {
      const result = jwt.verify(token, secret);
      return result;
    } catch (err) {
      return false;
    }
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
