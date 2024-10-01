import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientComponent } from './patient/patient.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { LayoutComponent } from '../shared-module/layout/layout.component';
import { AuthGuard } from '../guards/auth.guard';
import { DashbaordComponent } from './dashbaord/dashbaord.component';

// const routes: Routes = [
//   {
//     path:"patient", component:PatientComponent
//   },
//   {
//     path:"add-patient", component:AddPatientComponent
//   }
// ];

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
          path:"patient", 
           component:PatientComponent,
           canActivate: [AuthGuard]
        },
        {
          path:"add-patient", 
          component:AddPatientComponent,
          canActivate: [AuthGuard]

        }
            
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhysicianRoutingModule { }
