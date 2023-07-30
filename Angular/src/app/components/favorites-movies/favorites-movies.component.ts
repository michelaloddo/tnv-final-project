import { Component, OnInit } from '@angular/core';
import { RatingService } from '../../@shared/services/rating.service';
import { HttpClient } from '@angular/common/http';
import { Rating } from 'src/app/models/rating';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { DbmoviesService } from 'src/app/services/dbmovieservice.service';

@Component({
  selector: 'tnv-favorites-movies',
  templateUrl: './favorites-movies.component.html',
  styleUrls: ['./favorites-movies.component.scss']
})

  
export class FavoritesMoviesComponent implements OnInit{
  currentUser!: User;
  reviews: Rating[]=[];
  movies: Movie[]=[];
  myMoviesReviewed:any[]=[];
  rating :number =0;
  review!: Rating;

  constructor(private ratingService: RatingService,private dbMoviesService: DbmoviesService, private router:Router){   
  this.currentUser= JSON.parse(localStorage.getItem("user") || '') as User;

  }

  
  ngOnInit(): void {
    this.getReviews();
    this.myMoviesReviewed;
  }
  
  getReviews() {
    this.ratingService.getRatings(this.currentUser.id).subscribe({
      next: (res: Rating[]) => {
        this.reviews = res;
        console.log('Lista preferiti recuperata:', this.reviews);
        this.getMovies();
      },
      error: (error: any) => {
        console.log('Errore nel recupero dei dati', error);
      }
    });
  }
  
  getMovies() {
    this.movies = [];
    this.dbMoviesService.getMovies().subscribe({
      next: (res: any) => {
        const moviesOnDb = res.results;
        for (let movie of moviesOnDb) {
          for (let review of this.reviews) {
            if (movie.id === review.movieId) {
              this.movies.push(movie)
            }
          }
        }
        console.log('Film recuperati:', this.movies);
        this.getMyMoviesReviewed();
        console.log('Film e recensioni insieme:', this.myMoviesReviewed);
      },
      error: (error: any) => {
        console.error('Si è verificato un errore nel recupero dei film:', error);
      }
    });
  }
  
  getMyMoviesReviewed() {  
    this.myMoviesReviewed = this.movies.map((movie: Movie) => {
      const review = this.reviews.find((review: Rating) => review.movieId === movie.id);
      return {
        textComment: review?.textComment,
        ratingStars: review?.ratingStars,
        idRating: review?.idRating,
        userId: review?.userId,
        movieId: movie.id,
        moviePoster_Path: movie.poster_path,
        movieTitle: movie.title,
      };
    });
  }

  onDeleteClicked(id: number){
    console.log(id);
    this.ratingService.deleteRating(id).subscribe({
      next:  ()=> {
        this.getReviews();
        setTimeout(() => {
          alert("Recensione Cancellata");
        }, 170);
      },
      error: (error: any) => {
        console.log('Errore durante la cancellazione', error);
      }
    });
  }


  onEditClicked(movieId: number) {
    
    this.router.navigateByUrl(`ratings/${this.currentUser.id}/${movieId}`);
  }

  onImgClicked(movieId: number){
    this.router.navigateByUrl(`movie/${movieId}`);
  }
}