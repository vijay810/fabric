import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Layoutpage } from './components/layoutpage/layoutpage';
import { About } from './pages/about/about';
import { Product } from './pages/product/product';
import { Diamention } from './pages/diamention/diamention';
import { Employeedata } from './pages/employeedata/employeedata.js';
import { Parent } from './pages/parent/parent';
import { Child } from './pages/child/child';
import { Designshirt } from './pages/designshirt/designshirt';
import { Backup } from './pages/backup/backup';
import { SignalForm } from './pages/signal-form/signal-form';
import { authGuard } from './guards/auth-guard.js';
import { Validationform } from './pages/validationform/validationform';
import { FinalDesign } from './pages/final-design/final-design';
export const routes: Routes = [
  {
    path: '',
    component: Layoutpage,
    // canActivate: [authGuard],
    children: [
      {
        path: '',
        component: Home,
      },
      {
        path: 'about',
        component: About,
      },
      {
        path: 'product',
        component: Product,
      },
      {
        path: 'diametion',
        component: Diamention,
      },
      {
        path: 'employees',
        component: Employeedata,
      },
      {
        path: 'parent',
        component: Parent,
      },
      {
        path: 'design-shirt',
        component: Designshirt,
      },
      {
        path: 'backup',
        component: Backup,
      },
      {
        path: 'signal-form',
        component: SignalForm,
      },
      {
        path: 'validation',
        component: Validationform
      },
      {
        path: "final-design",
        component: FinalDesign
      }
    ],
  },
];
