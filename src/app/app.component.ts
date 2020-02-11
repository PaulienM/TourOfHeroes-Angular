import { Component } from '@angular/core';
import {HeroService} from './service/hero.service';
import {Hero} from './data/hero';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Tour of Heroes';

  constructor(private heroService: HeroService,
              private router: Router) {
  }

  newHero() {
    this.heroService.addHero(new Hero()).then(data => {
      this.router.navigate(['/detail/' + data.id]);
    });
  }
}
