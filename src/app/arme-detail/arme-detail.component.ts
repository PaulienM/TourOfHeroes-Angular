import {Component, DoCheck, Input, OnChanges, OnInit} from '@angular/core';
import {ArmeService} from '../service/arme.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Arme} from '../data/arme';

@Component({
  selector: 'app-arme-detail',
  templateUrl: './arme-detail.component.html',
  styleUrls: ['./arme-detail.component.scss']
})
export class ArmeDetailComponent implements OnInit, DoCheck {
  @Input() arme: Arme;
  total: number;
  message: string;

  constructor(private armeService: ArmeService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngDoCheck(): void {
    this.total = this.getTotal();
  }

  ngOnInit() {
    this.message = '';
    this.getArme();
    this.total = this.getTotal();
  }

  getArme(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.armeService.getArme(id)
      .subscribe(arme => this.arme = arme);
  }

  goBack() {
    this.location.back();
  }

  updateArme() {
    if (this.getTotal() !== 0) {
      this.message = 'Le total des point doit etre égal à 0';
    } else {
      this.message = '';
      this.armeService.updateArme(this.arme);
    }
  }

  getTotal() {
    return this.arme.attaque +
      this.arme.degat +
      this.arme.esquive +
      this.arme.pv;
  }
}
