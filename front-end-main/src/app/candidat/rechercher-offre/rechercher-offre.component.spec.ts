import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercherOffreComponent } from './rechercher-offre.component';

describe('RechercherOffreComponent', () => {
  let component: RechercherOffreComponent;
  let fixture: ComponentFixture<RechercherOffreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechercherOffreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RechercherOffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
