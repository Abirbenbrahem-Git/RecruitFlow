import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulerOffreComponent } from './postuler-offre.component';

describe('PostulerOffreComponent', () => {
  let component: PostulerOffreComponent;
  let fixture: ComponentFixture<PostulerOffreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostulerOffreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostulerOffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
