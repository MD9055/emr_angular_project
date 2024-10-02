import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../guards/auth.guard';
import { LayoutComponent } from '../shared-module/layout/layout.component';
import { PhysicianComponent } from './physician/physician.component';
import { PatientComponent } from './patient/patient.component';
import { AddPhysicianComponent } from './add-physician/add-physician.component';
import { StaffComponent } from './staff/staff.component';
import { AddStaffComponent } from './add-staff/add-staff.component';

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
        component: DashboardComponent,
        canActivate: [AuthGuard],
        data: { roles: [1] },
      },
      {
        path: "physician",
        component: PhysicianComponent,
        canActivate: [AuthGuard],
        data: { roles: [1] },
      },
      {
        path: "patient",
        component: PatientComponent,
        canActivate: [AuthGuard],
        data: { roles: [1] }, 
      },
      {
        path: "add-physician",
        component: AddPhysicianComponent,
        canActivate: [AuthGuard],
        data: { roles: [1] },
      },
      {
        path: "staff",
        component: StaffComponent,
        canActivate: [AuthGuard],
        data: { roles: [1] },
      },
      {
        path: "add-staff",
        component: AddStaffComponent,
        canActivate: [AuthGuard],
        data: { roles: [1] },
      },
      
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
