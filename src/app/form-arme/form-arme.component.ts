import {Component, DoCheck, Input, OnInit} from '@angular/core';
import {ArmeService} from '../service/arme.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {Arme} from '../data/arme';

@Component({
  selector: 'app-form-arme',
  templateUrl: './form-arme.component.html',
  styleUrls: ['./form-arme.component.scss']
})
export class FormArmeComponent implements OnInit, DoCheck {
  @Input() arme: Arme;
  @Input() edit: boolean;
  total: number;
  errorMessage: string;
  validationMessage: string;

  constructor(private armeService: ArmeService,
              private route: ActivatedRoute,
              private location: Location,
              private router: Router) { }

  ngDoCheck(): void {
    this.total = this.getTotal();
  }

  ngOnInit() {
    if (!this.edit) {
      this.arme = new Arme();
    }
    this.errorMessage = '';
    this.validationMessage = '';
    this.total = this.getTotal();
  }

  goBack() {
    this.location.back();
  }

  save() {
    if (this.getTotal() !== 0 ) {
      this.errorMessage = 'Le total des point doit etre égal à 0';
      this.validationMessage = '';
    } else if (Math.abs(this.arme.pv) > 5 ||
               Math.abs(this.arme.attaque) > 5 ||
               Math.abs(this.arme.esquive) > 5 ||
               Math.abs(this.arme.degat) > 5 ) {
      this.errorMessage = 'Les point doivent être compris entre -5 et 5';
      this.validationMessage = '';
    } else if (this.arme.name === '' || this.arme.name === undefined) {
      this.errorMessage = 'Le nom de l\'arme ne doit pas être vide';
      this.validationMessage = '';
    } else {
      this.validationMessage = 'L\'arme a été ajoutée';
      this.errorMessage = '';
      this.edit ?
        this.armeService.updateArme(this.arme) :
        this.armeService.addArme(this.arme).then(r => this.router.navigate(['/detail-arme', r.id]));
    }
  }

  getTotal() {
    return this.arme.attaque +
      this.arme.degat +
      this.arme.esquive +
      this.arme.pv;
  }

}
