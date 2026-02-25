import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-about',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About implements OnInit {
  loadingflag: boolean = false;
  url = 'https://jsonplaceholder.typicode.com/users';
  employee: any;
  getdata: any
  originalData: any;
  myform!: FormGroup;
  noData: boolean = false;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadingflag = true;
    setTimeout(() => {
      this.loadingflag = false;
    }, 200);
    this.getfun();

    this.myform = new FormGroup({
      name: new FormControl(''),
    });
  }
  searchbtn() {
    let name = this.myform.value.name?.toLowerCase().trim();

    if (!name) {
      this.getdata = this.originalData;
      return;
    }

    this.getdata = this.originalData.filter((item: any) =>
      item.name.toLowerCase().includes(name)
    );

    this.noData = this.getdata.length === 0;
  }

  getfun() {
    this.http.get(this.url).subscribe((data: any) => {
      this.originalData = data;
      this.getdata = data;
      console.log(this.originalData, this.getdata);
    });
  }
}
