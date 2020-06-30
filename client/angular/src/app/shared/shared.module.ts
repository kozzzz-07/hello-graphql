import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../modules/material.module';
import { NavComponent } from './components/nav/nav.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [CommonModule, MaterialModule, RouterModule, FlexLayoutModule],
  declarations: [NavComponent],
  exports: [NavComponent, MaterialModule, FlexLayoutModule],
})
export class SharedModule {}
