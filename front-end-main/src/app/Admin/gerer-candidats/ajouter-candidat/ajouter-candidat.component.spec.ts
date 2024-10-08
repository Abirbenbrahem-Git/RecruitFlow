import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterCandidatComponent } from './ajouter-candidat.component';

describe('AjouterCandidatComponent', () => {
  let component: AjouterCandidatComponent;
  let fixture: ComponentFixture<AjouterCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterCandidatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
