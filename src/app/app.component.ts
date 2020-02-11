import { Component } from '@angular/core';
import {HeroService} from './service/hero.service';
import {Hero} from './data/hero';
import {Router} from '@angular/router';
import {ArmeService} from './service/arme.service';
import {Arme} from './data/arme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Tour of Heroes';

  constructor(private heroService: HeroService,
              private router: Router,
              private armeService: ArmeService) {
  }

  newHero() {
    this.heroService.addHero(new Hero()).then(data => {
      this.router.navigate(['/detail/' + data.id]);
    });
  }

  newArme() {
    this.armeService.addArme(new Arme()).then(data => {
      this.router.navigate(['/detail-arme/' + data.id]);
    });
  }
}
