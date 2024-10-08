import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MAJprofilComponent } from './majprofil.component';

describe('MAJprofilComponent', () => {
  let component: MAJprofilComponent;
  let fixture: ComponentFixture<MAJprofilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MAJprofilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MAJprofilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
