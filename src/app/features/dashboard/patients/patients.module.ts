import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsListComponent } from './components/patients-list/patients-list.component';
import { PatientsRoutingModule } from './patients-routing.module';
import { AddPatientComponent } from './components/add-patient/add-patient.component';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PatientsListComponent,
    AddPatientComponent
  ],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class PatientsModule { }
