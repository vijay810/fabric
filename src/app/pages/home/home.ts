import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Service } from './service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  myform!: FormGroup;
  dataall: any;
  loadingflag: boolean = false

  constructor(private service: Service) {}
  ngOnInit(): void {
    this.myform = new FormGroup({
      name: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      desc: new FormControl('', [Validators.required])
    });
    this.getData();
    this.loadingflag = true
    setTimeout(()=>{
      this.loadingflag = false;
    },200)
  }
  submitBtn() {
      if (this.myform.invalid) {
        this.myform.markAllAsTouched(); 
        return;
      }

    console.log(this.myform.value);
    setTimeout(() => {
      this.myform.reset();
    }, 1000);
  }

  getData() {
    this.service.getUsers().subscribe((data) => {
      this.dataall = data;
      console.log(this.dataall);
    });
  }
}
