import { UserService } from '../common/user.service';
import { Component,Input, OnInit } from '@angular/core';
import { User } from '../common/user.class';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Input() username: string;
  @Input() password: string;
  error: string;
  user: User = new User();
  loggedIn = false;
  constructor(private userService: UserService) {
    userService.auth('user','user');
  }

  ngOnInit() {}

  register(){
    console.log('register');
    if(this.username.toLocaleLowerCase().trim() !== '' && this.password.toLocaleLowerCase().trim() !== ''){
      this.userService.list().subscribe(data => {
        data.forEach(user => {
          if(this.username === user.name){
            this.error = 'Username already exists';
          }else{
            this.userService.create(this.user).subscribe(u => {
              this.user = u;
            });
          }
        });
      });
    }
  }
  logIn(){
    if(this.username.toLocaleLowerCase().trim() !== '' && this.password.toLocaleLowerCase().trim() !== ''){
      console.log(this.username);
      this.userService.list().subscribe(data => {
        data.forEach(user => {
          if(this.username === user.name){
            this.userService.get(user.id).subscribe(u => {
              if(this.password === u.password){
                this.loggedIn = true;
                localStorage.setItem('user',this.user.name);
                console.log(this.loggedIn);
              }
            });
          }
        });
      });
    }else{
      this.error = 'Please enter a username and password';
    }
  }
}
