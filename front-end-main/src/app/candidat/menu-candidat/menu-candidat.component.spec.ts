import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCandidatComponent } from './menu-candidat.component';

describe('MenuCandidatComponent', () => {
  let component: MenuCandidatComponent;
  let fixture: ComponentFixture<MenuCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuCandidatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
