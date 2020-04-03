import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Sort} from '../data/sort';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {
  @Input() sort: Sort;
  @Output() event = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  validate() {
    this.event.emit();
  }

}
