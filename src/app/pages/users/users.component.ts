import { Component, ElementRef, inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { UsersService } from '../../core/services/users.service';
import { IAPIResponce, UserList } from '../../core/models/interface/Master';
import { Observable, Subscription } from 'rxjs';
import { AsyncPipe, JsonPipe, NgFor, NgIf, NgStyle } from '@angular/common';
import { DatePicker } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import type { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community'; // Column Definition Type Interface

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgIf,NgFor,JsonPipe,AsyncPipe,DatePicker,FormsModule,AgGridAngular,NgStyle],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  date: Date | undefined;
  userService = inject(UsersService);
  userList: UserList[] = [];
  subScriptions: Subscription[]= [];
  
  userList$: Observable<UserList[]> = new Observable<UserList[]>();
  userListResposne$: Observable<IAPIResponce> = new Observable<IAPIResponce>();
  userDat: any;
  private gridApi!: GridApi;
  constructor( private render :Renderer2) {
    this.userList$ =  this.userService.getAllUsers();
    this.userListResposne$ =  this.userService.getOriginalData();
   
  }
  
  ngOnInit(): void {
    debugger; 
    const data = this.userService.getAllUsers().subscribe((res:UserList[])=>{
      debugger;
      this.userList =  res;
      console.log(res);
      
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

  
      // Row Data: The data to be displayed.
      rowData = [
        { make: "Tesladjkashfjdhsfjhsdjfhsdjfhdsjhfs", model: "Model Y", price: 64950, electric: true,id:1 },
        { make: "Ford", model: "F-Series", price: 33850, electric: false,id:2 },
        { make: "Toyota", model: "Corolla", price: 29600, electric: false,id:3 },
    ];

    // Column Definitions: Defines the columns to be displayed.
    colDefs: ColDef[] = [
      {field: 'id',
        cellRenderer:(item:any)=>{
          return "Emp-"+item.data.id 
        }
      },
        { field: "make",filter:'agSetColumnFilter' },
        { field: "model" },
        { field: "price" },
        { field: "electric" }
    ];

    defaultColDe ={
      flex:1,
      minWidth:100
    }

    onGridReady(params: GridReadyEvent) {
      this.gridApi = params.api;
    }

     onBtnExport() {
      this.gridApi.exportDataAsCsv();
    }
    onP = {
      color: 'Blue'
    }
    getStyle(){
      return{
        color:'red'
      }

    }

    @ViewChild('a1') paragraph! :ElementRef;



      ngAfterViewInit(){
        //this.paragraph.nativeElement.style.color = 'brown';
        this.render.setStyle(this.paragraph.nativeElement, 'color','red')
      }

  

}
