import { Component, OnInit } from '@angular/core';
import {Arme} from '../data/arme';
import {ArmeService} from '../service/arme.service';
import {ChartDataSets, ChartType, RadialChartOptions} from 'chart.js';
import {Label} from 'ng2-charts';

@Component({
  selector: 'app-armes',
  templateUrl: './armes.component.html',
  styleUrls: ['./armes.component.scss']
})
export class ArmesComponent implements OnInit {
  armes: Array<any> = [];
  public radarChartOptions: RadialChartOptions = {
    responsive: true,
    scale: {
      ticks: {
        suggestedMin: -5,
        suggestedMax: 5
      }
    }
  };
  public radarChartLabels: Label[] = ['Attaque', 'Esquive', 'Dégats', 'PV'];
  public radarChartType: ChartType = 'radar';
  public isLoading = true;

  constructor(private armeService: ArmeService) { }

  getArmes(): void {
    this.isLoading = true;
    const armesWithChartData = [];
    this.armeService.getArmes()
      .subscribe((armes) => {
        armes.forEach((arme) => {
          let armeWithChartData: object;
          const chartData: ChartDataSets[] = [
            { data: [arme.attaque, arme.esquive, arme.degat, arme.pv], label: arme.name }
          ];
          armeWithChartData = {...arme, chartData};
          armesWithChartData.push(armeWithChartData);
        });
        this.armes = armesWithChartData;
        this.isLoading = false;
      });
  }

  ngOnInit() {
    this.getArmes();
  }

  removeArme(arme: Arme) {
    this.armeService.deleteArme(arme.id);
    this.getArmes();
  }
}
