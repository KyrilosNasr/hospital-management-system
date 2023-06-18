import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from 'src/app/shared/layout/navbar/navbar.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '',  component: NavbarComponent, children: [
      { path: 'doctors', loadChildren: ()=> import ('./doctors/doctors.module').then((d)=>d.DoctorsModule)  },
      { path: 'main', component: MainComponent },
      { path: 'patients', loadChildren: ()=>
      import ('./patients/patients.module').then((p)=>p.PatientsModule)
      } 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
