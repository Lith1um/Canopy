import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { fcPassword, fcTextInput } from '@shared/helpers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  fields: FormlyFieldConfig[] = [];
  model: any = {
    username: 'AlexRayner',
    password: 'Password1!'
  };
  form = new FormGroup({});
  options: FormlyFormOptions = {};

  rememberMe = true;

  constructor(
    private router: Router,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.configureFields();
  }

  configureFields(): void {
    this.fields = [
      fcTextInput(
        'username',
        'Email or Username',
        {
          required: true
        }
      ),
      fcPassword(
        'password',
        'Password',
        {
          required: true
        }
      )
    ]
  }

  login(): void {
    this.form.markAllAsTouched();

    if (!this.form.valid) {
      return;
    }

    this.authService.isAuthenticated = true;
    this.router.navigate(['/app']);
  }

}
