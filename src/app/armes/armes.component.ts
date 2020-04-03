import { Component, OnInit } from '@angular/core';
import {Arme} from '../data/arme';
import {ArmeService} from '../service/arme.service';
import {ChartDataSets, ChartType, RadialChartOptions} from 'chart.js';
import {Label} from 'ng2-charts';
import {Filter} from '../data/filter';
import {FilterService} from '../service/filter.service';
import { Sort } from '../data/sort';
import {SortService} from '../service/sort.service';

@Component({
  selector: 'app-armes',
  templateUrl: './armes.component.html',
  styleUrls: ['./armes.component.scss']
})
export class ArmesComponent implements OnInit {
  armes: Array<any> = [];
  allArmes: Array<any> = [];
  filter: Filter;
  sort: Sort;
  public radarChartOptions: RadialChartOptions = {
    responsive: true,
    scale: {
      ticks: {
        suggestedMin: -5,
      }
    }
  };
  public radarChartLabels: Label[] = ['Attaque', 'Esquive', 'Dégats', 'PV'];
  public radarChartType: ChartType = 'radar';
  public isLoading = true;

  constructor(private armeService: ArmeService,
              private filterService: FilterService,
              private sortService: SortService) { }

  getArmes(): void {
    this.isLoading = true;
    const armesWithChartData = [];
    this.armeService.getArmes()
      .subscribe((armes) => {
        armes = this.filterService.filter(armes, this.filter);
        armes = this.sortService.sort(armes, this.sort);
        armes.forEach((arme) => {
          let armeWithChartData: object;
          const chartData: ChartDataSets[] = [
            { data: [arme.attaque, arme.esquive, arme.degat, arme.pv], label: arme.name }
          ];
          armeWithChartData = {...arme, chartData};
          armesWithChartData.push(armeWithChartData);
        });
        this.armes = armesWithChartData;
        this.allArmes = this.armes;
        this.isLoading = false;
      });
  }

  ngOnInit() {
    this.filter = new Filter();
    this.sort = new Sort();
    this.filter.attaque = -5;
    this.filter.esquive = -5;
    this.filter.pv = -5;
    this.filter.degat = -5;
    this.getArmes();
  }

  removeArme(arme: Arme) {
    this.armeService.deleteArme(arme.id);
    this.getArmes();
  }

  filtrer() {
    this.armes = this.filterService.filter(this.allArmes, this.filter);
  }

  sorting() {
    this.armes = this.sortService.sort(this.armes, this.sort);
  }
}
