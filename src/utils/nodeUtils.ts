//UTILITY FUNCTIONS THAT ONLY WORK WITH NODE JS

import crypto from "crypto";

export { hash };

function hash(
  string: string,
  algorithm:
    | "sha128"
    | "sha224"
    | "sha256"
    | "sha384"
    | "sha512"
    | "md5" = "sha256"
) {
  try {
    const hashCode = crypto.createHash(algorithm).update(string).digest("hex");
    return hashCode;
  } catch (error) {
    return undefined;
  }
}
