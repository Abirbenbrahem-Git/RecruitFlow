import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterDiplomeComponent } from './consulter-diplome.component';

describe('ConsulterDiplomeComponent', () => {
  let component: ConsulterDiplomeComponent;
  let fixture: ComponentFixture<ConsulterDiplomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsulterDiplomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsulterDiplomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
