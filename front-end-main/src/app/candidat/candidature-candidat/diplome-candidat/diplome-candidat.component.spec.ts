import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomeCandidatComponent } from './diplome-candidat.component';

describe('DiplomeCandidatComponent', () => {
  let component: DiplomeCandidatComponent;
  let fixture: ComponentFixture<DiplomeCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiplomeCandidatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiplomeCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
