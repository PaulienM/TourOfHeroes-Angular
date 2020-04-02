import { Component, OnInit } from '@angular/core';
import { Hero } from '../data/hero';
import { HeroService } from '../service/hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent implements OnInit {
  heroes: Array<any> = [];
  public isLoading = true;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.isLoading = true;
    this.heroService.getHeroes()
      .subscribe((heroes) => {
        this.heroes = heroes.slice(0, 4);
        this.isLoading = false;
      });
  }

  removeHero(hero: Hero) {
    this.heroService.deleteHero(hero.id);
    this.getHeroes();
  }
}
