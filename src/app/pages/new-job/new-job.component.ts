import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../core/services/users.service';
import { JobService } from '../../core/services/job/job.service';
import { IJobListAPIResponce } from '../../core/models/interface/Master';
import { EditorModule } from 'primeng/editor';
import { MessageService } from 'primeng/api';
import { DatePicker } from 'primeng/datepicker';

@Component({
  selector: 'app-new-job',
  standalone: true,
  imports: [ReactiveFormsModule,EditorModule,DatePicker],
  templateUrl: './new-job.component.html',
  styleUrl: './new-job.component.css'
})
export class NewJobComponent {
  newJobForm: FormGroup = new FormGroup({});
  formBuilder = inject(FormBuilder);
  
  userService= inject(UsersService);
  jobService= inject(JobService);

  constructor(private messageService: MessageService) {
    this.initializeForm();
  }
  
  initializeForm(){
    this.newJobForm = this.formBuilder.group({
      projectId :new FormControl(0),
      userId:new FormControl(this.userService.loggedUserData.userId),
      title:new FormControl(""),
      description:new FormControl(""),
      budget:new FormControl(""),
      deadline:new FormControl(""),
      skillsRequired:new FormControl(""),
      status:new FormControl("Live"),
      createdDate:new FormControl(new Date())
    })
  }

  onSave() {
    const formValue =  this.newJobForm.value;
    this.jobService.newJob(formValue).subscribe((res:IJobListAPIResponce)=>{
      if(res.success){
        this.messageService.add({ severity: 'info', summary: 'Info', detail: 'New Job Created', life: 3000 });
        this.initializeForm();
      }else{
        alert("Something Went Wrong");
      }
    })
  }

}
