import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Filter} from '../data/filter';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Input() filter: Filter;
  @Output() event = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  validate() {
    this.event.emit();
  }
}
