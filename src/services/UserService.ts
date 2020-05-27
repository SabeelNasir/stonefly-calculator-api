import { Users } from "../models/entities/Users";
import { getManager } from "typeorm";
import crypto from "crypto";
import _ from "lodash";
import { JwtUtil } from "../utils/JwtUtil";
export class UserService {
  jwtUtil: JwtUtil = new JwtUtil();
  constructor() { }

  async userLogin(_loginData: any) {
    try {
      console.log(crypto
        .createHash("md5")
        .update(_loginData.password)
        .digest("hex"));
      const user: Users = await getManager()
        .getRepository(Users)
        .findOne({
          where: [
            {
              email: _loginData.email,
              password: crypto
                .createHash("md5")
                .update(_loginData.password)
                .digest("hex")
            }
          ]
        });
      if (!_.isEmpty(user)) {
        let userInfo: any = {
          id: user.userId,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          userRole: user.userRole,
          fullName: user.firstName + ' ' + user.lastName
        };
        return {
          token: this.jwtUtil.generateAuthToken(userInfo),
          userRole: user.userRole,
          profile: userInfo
        }
      } else {
        throw new Error("Invalid Credentials");
      }
    } catch (err) {
      throw err;
    }
  }
}
