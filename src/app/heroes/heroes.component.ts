import {Component, OnInit} from '@angular/core';
import { Hero } from '../data/hero';
import {HeroService} from '../service/hero.service';
import {ChartDataSets, ChartType, RadialChartOptions} from 'chart.js';
import {Label} from 'ng2-charts';
import {Filter} from '../data/filter';
import {FilterService} from '../service/filter.service';
import {ArmeService} from '../service/arme.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  heroes: Array<any> = [];
  filter: Filter;
  public radarChartOptions: RadialChartOptions = {
    responsive: true,
    scale: {
      ticks: {
        suggestedMin: 0,
      }
    }
  };
  public radarChartLabels: Label[] = ['Attaque', 'Esquive', 'Dégats', 'PV'];
  public radarChartType: ChartType = 'radar';
  public isLoading = true;

  constructor(private heroService: HeroService,
              private filterService: FilterService,
              private armeService: ArmeService) { }

  getHeroes(): void {
    this.isLoading = true;
    const heroesWithChartData = [];
    this.heroService.getHeroes()
      .subscribe((heroes) => {
        // @ts-ignore
        heroes = this.filterService.filter(heroes, this.filter);
        heroes.forEach((hero) => {
          let heroWithChartData: object;
          const chartData: ChartDataSets[] = [
            { data: [hero.attaque, hero.esquive, hero.degat, hero.pv], label: hero.name }
          ];
          this.armeService.getArme(hero.armeId).subscribe(arme => {
            if (arme.id !== undefined) {
              chartData.push({
                data: [hero.attaque + arme.attaque, hero.esquive + arme.esquive, hero.degat + arme.degat, hero.pv + arme.pv ],
                label: hero.name + ' + ' + arme.name
              });
            }
          });
          heroWithChartData = {...hero, chartData};
          heroesWithChartData.push(heroWithChartData);
        });
        this.heroes = heroesWithChartData;
        this.isLoading = false;
      });
  }

  ngOnInit() {
    this.getHeroes();
    this.filter = new Filter();
  }

  removeHero(hero: Hero) {
    this.heroService.deleteHero(hero.id);
    this.heroes.splice(this.heroes.indexOf(hero), 1);
    this.getHeroes();
  }

  filtrer() {
    this.getHeroes();
  }
}
