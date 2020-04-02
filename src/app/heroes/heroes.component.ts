import { Component, OnInit } from '@angular/core';
import { Hero } from '../data/hero';
import {HeroService} from '../service/hero.service';
import {ChartDataSets, ChartType, RadialChartOptions} from 'chart.js';
import {Label} from 'ng2-charts';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  heroes: Array<any> = [];
  public radarChartOptions: RadialChartOptions = {
    responsive: true,
    scale: {
      ticks: {
        suggestedMin: 0,
        suggestedMax: 40
      }
    }
  };
  public radarChartLabels: Label[] = ['Attaque', 'Esquive', 'Dégats', 'PV'];
  public radarChartType: ChartType = 'radar';
  public isLoading = true;

  constructor(private heroService: HeroService) { }

  getHeroes(): void {
    this.isLoading = true;
    const heroesWithChartData = [];
    this.heroService.getHeroes()
      .subscribe((heroes) => {
        heroes.forEach((hero) => {
            let heroWithChartData: object;
            const chartData: ChartDataSets[] = [
              { data: [hero.attaque, hero.esquive, hero.degat, hero.pv], label: hero.name }
            ];
            heroWithChartData = {...hero, chartData};
            heroesWithChartData.push(heroWithChartData);
        });
        this.heroes = heroesWithChartData;
        this.isLoading = false;
      });
  }

  ngOnInit() {
    this.getHeroes();
  }

  removeHero(hero: Hero) {
    this.heroService.deleteHero(hero.id);
    this.heroes.splice(this.heroes.indexOf(hero), 1);
    this.getHeroes();
  }
}
