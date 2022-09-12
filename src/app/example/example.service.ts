import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API} from '../common/api.class';
import {Observable} from 'rxjs';
import {Example} from './example';

@Injectable({
  providedIn: 'root'
})
export class ExampleService {

  constructor(private http: HttpClient) { }

	get(): Observable<Example> {
	  return new API<Example>(this.http)
		  .get('/example');
	}

	update(example: Example): Observable<Example> {
	  return new API<Example>(this.http)
		  .body(example)
		  .put('/example');
	}
}
