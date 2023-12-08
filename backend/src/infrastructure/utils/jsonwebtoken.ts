import { Jsonwebtoken, Sign, Verify } from "@/domain/contracts/utils";
import { sign, verify } from "jsonwebtoken";

export class JsonwebtokenUtils implements Jsonwebtoken {
  sign(input: Sign.Input): Sign.Output {
    return sign({ email: input.email }, input.key, { subject: input.subject, expiresIn: input.expiresIn });
  }
  verify(input: Verify.Input): Verify.Output {
    return verify(input.token, input.key);
  }
}
