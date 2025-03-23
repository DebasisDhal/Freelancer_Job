import { Component, Inject } from '@angular/core';
import { FormControl, FormsModule, NgForm } from '@angular/forms';
import { UsersService } from '../../core/services/users.service';
import { UserRegister } from '../../core/models/class/User';
import { IAPIResponce } from '../../core/models/interface/Master';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  registerObj:UserRegister = new UserRegister();
  masterService =Inject(UsersService)

  onRegisterUser(data:NgForm){
    
    console.log(data.value);
    

    if(!data.invalid){
    this.masterService.UserRegister(this.registerObj).subscribe((res:IAPIResponce)=>{
      console.log(this.registerObj);
    
      if(res.result){
        alert("User created")

      }else{
        alert(res.message)
      }
    })
  }

  }

  

}
