import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './@shared/components/login/login.component';
import { LogoutComponent } from './@shared/components/logout/logout.component';
import { RegisterComponent } from './@shared/components/register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RankingsComponent } from './components/rankings/rankings.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './@shared/modules/angular-material/angular-material.module';
import { GiocaComponent } from './components/gioca/gioca.component';
import { CdkDrag, CdkDragPreview, CdkDropList } from '@angular/cdk/drag-drop';
import { GameResultsComponent } from './components/game-results/game-results.component';
import { FooterComponent } from './footer/footer.component';
import { HeroComponent } from './components/hero/hero.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { GameResultsItemComponent } from './components/game-results-item/game-results-item.component';
import { GameResultsItemDetailsComponent } from './components/game-results-item-details/game-results-item-details.component';
import { FavoritesMoviesComponent } from './components/favorites-movies/favorites-movies.component';
import { FavoritesMoviesItemComponent } from './components/favorites-movies-item/favorites-movies-item.component';

import { MatMenuModule } from '@angular/material/menu';
import { FavoritesMoviesItemDetailsComponent } from './favorites-movies-item-details/favorites-movies-item-details.component';


import { EditProfileComponent } from './edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainPageComponent,
    LogoutComponent,
    NavbarComponent,
    WelcomeComponent,
    HeroComponent,
    ProfileComponent,
    RankingsComponent,
    FooterComponent,
    RankingsComponent,
    GiocaComponent,
    GameResultsComponent,
    GameResultsItemComponent,
    GameResultsItemDetailsComponent,
    FavoritesMoviesComponent,
    FavoritesMoviesItemComponent,
    FavoritesMoviesItemDetailsComponent,
    EditProfileComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    CdkDropList,
    CdkDrag,
    CdkDragPreview,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
