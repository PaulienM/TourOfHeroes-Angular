import { Component, OnInit } from '@angular/core';
import { Hero } from '../data/hero';
import { HeroService } from '../service/hero.service';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent implements OnInit {
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

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.isLoading = true;
    const heroesWithChartData = [];
    this.heroService.getHeroes()
      .subscribe((heroes) => {
        heroes.slice(0, 4)
          .forEach((hero) => {
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

  removeHero(hero: Hero) {
    this.heroService.deleteHero(hero.id);
    this.getHeroes();
  }
}
