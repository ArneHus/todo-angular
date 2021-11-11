import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskConformationDialogComponent } from './ask-conformation-dialog.component';

describe('AskConformationDialogComponent', () => {
  let component: AskConformationDialogComponent;
  let fixture: ComponentFixture<AskConformationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AskConformationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AskConformationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
