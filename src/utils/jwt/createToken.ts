import { UserTokenInt, UserSchemaInt } from "../../ts/interfaces";

const createToken = (user: UserSchemaInt): UserTokenInt => {
  return { _id: user._id, name: user.name, role: user.role };
};

export default createToken;
