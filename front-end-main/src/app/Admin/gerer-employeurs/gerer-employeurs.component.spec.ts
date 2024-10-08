import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GererEmployeursComponent } from './gerer-employeurs.component';

describe('GererEmployeursComponent', () => {
  let component: GererEmployeursComponent;
  let fixture: ComponentFixture<GererEmployeursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GererEmployeursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GererEmployeursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
