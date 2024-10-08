import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuRecruteurComponent } from './menu-recruteur.component';

describe('MenuRecruteurComponent', () => {
  let component: MenuRecruteurComponent;
  let fixture: ComponentFixture<MenuRecruteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuRecruteurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuRecruteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
