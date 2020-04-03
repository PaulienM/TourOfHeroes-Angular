import {Serializable} from './serializable';

export class Hero extends Serializable {
  id: string;
  name: string;
  attaque: number;
  esquive: number;
  degat: number;
  pv: number;
  armeId: string;

  constructor() {
    super();
    this.attaque = 1;
    this.esquive = 1;
    this.degat = 1;
    this.pv = 1;
  }
}
