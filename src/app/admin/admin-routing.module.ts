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
        canActivate: [AuthGuard] 
      },
      {
        path: "physician",
        component: PhysicianComponent,
        canActivate: [AuthGuard] 
      },
      {
        path: "patient",
        component: PatientComponent,
        canActivate: [AuthGuard] 
      },
      {
        path: "add-physician",
        component: AddPhysicianComponent,
        canActivate: [AuthGuard] 
      },
      {
        path: "staff",
        component: StaffComponent,
        canActivate: [AuthGuard] 
      },
      {
        path: "add-staff",
        component: AddStaffComponent,
        canActivate: [AuthGuard] 
      },
      
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
