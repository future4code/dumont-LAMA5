import { Authenticator } from "../src/business/services/Authenticator";
import { HashManager } from "../src/business/services/HashManager";
import { IdGenerator } from "../src/business/services/IdGenerator";
import { UserBusiness } from "../src/business/UserBusiness";
import { UserDatabase } from "../src/data/UserDatabase";

describe("Testing signup Business", () => {
  const idGenerator = { generate: jest.fn(() => "suco de uva") } as IdGenerator;
  const hashGenerator = {} as HashManager;
  const authenticator = {} as Authenticator;
  const userDatabase = {} as UserDatabase;

  const userBusiness: UserBusiness = new UserBusiness(
    idGenerator,
    hashGenerator,
    authenticator,
    userDatabase
  );

  test("Shound return missing input error on empty name", async () => {
   
    try {
      await userBusiness.signup(
        "", 
      "vanessa@email.com", 
      "bolacha", 
      "normal");
    } catch (error) {
        console.log(error)
      expect(error.statusCode).toBe(422);
      expect(error.message).toEqual("Missing input");
    }
  });
});
