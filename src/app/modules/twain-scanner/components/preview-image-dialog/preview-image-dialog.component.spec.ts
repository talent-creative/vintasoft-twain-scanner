import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewImageDialogComponent } from './preview-image-dialog.component';

describe('PreviewImageDialogComponent', () => {
  let component: PreviewImageDialogComponent;
  let fixture: ComponentFixture<PreviewImageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewImageDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
