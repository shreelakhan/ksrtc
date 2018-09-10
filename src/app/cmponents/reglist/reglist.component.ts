import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ApplyserviceService } from '../../services/applyservice.service';
import { Register } from '../../classes/register';
@Component({
  selector: 'app-reglist',
  templateUrl: './reglist.component.html',
  styleUrls: ['./reglist.component.css']
})
export class ReglistComponent implements OnInit {

  a:number;

  users: Register[];
  //reg:Observable<Register[]>;
  constructor( private regListService: ApplyserviceService) { }

  ngOnInit() {
    this.reloadData();
  }

  reloadData()
  {
    this.regListService.getRegList()
      .subscribe( data => {
        this.users = data;
      });
      console.log(this.users);
  }

  deleteReg(user: Register): void {
    
    this.regListService.deleteUser(user.id)
    
      .subscribe( data => {
        this.users = this.users.filter(u => u !== user);
      })
      
  }

  editUser(user: Register): void {
    localStorage.removeItem("editUserId");
    localStorage.setItem("editUserId", user.id.toString());
    //this.router.navigate(['edit-user']);
  } 

}
