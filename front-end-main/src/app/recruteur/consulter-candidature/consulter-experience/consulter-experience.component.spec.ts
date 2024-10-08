import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterExperienceComponent } from './consulter-experience.component';

describe('ConsulterExperienceComponent', () => {
  let component: ConsulterExperienceComponent;
  let fixture: ComponentFixture<ConsulterExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsulterExperienceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsulterExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
