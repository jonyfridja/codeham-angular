import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { WordComponent } from './components/word/word.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { FancyButtonComponent } from './components/fancy-button/fancy-button.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './components/auth/auth.component';
import { GameService } from './services/game.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomePageComponent,
    BoardPageComponent,
    AboutPageComponent,
    WordComponent,
    CapitalizePipe,
    FancyButtonComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
