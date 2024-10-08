import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MAJProfiLComponent } from './maj-profi-l.component';

describe('MAJProfiLComponent', () => {
  let component: MAJProfiLComponent;
  let fixture: ComponentFixture<MAJProfiLComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MAJProfiLComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MAJProfiLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
