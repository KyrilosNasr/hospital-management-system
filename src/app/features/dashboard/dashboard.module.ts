import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { MainComponent } from './main/main.component';
import { DoctorsModule } from './doctors/doctors.module';
import { PatientsModule } from './patients/patients.module';


@NgModule({
  declarations: [
    MainComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DoctorsModule,
    PatientsModule
    ],
  providers: [
    DatePipe
  ]
})
export class DashboardModule {}
