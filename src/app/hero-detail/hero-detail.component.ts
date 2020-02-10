import {Component, DoCheck, Input, OnInit} from '@angular/core';
import { Hero } from '../data/hero';
import {ActivatedRoute} from '@angular/router';
import {HeroService} from '../service/hero.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements DoCheck, OnInit {
  @Input() hero: Hero;
  restant: number;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngDoCheck(): void {
    this.restant = 40 - (this.hero.pv + this.hero.degat + this.hero.esquive + this.hero.attaque);
  }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack() {
    this.location.back();
  }

  updateHero() {
    this.heroService.updateHero(this.hero);
  }
}
