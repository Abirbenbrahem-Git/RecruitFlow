import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterOffreComponent } from './consulter-offre.component';

describe('ConsulterOffreComponent', () => {
  let component: ConsulterOffreComponent;
  let fixture: ComponentFixture<ConsulterOffreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsulterOffreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsulterOffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
