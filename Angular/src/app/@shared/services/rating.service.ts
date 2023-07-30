import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Rating } from 'src/app/models/rating';

@Injectable({
  providedIn: 'root',
})
export class RatingService implements OnInit{
  API_ROOT = 'http://localhost:1234/api';

  constructor(private httpClient: HttpClient, private router:Router) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  getRatings(userId: number) {
    return this.httpClient.get<Rating[]>(`${this.API_ROOT}/ratings/${userId}`);
  }

  getRating(userId: number, movieId: number) {
    return this.httpClient.get<Rating>(`${this.API_ROOT}/ratings/${userId}/${movieId}`);
  }

  addRating(rating: Rating) {
    return this.httpClient.post<Rating>(`${this.API_ROOT}/ratings/`, rating);
  }

  editRating(rating: Rating) {
    
    return this.httpClient.put<Rating>(`${this.API_ROOT}/ratings/${rating.idRating}`, rating)
      .pipe(switchMap(() => this.getRating(rating.userId, rating.movieId)));
  }

  deleteRating(idRating: number) {
    return this.httpClient.delete(`${this.API_ROOT}/ratings/${idRating}`);
  }
}