import {Component, DoCheck, Input, OnInit} from '@angular/core';
import {Hero} from '../data/hero';
import {ActivatedRoute, Router} from '@angular/router';
import {HeroService} from '../service/hero.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-form-hero',
  templateUrl: './form-hero.component.html',
  styleUrls: ['./form-hero.component.scss']
})
export class FormHeroComponent implements DoCheck, OnInit {
  @Input() hero: Hero;
  @Input() edit: boolean;
  restant: number;
  errorMessage: string;
  validationMessage: string;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private router: Router
  ) {
    this.errorMessage = '';
    this.validationMessage = '';
  }

  ngOnInit(): void {
    if (!this.edit) {
      this.hero = new Hero();
    }
  }

  ngDoCheck(): void {
    this.restant = 40 - (this.hero.pv + this.hero.degat + this.hero.esquive + this.hero.attaque);
  }

  goBack() {
    this.location.back();
  }

  save() {
    if (this.edit) {
      this.updateHero();
    } else {
      this.insertHero();
    }
  }

  updateHero() {
    if (this.hero.name !== '' && this.hero.name !== undefined) {
      this.validationMessage = 'Le héro a été enregistré';
      this.errorMessage = '';
      this.heroService.updateHero(this.hero);
    } else {
      this.errorMessage = 'Le nom du hero ne doit pas être vide';
      this.validationMessage = '';
    }
  }

  insertHero() {
    if (this.hero.name !== '' && this.hero.name !== undefined) {
      this.errorMessage = '';
      this.heroService.addHero(this.hero).then(r => this.router.navigate(['/detail/', r.id]));
    } else {
      this.errorMessage = 'Le nom du hero ne doit pas être vide';
      this.validationMessage = '';
    }
  }
}
