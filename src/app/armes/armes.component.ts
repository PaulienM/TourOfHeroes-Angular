import { Component, OnInit } from '@angular/core';
import {Arme} from '../data/arme';
import {ArmeService} from '../service/arme.service';

@Component({
  selector: 'app-armes',
  templateUrl: './armes.component.html',
  styleUrls: ['./armes.component.scss']
})
export class ArmesComponent implements OnInit {
  armes: Arme[];

  constructor(private armeService: ArmeService) { }

  getArmes(): void {
    this.armeService.getArmes()
      .subscribe(armes => this.armes = armes);
  }

  ngOnInit() {
    this.getArmes();
  }

  removeArme(arme: Arme) {
    this.armeService.deleteArme(arme.id);
  }
}
