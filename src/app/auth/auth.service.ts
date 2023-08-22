import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, tap, throwError} from "rxjs";
import {User} from "./user.model";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import * as fromApp from "../store/app.reducer"
import {login, logout} from "./store/auth.actions";

export interface Response {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //user = new BehaviorSubject<User>(null);
  tokenExpirationTime: any;

  constructor(private http: HttpClient,
              private router: Router,
              private store: Store<fromApp.AppState>) {
  }

  signup(email: string, password: string) {
    return this.http
      .post<Response>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyChb_2ewNVkCkxdlrYHSZBYbpmbFFUplAI',
        {
          email: email,
          password: password,
          returnSecureToken: true
        }).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
          }
        )
      );
  }

  signIn(email: string, password: string) {
    return this.http
      .post<Response>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyChb_2ewNVkCkxdlrYHSZBYbpmbFFUplAI',
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(catchError(this.handleError), tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      )
  }

  autoLogin() {
    const user: {
      email: string,
      id: string,
      _token: string
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!user) {
      return;
    }
    const loadedUser = new User(user.email, user.id, user._token, new Date(user._tokenExpirationDate));
    if (loadedUser.token) {
      //this.user.next(loadedUser);
      this.store.dispatch(login({
            email: loadedUser.email,
            userId: loadedUser.id,
            token: loadedUser.token,
            expirationDate: new Date(user._tokenExpirationDate),
          }))
      const expirationDuration
        = new Date(user._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    //this.user.next(null);
    this.store.dispatch(logout());
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTime) {
      clearTimeout(this.tokenExpirationTime);
    }
    this.tokenExpirationTime = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTime = setTimeout(() => {
      this.logout()
    }, expirationDuration);
  }

  private handleError(errResponse: HttpErrorResponse) {
    let errorMessage = 'Unknown error occurred';
    if (!errResponse.error || !errResponse.error.error) {
      return throwError(() => errorMessage);
    }
    switch (errResponse.error.error.message) {
      case 'EMAIL_EXISTS': {
        errorMessage = 'This email exist, please try logging in.';
        break;
      }
      case 'OPERATION_NOT_ALLOWED': {
        errorMessage = 'Password sign-in is disabled for this project.';
        break;
      }
      case 'TOO_MANY_ATTEMPTS_TRY_LATER': {
        errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
        break;
      }
      case 'EMAIL_NOT_FOUND': {
        errorMessage = 'There Email does NOT exist, please Sign Up ';
        break;
      }
      case 'INVALID_PASSWORD': {
        errorMessage = 'The password is invalid';
        break;
      }
      case 'USER_DISABLED': {
        errorMessage = 'You are banned';
        break;
      }
    }
    return throwError(() => errorMessage);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    //this.user.next(user);
    this.store.dispatch(login({
          email: email,
          userId: userId,
          token: token,
          expirationDate: expirationDate,
        }));
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

}
