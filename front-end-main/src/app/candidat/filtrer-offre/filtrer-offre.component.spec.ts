import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrerOffreComponent } from './filtrer-offre.component';

describe('FiltrerOffreComponent', () => {
  let component: FiltrerOffreComponent;
  let fixture: ComponentFixture<FiltrerOffreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltrerOffreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltrerOffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
