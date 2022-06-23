import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { fcPassword, fcTextInput } from '@shared/helpers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  fields: FormlyFieldConfig[] = [];
  model: any = {};
  form = new FormGroup({});
  options: FormlyFormOptions = {};

  rememberMe = false;

  ngOnInit(): void {
    this.configureFields();
  }

  configureFields(): void {
    this.fields = [
      fcTextInput(
        'username',
        'Email Address',
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

    alert('Form submitted');
  }

}
