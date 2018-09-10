import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators, EmailValidator } from '@angular/forms';
import { ApplyserviceService } from '../../services/applyservice.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Register } from '../../classes/register';
import { error } from 'util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [ApplyserviceService]
})
export class RegisterComponent implements OnInit {

  hide = true;

  isFailedMessage: boolean = false;
  isSuccessMessage: boolean = false;
  message = "";

  public globalResponse: any;
  regForm: FormGroup;
  inputReg: Register;


  constructor(
    private registerService: ApplyserviceService,
    private fb: FormBuilder,
    private toaster: ToastrService,
    private router: Router
  ) {
    this.regForm = fb.group({
      uName: ['', [Validators.required]],
      mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      email: ['', [Validators.email, Validators.required]],
      pass: ['', Validators.required],
      repass: ['', [Validators.required]]
    });
  }
  resetFields() {
    this.regForm.reset();
  }
  ngOnInit() {
  }

  submit() {
    if (this.regForm.value.pass == this.regForm.value.repass) {
      this.inputReg = this.regForm.value;
      console.log(this.inputReg);
      this.registerService.register(this.inputReg)
        .subscribe((result) => {
          this.globalResponse = result;
        },
          error => {
            console.log(error);
            this.isFailedMessage = true;
            this.message = "Failed to register.";
            this.toaster.error(this.message);
          },
          () => {
            this.isSuccessMessage = true;
            this.message = "Registered succesfully.";
            this.toaster.success(this.message);
          }
        )
    }
    else
    {
      this.toaster.warning('Password shold not match with confirm password.')
    }

    this.resetFields();
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
