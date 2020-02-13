import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { RouterModule } from '@angular/router';
import { REGISTRATION_ROUTING } from './_consts/registration-routing.const';
import { SharedModule } from '../shared/shared.module';
import { RegistrationFormBuilderService } from './_services/registration-form-builder/registration-form-builder.service';
import { RegistrationService } from './_services/registration-service/registration.service';
import { MatButtonModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



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
