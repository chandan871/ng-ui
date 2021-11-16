import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { MaterialModule } from './../../../../../material/src/public-api'
import { LibCoreModule } from 'projects/lib-core/src/public-api';


@NgModule({
  declarations: [DashboardAdminComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    LibCoreModule
  ]
})
export class DashboardModule { }
