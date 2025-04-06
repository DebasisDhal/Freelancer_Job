import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Constant } from '../constant/constant';
import { UserRegister } from '../models/class/User';
import { map, Observable } from 'rxjs';
import { IAPIResponce, UserList } from '../models/interface/Master';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  loggedUserData:any;

  constructor(private http: HttpClient) { 
    const localData = localStorage.getItem(Constant.lOCAL_STRORAGE_KEYS.LOGGED_USER);
    if (localData) {
      this.loggedUserData = JSON.parse(localData)
    }
  }


  registerUser(obj: UserRegister) : Observable<IAPIResponce>{
    return this.http.post<IAPIResponce>(environment.API_URL + Constant.API_METHOD_NAME.USER.CREATE_USER,obj)
  }

  getOriginalData(): Observable<IAPIResponce> {
    debugger;
    return this.http.get<IAPIResponce>(environment.API_URL + Constant.API_METHOD_NAME.USER.GET_ALL_USERS)
  }

  getAllUsers(): Observable<UserList[]> {
    debugger;
    return this.http.get<IAPIResponce>(environment.API_URL + Constant.API_METHOD_NAME.USER.GET_ALL_USERS).pipe(
      map((response:any)=>{
        debugger;
        return response.data;
      })
    );
  }

  getAllUsers2(): Observable<UserList[]> {
    debugger;
    return this.http.get<IAPIResponce>(environment.API_URL + Constant.API_METHOD_NAME.USER.GET_ALL_USERS).pipe(
      map((response:any)=>{
        debugger;
        const array = response.data;
        return array.map((res:UserList)=>{
          return {
            userId:res.userId,
            userName: res.userName
          }
        }) 
      })
    );
  }

  login(obj: any): Observable<IAPIResponce> {
    debugger;
    return this.http.post<IAPIResponce>(environment.API_URL + Constant.API_METHOD_NAME.USER.LOGIN, obj)
  }

  getAllUsers3(): Observable<UserList[]> { 
    return this.http.get<IAPIResponce>(environment.API_URL + Constant.API_METHOD_NAME.USER.GET_ALL_USERS).pipe(
      map(response => response.data.map(({ userId, userName }: UserList) => ({ userId, userName })))
    );
  }
  
}
