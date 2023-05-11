import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwainScannerComponent } from './twain-scanner.component';

describe('TwainScannerComponent', () => {
  let component: TwainScannerComponent;
  let fixture: ComponentFixture<TwainScannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwainScannerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwainScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
