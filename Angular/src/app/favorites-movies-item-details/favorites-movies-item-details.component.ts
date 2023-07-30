import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { timestamp } from 'rxjs';
import { RatingService } from 'src/app/@shared/services/rating.service';
import { Movie } from 'src/app/models/movie';
import { Rating } from 'src/app/models/rating';
import { User } from 'src/app/models/user';
import { DbmoviesService } from 'src/app/services/dbmovieservice.service';

@Component({
  selector: 'tnv-favorites-movies-item-details',
  templateUrl: './favorites-movies-item-details.component.html',
  styleUrls: ['./favorites-movies-item-details.component.scss']
})
export class FavoritesMoviesItemDetailsComponent implements OnInit{

  movieId: number;
  movie: Partial<Movie>={}
  
  currentUser!:User;
  comment: string = '';
  rating: number = 0;
  isFavorite: boolean = false;
  isFormValid: boolean = false;
  copyComment: string = '';
  copyRating: number = 0;
  review = {
    idRating: 0,
    userId: 0,
    movieId: 0,
    ratingStars: 0,
    textComment: '',
    timestamp: new Date()
  };


  constructor(private activatedRoute: ActivatedRoute, private dbmoviesService: DbmoviesService,
    private ratingService: RatingService, private httpClient: HttpClient, private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem("user") || '') as User;  
    this.movieId = this.activatedRoute.snapshot.params['movieId'];
   
  }
  ngOnInit(): void {
    this.getMovie();
  }

  getMovie() {
    this.dbmoviesService.getMovie(this.movieId).subscribe({
      next: (res: Movie) => {
        this.movie = res;
        console.log('film recuperato\'API:', this.movie);
        this.getReview();
        
      },
      error: (error: any) => {
        console.error('Si è verificato un errore nel recupero del film:', error);
      }
    });
  }

  getReview() {
    this.ratingService.getRating(this.currentUser.id, this.movieId).subscribe({
      next: (res: Rating) => {
        this.review = res;
        this.copyRating=this.review.ratingStars;
        this.copyComment=this.review.textComment;
      },
      error: (error: 404) => {
        console.log('recensione non trovata o problemi col server', error);
      }
    });
  }

  onRatingChange(value: number) {
    this.rating = value;
    this.review.ratingStars=this.rating;
    this.checkFormValidity();
  }
  
  onCommentChange(event: Event) {
    this.comment=this.review.textComment
    const inputElement = event.target as HTMLTextAreaElement;
    this.comment = inputElement.value;
    this.checkFormValidity();
  }
  
    checkFormValidity() {
      // Controllo se il commento o la valutazione sono stati modificati rispetto ai valori iniziali
      this.isFormValid = !!this.comment || this.comment !== this.review.textComment || this.rating !== this.review.ratingStars;} 
    
  
      updateReview() {
        // Controllo se il commento e il rating attuali sono diversi da quelli iniziali
        const commentChanged = this.copyComment !== this.review.textComment;
        const ratingChanged = this.copyRating !== this.review.ratingStars;
        // Se sia il commento che il rating sono uguali a quelli iniziali, blocco la chiamata
        if (!commentChanged && !ratingChanged) {
          alert('Il commento e il rating sono identici a quelli iniziali');
          return;
        }
        // Almeno uno tra il commento e il rating è stato modificato

        this.ratingService.editRating(this.review).subscribe({
          next: (res: Rating) => {
            this.review = res;
            console.log('recensione aggiornata:', this.review);
            this.router.navigateByUrl("/favorites");
          setTimeout(() => {
          alert("Recensione aggiornata con successo");
        }, 200);
          },
          error: (error: any) => {
            console.error('Si è verificato un errore nel recupero del film:', error);
          }
        });
      }
  }


