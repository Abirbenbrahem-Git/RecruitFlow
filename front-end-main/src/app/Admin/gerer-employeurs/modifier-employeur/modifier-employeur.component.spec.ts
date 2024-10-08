import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierEmployeurComponent } from './modifier-employeur.component';

describe('ModifierEmployeurComponent', () => {
  let component: ModifierEmployeurComponent;
  let fixture: ComponentFixture<ModifierEmployeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierEmployeurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierEmployeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
