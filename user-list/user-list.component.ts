import { User } from './../shared/user.model';
import { UserService } from './../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { Toast, ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(public userService: UserService, public toastr: ToastrService) { }

  ngOnInit() {
    this.userService.getUsersList();
  }

  showForEdit(usr: User) {
    try {
      this.userService.selectedUser = Object.assign({}, usr);
      console.log('done!');
    } catch (err) {
      console.log(err);
    }
  }

  deleteUser(usr: User) {
    if (confirm('Are you sure?') === true) {
      this.userService.deleteUser(usr)
        .subscribe(data => {
          this.userService.getUsersList();
          this.toastr.success('Update Record Succecfully', 'Employee register');
        });
    }
  }

}
