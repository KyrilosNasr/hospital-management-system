import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from 'src/app/shared/layout/navbar/navbar.component';
import { DoctorComponent } from './doctors/components/doctor/doctor.component';
import { MainComponent } from './main/main.component';
import { PatientComponent } from './patient/patient.component';

const routes: Routes = [
  // {path:'', redirectTo:'/main',pathMatch:'full'},
  {
    path: '',  component: NavbarComponent, children: [
      { path: 'doctor', loadChildren: ()=> import ('./doctors/doctors.module').then((d)=>d.DoctorsModule)  },
      { path: 'main', component: MainComponent },
      { path: 'patient', component: PatientComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
