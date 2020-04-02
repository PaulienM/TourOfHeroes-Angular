import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {EditHeroComponent} from './edit-hero/edit-hero.component';
import {ArmesComponent} from './armes/armes.component';
import {EditArmeComponent} from './edit-arme/edit-arme.component';
import {CreateHeroComponent} from './create-hero/create-hero.component';
import {CreateArmeComponent} from './create-arme/create-arme.component';

const routes: Routes = [
  { path: 'heroes', component: HeroesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'detail/:id', component: EditHeroComponent },
  { path: 'armes', component: ArmesComponent},
  { path: 'detail-arme/:id', component: EditArmeComponent },
  { path: 'create-hero', component: CreateHeroComponent},
  { path: 'create-arme', component: CreateArmeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
