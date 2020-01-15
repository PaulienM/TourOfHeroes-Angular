import { Injectable } from '@angular/core';
import {Hero} from '../data/hero';
import {HEROES} from '../data/mock-heroes';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  getHeroes(): Observable<Hero[]> {
    // TODO: envoyer un message une fois les héros trouvés
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }
  constructor(private messageService: MessageService) { }

  getHero(id: number): Observable<Hero> {
    // TODO: envoyer un message une fois le héro trouvé
    this.messageService.add(`HeroService: fetched hero id=${id}`);

    return of(HEROES.find(hero => hero.id === id));
  }
}
