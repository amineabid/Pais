import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
@Component({
  selector: 'app-cnss-convention',
  templateUrl: './cnss-convention.component.html',
  styleUrls: ['./cnss-convention.component.scss']
})
export class CnssConventionComponent implements OnInit {

  formData = {}
  console = console;
  basicForm: FormGroup;
  hide = true;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    let password = new FormControl('', Validators.required);
    let confirmPassword = new FormControl('', CustomValidators.equalTo(password));

    this.basicForm = new FormGroup({
      username: new FormControl('', [
        Validators.minLength(4),
        Validators.maxLength(9)
      ]),
      firstname: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      website: new FormControl('', CustomValidators.url),
      date: new FormControl(),
      cardno: new FormControl('', [
        CustomValidators.creditCard
      ]),
      password: password,
      confirmPassword: confirmPassword,
      gender: new FormControl('', [
        Validators.required
      ]),
      agreed: new FormControl('', (control: FormControl) => {
        const agree = control.value;
        if(!agree) {
          return { agree: true }
        }
        return null;
      })
    })
  }

  
}
