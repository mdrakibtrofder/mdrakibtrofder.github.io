import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { required } from "../config/env";

/** Single admin account, configured entirely through environment variables. */
@Injectable()
export class AuthService {
  constructor(private readonly jwt: JwtService) {}

  async login(email: string, password: string) {
    const adminEmail = required("ADMIN_EMAIL").toLowerCase();
    const hash = required("ADMIN_PASSWORD_HASH");
    const emailOk = email.trim().toLowerCase() === adminEmail;
    // Always run bcrypt so a wrong email takes as long as a wrong password.
    const passwordOk = await bcrypt.compare(password, hash);
    if (!emailOk || !passwordOk) throw new UnauthorizedException("Wrong email or password");
    const token = await this.jwt.signAsync({ sub: "admin", email: adminEmail });
    return { token, email: adminEmail };
  }
}
