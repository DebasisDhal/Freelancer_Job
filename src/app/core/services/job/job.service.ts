import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Constant } from '../../constant/constant';
import { Observable } from 'rxjs/internal/Observable';
import { IJobListAPIResponce } from '../../models/interface/Master';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor( private http:HttpClient) { }


  newJob(obj:any):Observable<IJobListAPIResponce> {
    return this.http.post<IJobListAPIResponce>(environment.API_URL+ Constant.API_METHOD_NAME.JOB.CREATE_NEW_JOB,obj)
  }
}
