import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-entry',
  templateUrl: './list-entry.component.html',
  styleUrls: ['./list-entry.component.scss'],
})
export class ListEntryComponent implements OnInit {
  @Input() name: string;
  @Input() cookingTime: string;
  @Input() image: string;

  constructor() { }

  ngOnInit() {

  }

}
