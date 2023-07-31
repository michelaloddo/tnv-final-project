import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'tnv-favorites-movies-item',
  templateUrl: './favorites-movies-item.component.html',
  styleUrls: ['./favorites-movies-item.component.scss']
})
export class FavoritesMoviesItemComponent {

  @Input() myMovieReview: any | undefined;
  @Output() deleteClicked = new EventEmitter<number>();
  @Output() editClicked = new EventEmitter<number>();
  @Output() imgClicked = new EventEmitter<number>();

  constructor() {
  }

  deleteClick() {
    this.deleteClicked.emit(this.myMovieReview.idRating)
  }
  editClick() {
    this.editClicked.emit(this.myMovieReview.movieId);
  }
  imgClick(){
    this.imgClicked.emit(this.myMovieReview.movieId)
  }
}
