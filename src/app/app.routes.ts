import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Layout } from './pages/layout/layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { Employees } from './pages/employees/employees';
import { Shift } from './pages/shift/shift';
import { DataImport } from './pages/data-import/data-import';
import { WorkdayRecord } from './pages/workday-record/workday-record';
import { authGuard } from './guards/auth-guard';
import { LoginAuthGuard } from './guards/login-auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
    canActivate: [LoginAuthGuard]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: Layout,
    //proteger as rotas filhas
    canActivateChild: [authGuard],
    //rotas filhas
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
      },
      {
        path: 'employees',
        component: Employees,
      },
      {
        path: 'shifts',
        component: Shift,
      },
      {
        path: 'data-imports',
        component: DataImport,
      },
      {
        path: 'workday-records',
        component: WorkdayRecord,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];
