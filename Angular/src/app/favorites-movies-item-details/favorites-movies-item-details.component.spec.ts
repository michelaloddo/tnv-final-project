import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesMoviesItemDetailsComponent } from './favorites-movies-item-details.component';

describe('FavoritesMoviesItemDetailsComponent', () => {
  let component: FavoritesMoviesItemDetailsComponent;
  let fixture: ComponentFixture<FavoritesMoviesItemDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoritesMoviesItemDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritesMoviesItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
