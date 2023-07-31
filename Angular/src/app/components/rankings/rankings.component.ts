import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/@core/services/auth.service';
import { User } from 'src/app/models/user';
import { DbmoviesService } from 'src/app/services/dbmovieservice.service';
import { RankingsService } from 'src/app/services/rankings.service';

@Injectable({
  providedIn: "root",
})

@Component({
  selector: 'tnv-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.scss']
})
export class RankingsComponent implements OnInit {
  springBootUrl = 
  'http://localhost:8080/users';
  user!: User;
  users: User[] | undefined;
  sortKey = 'points';
  sortAsc = true;

  constructor(private activatedRoute: ActivatedRoute,private rankService:RankingsService, private http: HttpClient) { 
  this.user=this.getCurrentUser();
  }

  ngOnInit(): void {
    this.AllUsers();
  }

  getCurrentUser() {
    const user = JSON.parse(localStorage.getItem("user") || '') as User;
    return user;
  }

  AllUsers(){
    this.rankService.getAllUsers().subscribe({
        next: (res) => {
          this.users = (res);
          console.log('Utenti recuperati dall\'API:', this.users);
        },
        error: (error : any) => {
          console.error('Si è verificato un errore nel recupero degli utenti:', error);
        }
      });
  }
  
  sortUsers() {
    this.sortAsc = !this.sortAsc;
    this.users = this.users?.sort((a: any, b: any) => {
      return (this.sortAsc ? 1 : -1) * (Number(a.points) - Number(b.points));
    });
  }  

  getScoreColor(points: number) {
    let maxPoints = Math.max(...(this.users?.map(user => user.points) || [0]));
    let normalizedPoints = points / maxPoints;
    let lightness = 85 + 15 * (1 - Math.pow(normalizedPoints, 0.5)); 
    return 'hsl(30, 50%, ' + lightness + '%)';
  }
  
}  
