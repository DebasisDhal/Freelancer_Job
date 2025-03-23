import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../../core/services/users.service';
import { IAPIResponce, UserList } from '../../core/models/interface/Master';
import { Observable, Subscription } from 'rxjs';
import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgIf,NgFor,JsonPipe,AsyncPipe],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  userService = inject(UsersService);
  userList: UserList[] = [];
  subScriptions: Subscription[]= [];
  
  userList$: Observable<UserList[]> = new Observable<UserList[]>();
  userListResposne$: Observable<IAPIResponce> = new Observable<IAPIResponce>();
  userDat: any;
  constructor() {
    this.userList$ =  this.userService.getAllUsers();
    this.userListResposne$ =  this.userService.getOriginalData();
  }
  
  ngOnInit(): void {
    debugger; 
    const data = this.userService.getAllUsers().subscribe((res:UserList[])=>{
      debugger;
      this.userList =  res;
    })
    this.subScriptions.push(data);
  
    this.subScriptions.push(
      this.userService.getAllUsers2().subscribe((res:UserList[])=>{
        debugger;
        this.userList =  res;
      })
    ) 
  }
  ngOnDestroy(): void {
    this.subScriptions.forEach(element => {
      element.unsubscribe()
    });
  }

}
