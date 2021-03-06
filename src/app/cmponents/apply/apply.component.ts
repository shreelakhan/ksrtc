import { Component, OnInit } from '@angular/core';
import { ApplyserviceService } from '../../services/applyservice.service';
import { Apply } from '../../classes/apply';
import { error } from '@angular/compiler/src/util';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css']
})
export class ApplyComponent implements OnInit {

  apply:Apply = new Apply();
  submitted = false;

  constructor( private applyServise: ApplyserviceService) { }

  toast : ToastrService;
  router : Router;
  ngOnInit() {
  }

  newApply():void{
    this.submitted = false;
    this.apply = new Apply();
  }

  save()
  {
    this.applyServise.apply(this.apply)
      .subscribe(data => console.log(data), error => console.log(error));
    this.apply = new Apply();
    this.toast.success('Applied Succesfully');
  }

  onSubmit()
  {
    this.submitted = true;
    this.save();
  }

  applyCancel()
  {
    this.router.navigate(['/']);
  }
}
