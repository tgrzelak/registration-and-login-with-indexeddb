import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { REGISTRATION_ROUTING } from './_consts/registration-routing.const';
import { RegistrationFormBuilderService } from './_services/registration-form-builder/registration-form-builder.service';
import { RegistrationService } from './_services/registration-service/registration.service';



@NgModule({
  declarations: [RegistrationPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(REGISTRATION_ROUTING)
  ],
  providers: [
    RegistrationFormBuilderService,
    RegistrationService
  ]
})
export class RegistrationModule { }
