import { Injectable } from '@angular/core';
import {Filter} from '../data/filter';
import {Hero} from '../data/hero';
import {Arme} from '../data/arme';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }

  filter(objectList: Array<Hero | Arme>, filters: Filter) {
    return objectList.filter(object => {
      if (object.attaque < filters.attaque) {
        return false;
      }
      if (object.degat < filters.degat) {
        return false;
      }
      if (object.pv < filters.pv) {
        return false;
      }
      if (object.esquive < filters.esquive) {
        return false;
      }
      return true;
    });
  }
}
