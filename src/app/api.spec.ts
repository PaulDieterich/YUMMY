import {TestBed} from '@angular/core/testing';
import {HttpClient} from '@angular/common/http';

import {API} from './api.class';

describe('Api', () => {
	let http: HttpClient;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		http = TestBed.inject(HttpClient);
	});

	it('should create an instance', () => {
		expect(new API(http)).toBeTruthy();
	});
});
