import { Component, Input, OnInit } from '@angular/core';
import { DbmoviesService } from '../../../services/dbmovieservice.service';
import { Movie} from '../../../models/movie';
import {
  CdkDragDrop,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';


@Component({
  selector: 'app-gioca',
  templateUrl: './gioca.component.html',
  styleUrls: ['./gioca.component.scss'],
  
})
export class GiocaComponent implements OnInit {


  movies!: Movie[] ;
  criteria:String[]=["popolarità","data d'uscita"]; 
  sortedCriteria =this.shuffleArray(this.criteria)[0];
  isSubmitPressed: boolean = false;

  constructor(private dbmoviesService: DbmoviesService,private router: Router) {}

  ngOnInit() {
    this.getMovies();
  }

   shuffleArray(array: any []) {
    return array.sort(()=> Math.random()-0.5);
  }

  getMovies() {
    this.dbmoviesService.getMovies().subscribe({
      next: (res:any) => {
        this.movies = this.shuffleArray(res.results).slice(0,10);
        console.log('film recuperati:', this.movies);
      },
      error: (error : any) => {
        console.error('Si è verificato un errore nel recupero dei film:', error);
      }
    });
  }

  drop(event: CdkDragDrop<{ title: string; poster: string }[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }

  checkMoviesByUser() {
    this.isSubmitPressed = true;
    this.dbmoviesService.setMoviesByUser(this.movies);
    this.dbmoviesService.setSortedCriteria(this.sortedCriteria);
    console.log('film ordinati dal calcolatore', this.movies);
    this.router.navigate(['/result']);
  }
  
}
