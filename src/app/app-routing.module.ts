import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './shared/layout/navbar/navbar.component';
import { DoctorComponent } from './features/dashboard/components/doctor/doctor.component';

const routes: Routes = [
  {path:'', component:NavbarComponent,children:[
    { path:'',component:DoctorComponent }
  ]
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
