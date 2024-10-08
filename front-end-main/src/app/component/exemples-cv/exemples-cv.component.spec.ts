import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExemplesCVComponent } from './exemples-cv.component';

describe('ExemplesCVComponent', () => {
  let component: ExemplesCVComponent;
  let fixture: ComponentFixture<ExemplesCVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExemplesCVComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExemplesCVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
