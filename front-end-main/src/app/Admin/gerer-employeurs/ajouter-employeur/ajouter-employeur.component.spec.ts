import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterEmployeurComponent } from './ajouter-employeur.component';

describe('AjouterEmployeurComponent', () => {
  let component: AjouterEmployeurComponent;
  let fixture: ComponentFixture<AjouterEmployeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterEmployeurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterEmployeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
