import { BcryptUtils } from "@/infrastructure/utils";

export const makeBcryptUtils = () : BcryptUtils => {
  return new BcryptUtils();
}
