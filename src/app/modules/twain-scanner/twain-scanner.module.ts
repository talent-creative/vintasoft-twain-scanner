import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TwainScannerRoutingModule } from './twain-scanner-routing.module';
import { TwainScannerComponent } from './components/twain-scanner/twain-scanner.component';


@NgModule({
  declarations: [
    TwainScannerComponent
  ],
  imports: [
    CommonModule,
    TwainScannerRoutingModule
  ]
})
export class TwainScannerModule { }
