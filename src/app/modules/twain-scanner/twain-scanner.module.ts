import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TwainScannerRoutingModule } from './twain-scanner-routing.module';
import { TwainScannerComponent } from './components/twain-scanner/twain-scanner.component';
import { PreviewImageDialogComponent } from './components/preview-image-dialog/preview-image-dialog.component';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [TwainScannerComponent, PreviewImageDialogComponent],
  imports: [CommonModule, TwainScannerRoutingModule, MaterialModule],
})
export class TwainScannerModule {}
