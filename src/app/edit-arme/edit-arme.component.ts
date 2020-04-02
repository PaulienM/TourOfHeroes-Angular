import {Component, Input, OnInit} from '@angular/core';
import {ArmeService} from '../service/arme.service';
import {ActivatedRoute} from '@angular/router';
import {Arme} from '../data/arme';

@Component({
  selector: 'app-edit-arme',
  templateUrl: './edit-arme.component.html',
  styleUrls: ['./edit-arme.component.scss']
})
export class EditArmeComponent implements OnInit {
  @Input() arme: Arme;

  constructor(private armeService: ArmeService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getArme();
  }

  getArme(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.armeService.getArme(id)
      .subscribe(arme => this.arme = arme);
  }
}
