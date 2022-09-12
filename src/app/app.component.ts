import { Component, OnChanges } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnChanges {
	userID: number;

	constructor() {
	}
	ngOnChanges(): void {
		//this.userID = JSON.parse(localStorage.getItem('loggedIn')).id;
		//console.log(this.userID);
	}
}
