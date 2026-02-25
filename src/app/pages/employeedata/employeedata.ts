import { Component } from '@angular/core';
import { EmployeeData } from './employee-data';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, } from '@angular/forms';

@Component({
  selector: 'app-employeedata',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employeedata.html',
  styleUrl: './employeedata.scss',
})
export class Employeedata {
  getData: any;
  searchForm!: FormGroup;
  constructor(private service: EmployeeData) {}

  ngOnInit(): void {
    this.getalldata();

    this.searchForm = new FormGroup({
      name: new FormControl(),
      username: new FormControl(),
    });
  }
  originalData: any
  getalldata() {
    this.service.getemployee().subscribe((res) => {
      this.originalData = res;
      this.getData = res;
      console.log(this.getData);
    });
  }
  submitbtn() {
     const searchName = this.searchForm.value.name?.toLowerCase();
     const searchUsername = this.searchForm.value.username?.toLowerCase();

     if (!searchName && !searchUsername) {
       this.getData = this.originalData;
       return;
     }
      this.getData = this.originalData.filter((emp:any) =>
        emp.name.toLowerCase().includes(searchName) ||
        emp.username.toLowerCase().includes(searchUsername)
      );
  }
}
