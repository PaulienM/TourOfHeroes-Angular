import { Injectable } from '@angular/core';
import {MessageService} from './message.service';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Arme} from '../data/arme';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArmeService {

  private static url = 'arme';

  constructor(private messageService: MessageService,
              private db: AngularFirestore) {
  }

  getArmes(): Observable<Arme[]> {
    // TODO: envoyer un message une fois les armee trouvées
    this.messageService.add('ArmeService: fetched armes');
    return this.db.collection<Arme>(ArmeService.url)
      .snapshotChanges()
      .pipe(
        map(liste => {
          return liste.map(item => {
            const data = item.payload.doc.data();
            const arme = new Arme().fromJSON(data);
            const id = item.payload.doc.id;
            arme.id = id;

            return arme;
          });
        })
      );
  }

  getArme(id: string): Observable<Arme> {
    // TODO: envoyer un message une fois l'arme trouvée
    this.messageService.add(`ArmeService: fetched arme id=${id}`);

    return this.getArmeDocument(id).snapshotChanges()
      .pipe(
        map(item => {
          const data = item.payload.data();
          const arme = new Arme().fromJSON(data);
          arme.id = id;

          return arme;
        })
      );
  }

  addArme(arme: Arme) {
    return this.db.collection<Arme>(ArmeService.url).add(Object.assign({}, arme));
  }

  updateArme(arme: Arme) {
    this.getArmeDocument(arme.id).update(Object.assign({}, arme));
  }

  deleteArme(id: string) {
    this.getArmeDocument(id).delete();
  }

  private getArmeDocument(id: string): AngularFirestoreDocument<Arme> {
    return this.db.doc<Arme>(ArmeService.url + '/' + id);
  }
}
