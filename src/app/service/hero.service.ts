import {Injectable} from '@angular/core';
import {Hero} from '../data/hero';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private static url = 'hero';

  constructor(private messageService: MessageService,
              private db: AngularFirestore) {
  }

  getHeroes(): Observable<Hero[]> {
    // TODO: envoyer un message une fois les héros trouvés
    this.messageService.add('HeroService: fetched heroes');
    return this.db.collection<Hero>(HeroService.url)
      .snapshotChanges()
      .pipe(
        map(liste => {
          return liste.map(item => {
            const data = item.payload.doc.data();
            const hero = new Hero().fromJSON(data);
            const id = item.payload.doc.id;
            hero.id = id;

            return hero;
          });
        })
      );
  }

  getHero(id: string): Observable<Hero> {
    // TODO: envoyer un message une fois le héro trouvé
    this.messageService.add(`HeroService: fetched hero id=${id}`);

    return this.getHeroDocument(id).snapshotChanges()
      .pipe(
        map(item => {
          const data = item.payload.data();
          const hero = new Hero().fromJSON(data);
          hero.id = id;
          return hero;
        })
      );
  }

  addHero(hero: Hero) {
    const result = this.db.collection<Hero>(HeroService.url).add(Object.assign({}, hero));
    return result;
  }

  updateHero(hero: Hero) {
    this.getHeroDocument(hero.id).update(Object.assign({}, hero));
  }

  deleteHero(id: string) {
    this.getHeroDocument(id).delete();
  }

  private getHeroDocument(id: string): AngularFirestoreDocument<Hero> {
    return this.db.doc<Hero>(HeroService.url + '/' + id);
  }
}
