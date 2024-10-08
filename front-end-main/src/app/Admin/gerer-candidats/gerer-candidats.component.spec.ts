import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GererCandidatsComponent } from './gerer-candidats.component';

describe('GererCandidatsComponent', () => {
  let component: GererCandidatsComponent;
  let fixture: ComponentFixture<GererCandidatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GererCandidatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GererCandidatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
