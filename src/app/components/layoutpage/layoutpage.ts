// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { Header } from "../header/header";
// import { Sidebar } from "../sidebar/sidebar";
// import { Footer } from "../footer/footer";


// @Component({
//   selector: 'app-layoutpage',
//   imports: [RouterOutlet, Header, Sidebar, Footer],
//   templateUrl: './layoutpage.html',
//   styleUrl: './layoutpage.scss',
// })
// export class Layoutpage {
//   isSidebarOpen = false;

//   toggleSidebar() {
//     this.isSidebarOpen = !this.isSidebarOpen;
//   }
// }

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-layoutpage',
  imports: [RouterOutlet, Header, Sidebar, Footer],
  templateUrl: './layoutpage.html',
  styleUrl: './layoutpage.scss',
})
export class Layoutpage {
  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
