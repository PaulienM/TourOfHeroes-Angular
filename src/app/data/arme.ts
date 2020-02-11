import {Serializable} from './serializable';

export class Arme extends Serializable {
  id: string;
  name: string;
  attaque: number;
  esquive: number;
  degat: number;
  pv: number;

  constructor() {
    super();
    this.attaque = 0;
    this.esquive = 0;
    this.degat = 0;
    this.pv = 0;
  }
}
