import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Task } from '../task.model';


@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  taskdetails:Array<Task>=[];

  constructor(public empSer: EmployeeService) { }

  ngOnInit(): void {
    this.empSer.loadtaskDetails().subscribe(result=>this.taskdetails=result,
      error=>console.log(error))  
  }

}
