import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {

  constructor(public empSer: EmployeeService ) { }

  ngOnInit(): void {

  }
  storeUser(empRef:any){
    console.log(empRef);
    this.empSer.storeEmployee(empRef);
  }

}


