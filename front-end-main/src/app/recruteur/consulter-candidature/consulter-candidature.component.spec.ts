import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterCandidatureComponent } from './consulter-candidature.component';

describe('ConsulterCandidatureComponent', () => {
  let component: ConsulterCandidatureComponent;
  let fixture: ComponentFixture<ConsulterCandidatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsulterCandidatureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsulterCandidatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
