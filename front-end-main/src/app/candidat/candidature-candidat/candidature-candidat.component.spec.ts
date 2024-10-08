import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatureCandidatComponent } from './candidature-candidat.component';

describe('CandidatureCandidatComponent', () => {
  let component: CandidatureCandidatComponent;
  let fixture: ComponentFixture<CandidatureCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatureCandidatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatureCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
