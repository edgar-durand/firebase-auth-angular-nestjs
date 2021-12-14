import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpService} from "./http.service";
import {BehaviorSubject} from "rxjs";
import {IResponse} from "../interfaces/IResponse";
import {StorageService} from "./storage.service";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, User} from "firebase/auth";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: BehaviorSubject<User> = new BehaviorSubject<User>(<User><unknown>null)
  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
    private router: Router
  ) {
    getAuth().onAuthStateChanged((user) => {
      if (user){
        this.user$.next(user);
        console.log('Current user....', user)
        this.router.navigate(['/'])
      }
    })

  }

  /**
   * Token validator
   */
  public isAuthenticated(): boolean {
    return !!(getAuth().currentUser)
  }

  /**
   * Login to system
   *
   * @param username
   * @param password
   */
  public async signIn(username: string, password: string): Promise<IResponse> {
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, username, password);

      // Signed in
      const user = userCredential.user;
      this.initUser(user);
      return {
        result: true,
        data: user,
        message: 'success',
      }
    } catch (e: any) {
      return {
        result: false,
        data: e.errors,
        message: e.message,
      }
    }
  }

  /**
   * Signup
   *
   * @param signup
   */
  async signup(signup: { username: string; password: string; }): Promise<IResponse> {
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, signup.username, signup.password)

      // Signed in
      this.initUser(userCredential.user)
      // ...
      return {
        result: true,
        data: userCredential,
        message: 'success'
      }
    } catch (e: any) {
      console.log(e)
      return {
        result: false,
        data: {},
        message: e.message
      }
    }
  }

  /**
   * Save current token to localStorage and set user data
   *
   * @param data
   */
  initUser(data: User) {
    if (data) {
      this.storageService.setKeyFromJSON('user-data', data);
      this.user$.next(data)
    }
  }
}
