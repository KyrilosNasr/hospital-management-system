import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


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
