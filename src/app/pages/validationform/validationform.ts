import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-validationform',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './validationform.html',
  styleUrl: './validationform.scss',
})
export class Validationform implements OnInit {
  myForm!: FormGroup;
  getdata: any;
  getdataAll: any;
  url = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {
    this.myForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getFun();
  }
  nodata: any;
  searchBtn() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return
    }
    let name = this.myForm.value.name?.toLowerCase().trim();

    if (!name) {
      this.getdata = this.getdataAll;
      return;
    }
    this.getdata = this.getdataAll.filter((item: any) =>
      item.name.toLowerCase().includes(name)
    );

    this.nodata = this.getdata.length === 0;
  }
  getFun() {
    this.http.get(this.url).subscribe((data: any) => {
      this.getdataAll = data;
      this.getdata = data;
      for (let i = 0; i < this.getdata.length; i++) {
        for (let j = 0; j < this.getdata.length - 1 - i; j++) {
          if (this.getdata[j].name.toLowerCase() > this.getdata[j + 1].name.toLowerCase()){
            let temp = this.getdata[j];
            this.getdata[j] = this.getdata[j + 1];
            this.getdata[j + 1] = temp;
          }
        }
      }
    });
  }
}


