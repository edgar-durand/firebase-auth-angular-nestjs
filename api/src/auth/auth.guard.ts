import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import * as admin from "firebase-admin";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor() {
  }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.replace('Bearer ', '')
    try {
      await admin.auth().verifyIdToken(token)
      return true;
    } catch (e) {
      console.log(e)
      throw new UnauthorizedException()
    }
  }
}