import { NgModule } from '@angular/core';
import { LibCoreComponent } from './lib-core.component';
import { CommonModule } from "@angular/common";
import { ContactDetailsComponent } from './widgets/contact/contact-details/contact-details.component';
import { MaterialModule } from 'projects/material/src/public-api';


@NgModule({
  declarations: [
    LibCoreComponent, 
    ContactDetailsComponent,
  ],
  imports: [
    CommonModule, 
    MaterialModule
  ],
  exports: [
    LibCoreComponent, 
    ContactDetailsComponent
  ]
})
export class LibCoreModule { }
