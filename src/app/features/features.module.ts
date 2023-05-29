import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';


@NgModule({
  declarations: [],
  imports: [CommonModule, FeaturesRoutingModule, DashboardModule],
})
export class FeaturesModule {}
