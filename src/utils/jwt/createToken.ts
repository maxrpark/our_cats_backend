import { UserTokenInt, UserSchemaInt } from "../../ts/interfaces/models";

const createToken = (user: UserSchemaInt): UserTokenInt => {
  return { _id: user._id, name: user.name, role: user.role };
};

export default createToken;
