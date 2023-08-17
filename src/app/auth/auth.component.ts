import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService, Response} from "./auth.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  constructor(private authService: AuthService,
              private router: Router) {
  }

  isLogInMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;

  onSwitchMode() {
    this.isLogInMode = !this.isLogInMode;
  }

  onFormSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    let authObservable: Observable<Response>;

    this.isLoading = true;
    if (this.isLogInMode) {
      authObservable = this.authService.signIn(email, password);
    } else {
      authObservable = this.authService.signup(email, password);
    }
    authObservable.subscribe({
      next: response => {
        console.log(response);
        this.router.navigate(['/recipes']);
        this.isLoading = false;
      },
      error: errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    });
    form.reset();
  }
}
