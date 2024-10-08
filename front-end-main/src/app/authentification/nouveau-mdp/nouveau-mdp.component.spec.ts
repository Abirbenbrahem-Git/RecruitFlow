import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouveauMDPComponent } from './nouveau-mdp.component';

describe('NouveauMDPComponent', () => {
  let component: NouveauMDPComponent;
  let fixture: ComponentFixture<NouveauMDPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NouveauMDPComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NouveauMDPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
