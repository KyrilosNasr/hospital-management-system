import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorComponent } from './components/doctor/doctor.component';
import { DoctorDetailsComponent } from './components/doctor-details/doctor-details.component';

const routes: Routes = [
  {path:'',component: DoctorComponent},
  { path:'doctor-details/:id',component: DoctorDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorsRoutingModule { }
