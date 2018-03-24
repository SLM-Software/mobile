import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StorelocatorPage } from './storelocator';

@NgModule({
  declarations: [
    StorelocatorPage,
  ],
  imports: [
    IonicPageModule.forChild(StorelocatorPage),
  ],
})
export class StorelocatorPageModule {}
