import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { WebJobComponent } from './pages/web-job/web-job.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { NewJobComponent } from './pages/new-job/new-job.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { UsersComponent } from './pages/users/users.component';
import { DemoComponent } from './pages/demo/demo.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'home',
        pathMatch:'full'
    },
    {
        path:'home',
        component:HomeComponent,
        title:"Freelancer Portal"
    },
    {
        path:'jobs',
        component:WebJobComponent
    },
    {
        path:'myjobs',
        component:JobsComponent
    },
    {
        path:'new-jobs',
        component:NewJobComponent
    },
    {
        path:'new-jobs',
        component:NewJobComponent
    },
    {
        path:'edit-jobs/:id',
        component:NewJobComponent
    },
    {
        path:'users',
        component:UsersComponent
    },
    {
        path:'demo',
        component:DemoComponent
    },
    {
        path:'**',
        component:NotfoundComponent
    },
   
];
