import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.css'
})
export class DemoComponent implements OnInit {
  ngOnInit(): void {
    
  }
  nowItem:any;

   ticketsArr: any[] = [
    {
      ticketId: "Jira-001",
      ticketName: "Dashboard Page",
      status: "Completed"
    },
    {
      ticketId: "Jira-003",
      ticketName: "Landing Page",
      status: "Completed"
    },
    {
      ticketId: "Jira-002",
      ticketName: "Login Module",
      status: "Pending"
    },
    {
      ticketId: "Jira-005",
      ticketName: "sign up Module",
      status: "Pending"
    },
    {
      ticketId: "Jira-004",
      ticketName: "User Profile",
      status: "In Progress"
    },
    {
      ticketId: "Jira-007",
      ticketName: "logout Profile",
      status: "In Progress"
    }
  ];
  
  filterTicket(status:string){
    return this.ticketsArr.filter(m =>m.status == status);
  }
  onDragStart(item:any){
    this.nowItem = item;
    console.log("Dropped item:", this.nowItem);
    debugger;

  }
  onDrop(event:any,status:string){
    debugger;
    event.preventDefault();
    const record = this.ticketsArr.find(m=>m.ticketId == this.nowItem.ticketId);
    if(record != undefined){
      record.status = status;
    }
    this.nowItem = null;

  }
  onDragOver(event:any){
    event.preventDefault();
  }

 

}
