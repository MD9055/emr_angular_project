import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhysicianRoutingModule } from './physician-routing.module';
import { PatientComponent } from './patient/patient.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashbaordComponent } from './dashbaord/dashbaord.component';


@NgModule({
  declarations: [
    PatientComponent,
    AddPatientComponent,
    DashbaordComponent
  ],
  imports: [
    CommonModule,
    PhysicianRoutingModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PhysicianModule { }
