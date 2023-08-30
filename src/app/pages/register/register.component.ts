import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    constructor(private userService: UserService,private router:Router){}
    public user = {
      loginId: '',
      firstName : '',
      lastName : '',
      email:'',
      contactNumber:'',
      password:'',
      confirmPassword:'',
      admin:false,
      users:false,
      roles:''
    }

    ngOnInit():void {}

    formSubmit(){
      let flag = false;
      if(this.user.loginId == '' || this.user.loginId == null){
        Swal.fire('','User Name is required !','info');
        flag = true;
          return;
      }
      if(this.user.firstName == '' || this.user.firstName == null){
        Swal.fire('','First Name is required','info');
        flag = true;
        return;
      }
      if(this.user.lastName == '' || this.user.lastName == null){
        Swal.fire('','Last Name is required !','info');
        flag = true;
        return;
      }
      if(this.user.admin == false && this.user.users == false){
        Swal.fire('','Select Role !','info');
        flag = true;
        return;
      }
      if(this.user.email == '' || this.user.email == null){
        Swal.fire('','Email is Required!','info');
        flag = true;
        return;
      }
      if(this.user.contactNumber == '' || this.user.contactNumber == null || this.user.password.length<9){
        Swal.fire('','Enter Correct Contact Number','info');
        flag = true;
        return;
      }
       if(this.user.password == '' || this.user.password == null || this.user.password.length < 7){
        Swal.fire('','Enter Valid Password!','info');
        flag = true;
        return;
      }
      if(this.user.password == this.user.confirmPassword && !flag){
        if(this.user.admin == true){
          this.user.roles = 'admin';
        }
        else{
          this.user.roles = 'user';
        }
        this.userService.register(this.user).subscribe(
        (data:any)=>{
          //sucess
          console.log("Registration Sucessfull");
          console.log(data);
          Swal.fire('Success',' user is registered','success');
          this.router.navigate(['moviebooking/login']);
          },
        (error)=>{
          //failure
          console.log(error.error)
          Swal.fire('Oops!', error.error.message,'error');
          }
        );
      }
      else{
        Swal.fire('Oops!', 'Enter Correct Password!','error');
        this.user.confirmPassword =''
      }
    }
}
