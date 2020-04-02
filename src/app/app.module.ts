import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import {FormsModule} from '@angular/forms';
import { EditHeroComponent } from './edit-hero/edit-hero.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCardModule,
  MatGridListModule,
  MatIconModule, MatInputModule,
  MatListModule,
  MatMenuModule, MatProgressBarModule,
  MatSliderModule,
  MatToolbarModule
} from '@angular/material';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { ArmesComponent } from './armes/armes.component';
import { EditArmeComponent } from './edit-arme/edit-arme.component';
import {ChartsModule} from 'ng2-charts';
import { FormHeroComponent } from './form-hero/form-hero.component';
import { CreateHeroComponent } from './create-hero/create-hero.component';
import { CreateArmeComponent } from './create-arme/create-arme.component';
import { FormArmeComponent } from './form-arme/form-arme.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    EditHeroComponent,
    MessagesComponent,
    DashboardComponent,
    ArmesComponent,
    EditArmeComponent,
    FormHeroComponent,
    CreateHeroComponent,
    CreateArmeComponent,
    FormArmeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    MatListModule,
    MatGridListModule,
    MatSliderModule,
    MatCardModule,
    MatInputModule,
    ChartsModule,
    MatProgressBarModule,
    // imports firebase/firestore, only needed for database features
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
