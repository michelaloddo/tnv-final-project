import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesMoviesItemComponent } from './favorites-movies-item.component';

describe('FavoritesMoviesItemComponent', () => {
  let component: FavoritesMoviesItemComponent;
  let fixture: ComponentFixture<FavoritesMoviesItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoritesMoviesItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritesMoviesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
