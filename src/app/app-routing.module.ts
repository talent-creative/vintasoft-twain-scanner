import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/twain', pathMatch: 'full' },
  {
    path: 'twain',
    loadChildren: () =>
      import('./modules/twain-scanner/twain-scanner.module').then(
        (m) => m.TwainScannerModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
