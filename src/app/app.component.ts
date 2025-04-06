import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UsersService } from './core/services/users.service';
import { Constant } from './core/constant/constant';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild('loginModal') loginModal! : ElementRef;

  title = 'Freelancer_Job';
  userServie  = inject(UsersService)

  loginObj:any ={
    "userName" : "",
    "password" : ""
  }
  loggedUserData: any;
  
  openModal(){
    if(this.loginModal){
      this.loginModal.nativeElement.style.display = "block"
    }
  }
  closeModel(){
    if(this.loginModal){
      this.loginModal.nativeElement.style.display = 'none'
    }
  }
  onLogin(){
    this.userServie.login(this.loginObj).subscribe((res:any)=>{
      if(res.result){
        this.loggedUserData = res.data;
        localStorage.setItem(Constant.lOCAL_STRORAGE_KEYS.LOGGED_USER,JSON.stringify(res.data));
        this.closeModel();
      }else{
        alert(res.message)
      }
    })

  }
  onLogOff(){
    localStorage.removeItem(Constant.lOCAL_STRORAGE_KEYS.LOGGED_USER);
    this.loggedUserData = undefined;
  }
}
