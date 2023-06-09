import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from '../shared/layout/navbar/navbar.component';
import { DoctorComponent } from './dashboard/doctors/components/doctor/doctor.component';
import { MainComponent } from './dashboard/main/main.component';
import { PatientComponent } from './dashboard/patient/patient.component';


const routes: Routes = [
  {path:'',redirectTo:'/dashboard/main', pathMatch:'full'},
  {
    path: 'dashboard/main', loadChildren :()=>
   import('./dashboard/dashboard.module').then((d)=>{
    return  d.DashboardModule
   })
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
