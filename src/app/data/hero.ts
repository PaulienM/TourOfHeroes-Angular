import {Serializable} from './serializable';

export class Hero extends Serializable {
  id: string;
  name: string;
  attaque: number;
  esquive: number;
  degat: number;
  pv: number;
}
