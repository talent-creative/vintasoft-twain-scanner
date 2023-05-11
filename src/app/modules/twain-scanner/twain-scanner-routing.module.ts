import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TwainScannerComponent } from './components/twain-scanner/twain-scanner.component';

const routes: Routes = [{ path: '', component: TwainScannerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TwainScannerRoutingModule {}
