import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceCandidatComponent } from './experience-candidat.component';

describe('ExperienceCandidatComponent', () => {
  let component: ExperienceCandidatComponent;
  let fixture: ComponentFixture<ExperienceCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperienceCandidatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperienceCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
