import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbaordComponent } from './dashbaord/dashbaord.component';
import { AdminComponent } from './admin/admin.component';
import { PhysicianComponent } from './physician/physician.component';
import { PatientComponent } from './patient/patient.component';
import { LayoutComponent } from '../shared-module/layout/layout.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { AuthGuard } from '../guards/auth.guard'; // Import the AuthGuard

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full"
      },
      {
        path: "dashboard",
        component: DashbaordComponent,
        canActivate: [AuthGuard] // Protect this route
      },
      {
        path: "admin",
        component: AdminComponent,
        canActivate: [AuthGuard] // Protect this route
      },
      {
        path: "physician",
        component: PhysicianComponent,
        canActivate: [AuthGuard] // Protect this route
      },
      {
        path: "patient",
        component: PatientComponent,
        canActivate: [AuthGuard] // Protect this route
      },
      {
        path: "add-admin",
        component: AddAdminComponent,
        canActivate: [AuthGuard] // Protect this route
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperadminRoutingModule { }
