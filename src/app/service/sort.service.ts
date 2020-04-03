import { Injectable } from '@angular/core';
import {Hero} from '../data/hero';
import {Arme} from '../data/arme';
import { Sort } from '../data/sort';

@Injectable({
  providedIn: 'root'
})
export class SortService {

  constructor() { }

  sort(objectList: Array<Hero | Arme>, sort: Sort) {
    return objectList.sort((a, b) => {
      if (sort.order) {
        return a[sort.attribute] - b[sort.attribute];
      } else {
        return b[sort.attribute] - a[sort.attribute];
      }
    });
  }
}
