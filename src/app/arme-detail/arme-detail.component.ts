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
  errorMessage: string;
  validationMessage: string;

  constructor(private armeService: ArmeService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngDoCheck(): void {
    this.total = this.getTotal();
  }

  ngOnInit() {
    this.errorMessage = '';
    this.validationMessage = '';
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
      this.errorMessage = 'Le total des point doit etre égal à 0';
      this.validationMessage = '';
    } else {
      this.validationMessage = 'L\'arme a été enregistré';
      this.errorMessage = '';
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
