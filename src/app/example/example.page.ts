import {Component, OnInit} from '@angular/core';
import {Example} from './example';
import {ExampleService} from './example.service';

@Component({
	selector: 'app-example',
	templateUrl: './example.page.html',
	styleUrls: ['./example.page.scss'],
})
export class ExamplePage implements OnInit {

	example = new Example();

	constructor(private service: ExampleService) { }

	ngOnInit() {
		this.service.get().subscribe(value => {
			this.example = value;
			console.log('Success', value);
		}, error => {
			console.log('Failed', error);
		});
	}

	save() {
		this.service.update(this.example).subscribe(value => {
			this.example = value;
			console.log('Success', value);
		}, error => {
			console.log('Failed', error);
		});
	}
}
