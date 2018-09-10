import { Component, OnInit } from '@angular/core';
import { Contact } from '../../classes/contact';
import { FormGroup, FormBuilder, Validator, Validators, EmailValidator} from '@angular/forms';
import { ApplyserviceService } from '../../services/applyservice.service';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers:[ApplyserviceService]
})
export class ContactComponent implements OnInit {
  
  isFailedMessage : boolean = false;
  isSuccessMessage : boolean = false;
message = "";

  public globalResponse : any;
  contactForm:FormGroup;
  inputContact:Contact;

  constructor(fb: FormBuilder, 
    private contactService:ApplyserviceService,
    private toastr:ToastrService,
    private router: Router,
  ) { 
    this.contactForm = fb.group({
      name: ['', <any>Validators.required],
      mobile: ['', [<any>Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      emailId: ['', <any>Validators.email],
      msg: ['', <any>Validators.required]

    });
  }
 resetFields()
 {
  this.contactForm.reset();
 }

  ngOnInit() {
   
  }
  submitForm()
  {
    console.log(this.contactForm.value);
    this.inputContact = this.contactForm.value;
    console.log(this.inputContact);
      this.contactService.insertContact(this.inputContact)
        .subscribe((result) => {
          this.globalResponse = result;
        },
        error => {
          console.log(error);
          this.isFailedMessage=true;
          this.message="Failed to contact!";
          this.toastr.error(this.message);
        },
        () => {
          this.isSuccessMessage = true;
          this.message = "Notification send succesfully.";
          this.toastr.success(this.message);
        }
        
      )
      this.resetFields();
  }

  cancelContact()
  {
    this.router.navigate(['/']);
  }
}
