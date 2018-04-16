import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScanpassPage } from './scanpass';

@NgModule({
  declarations: [
    ScanpassPage,
  ],
  imports: [
    IonicPageModule.forChild(ScanpassPage),
  ],
})
export class ScanpassPageModule {}
