import Login from "../models/entities/Login";
import { typeorm } from "../models/database";
import { hash } from "../utils/nodeUtils";
import { validateEmail } from "./validateUtils";

export { isSignupEmailAvailable };

async function isSignupEmailAvailable(email: string) {
  // if (!email) throw new Error("ERROR: email is required");
  // if (typeof email !== "string") throw new Error("ERROR: invalid email");
  validateEmail(email);
  await typeorm.initialized();
  const emailHash = hash(email);
  const matchingEmailHash = { emailHash };
  const logins = typeorm.manager.getRepository(Login);
  const result = await logins.findOneBy(matchingEmailHash);
  if (result) return false;
  else return true;
}
