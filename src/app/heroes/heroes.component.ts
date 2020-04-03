import {Component, OnInit} from '@angular/core';
import { Hero } from '../data/hero';
import {HeroService} from '../service/hero.service';
import {ChartDataSets, ChartType, RadialChartOptions} from 'chart.js';
import {Label} from 'ng2-charts';
import {Filter} from '../data/filter';
import {FilterService} from '../service/filter.service';
import {ArmeService} from '../service/arme.service';
import {Sort} from '../data/sort';
import {SortService} from '../service/sort.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  heroes: Array<any> = [];
  allHeroes: Array<any> = [];
  filter: Filter;
  sort: Sort;
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
              private sortService: SortService,
              private armeService: ArmeService) { }

  getHeroes(): void {
    // Les héros n'ont pas encore chargé
    this.isLoading = true;
    // objet contenant les héro et les données formaté pour etre utilisées dans ng2chart
    const heroesWithChartData = [];
    // on récupère les héros grace au héro service
    this.heroService.getHeroes()
      // lorsque la liste de héros est récupérée..
      .subscribe((heroes) => {
        // On filtre les héro grace au service filtre
        // @ts-ignore
        heroes = this.filterService.filter(heroes, this.filter);
        // On trie les héro
        // @ts-ignore
        heroes = this.sortService.sort(heroes, this.sort);
        // Pour chaque héro
        heroes.forEach((hero) => {
          // On créé une variable pour stocker les données du héro formatées pour ng2chart
          let heroWithChartData: object;
          const chartData: ChartDataSets[] = [
            { data: [hero.attaque, hero.esquive, hero.degat, hero.pv], label: hero.name }
          ];
          // On récupère l'arme associée au héro
          this.armeService.getArme(hero.armeId).subscribe(arme => {
            // Si l'arme existe en base
            if (arme.id !== undefined) {
              // On ajoute au données ng2chart les données du héro avec son arme
              chartData.push({
                data: [hero.attaque + arme.attaque, hero.esquive + arme.esquive, hero.degat + arme.degat, hero.pv + arme.pv ],
                label: hero.name + ' + ' + arme.name
              });
            }
          });
          // on combine la valeur de hero avec les données du héro formatées pour ng2chart
          heroWithChartData = {...hero, chartData};
          heroesWithChartData.push(heroWithChartData);
        });
        this.heroes = heroesWithChartData;
        // Variable qui stocke tous les héros. Utilisé pour récupérer tous les héro après les avoir filtré
        this.allHeroes = this.heroes;
        // Le chargement est terminé
        this.isLoading = false;
      });
  }

  ngOnInit() {
    this.getHeroes();
    this.filter = new Filter();
    this.sort = new Sort();
  }

  removeHero(hero: Hero) {
    this.heroService.deleteHero(hero.id);
    this.heroes.splice(this.heroes.indexOf(hero), 1);
    this.getHeroes();
  }

  filtrer() {
    this.heroes = this.filterService.filter(this.allHeroes, this.filter);
  }

  sorting() {
    this.heroes = this.sortService.sort(this.heroes, this.sort);
  }
}
