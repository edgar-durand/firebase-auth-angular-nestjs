import { Injectable } from "@nestjs/common";
import { IResponse } from "../interfaces/api-interfaces";
import { responseToInterface } from "../helpers/return-utils";
import * as admin from "firebase-admin";

@Injectable()
export class UserService {
constructor() {}

  /**
   * List all Users
   */
  async list(): Promise<IResponse> {
  try {
    const users = await admin.auth().listUsers();
    return responseToInterface(users);
  }catch (e) {
    return responseToInterface({}, false, e.message)
  }
  }
}
