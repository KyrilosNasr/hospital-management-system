import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { MainComponent } from './main/main.component';
import { PatientComponent } from './patient/patient.component';
import { DoctorsModule } from './doctors/doctors.module';


@NgModule({
  declarations: [
    PatientComponent,
    MainComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DoctorsModule
  ],
  providers: [
    DatePipe
  ]
})
export class DashboardModule {}
