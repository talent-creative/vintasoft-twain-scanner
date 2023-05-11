import { Component } from '@angular/core';

@Component({
  selector: 'app-twain-scanner',
  templateUrl: './twain-scanner.component.html',
  styleUrls: ['./twain-scanner.component.scss'],
})
export class TwainScannerComponent {
  constructor(private dialog: MatDialog) {}
  onOpenPreviewImageDialog() {
    const dialogRef = this.dialog.open(PreviewImageDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
