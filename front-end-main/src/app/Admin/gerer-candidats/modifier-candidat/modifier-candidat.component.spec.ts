import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierCandidatComponent } from './modifier-candidat.component';

describe('ModifierCandidatComponent', () => {
  let component: ModifierCandidatComponent;
  let fixture: ComponentFixture<ModifierCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierCandidatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
