import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMovieEditComponent } from './admin-movie-edit.component';

describe('AdminMovieEditComponent', () => {
  let component: AdminMovieEditComponent;
  let fixture: ComponentFixture<AdminMovieEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminMovieEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMovieEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
