import { Request, Response } from "express";
import { UserInputDTO, LoginInputDTO } from "../business/entities/User";
import { CustomError } from "../business/error/CustomError";
import { Authenticator } from "../business/services/Authenticator";
import { HashManager } from "../business/services/HashManager";
import { IdGenerator } from "../business/services/IdGenerator";
import { UserBusiness } from "../business/UserBusiness";
import { UserDatabase } from "../data/UserDatabase";

const userBusiness = new UserBusiness(
  new IdGenerator(),
  new HashManager(),
  new Authenticator(),
  new UserDatabase()
);

export class UserController {
  async signup(req: Request, res: Response) {
    try {
      const input: UserInputDTO = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      };

      if (!input.name || !input.email || !input.password || !input.role) {
        throw new CustomError(422, "Missing input");
      }
      if (input.email.indexOf("@") === -1) {
        throw new CustomError(422, "Invalid email");
      }
      if (input.password.length < 6) {
        throw new CustomError(422, "Invalid password");
      }

      const token = await userBusiness.createUser(input);

      res.status(200).send({ token });
    } catch (error) {
      res.status(error.statusCode || 400).send({ error: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const loginData: LoginInputDTO = {
        email: req.body.email,
        password: req.body.password,
      };

      const token = await userBusiness.getUserByEmail(loginData);

      res.status(200).send({ token });
    } catch (error) {
      res.status(error.statusCode || 400).send({ error: error.message });
    }
  }
}
