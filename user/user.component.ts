import { ToastrService } from 'ngx-toastr';
import { UserService } from './../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NullTemplateVisitor } from '@angular/compiler';
import { print } from 'util';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService, private toastr: ToastrService) {

  }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {

    if (form != null) {
      form.reset();
    }

    // const data = this.userService.selectedUser;

    // for (const key in data) {
    //   if (data.hasOwnProperty(key)) {
    //     const element = data[key];
    //     console.log(element);
    //   }
    // }
    this.userService.selectedUser = {
      ID: null,
      FIRST_NAME: '',
      LAST_NAME: '',
      DETAILS: '',
      FULL_NAME: '',
      PASSWORD: '',
      Position: '',
      USERNAME: ''
    };
  }

  onSubmit(form?: NgForm) {
    if (form.value.ID == null) {
      this.userService.postUser(this.userService.selectedUser)
        .subscribe(data => {
          this.resetForm(form);
          this.userService.getUsersList();
          this.toastr.success('New Record Added Succecfully', 'Employee register');
        });
    } else {
      // update
      this.userService.putUser(form.value.ID, this.userService.selectedUser)
      .subscribe(data => {
        this.resetForm(form);
        this.userService.getUsersList();
        this.toastr.success('Update Record Succecfully', 'Employee register');
      });
    }
  }

}
