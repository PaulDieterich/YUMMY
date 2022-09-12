import {User} from './user.class';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API} from '../common/api.class';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	private username: string;
	private password: string;

	constructor(private http: HttpClient) {
	}

	auth(user: string, password: string): UserService {
		this.username = user;
		this.password = password;
		return this;
	}

	list(): Observable<User[]> {
		return new API<User[]>(this.http)
			.auth('admin', 'admin')
			.get('/users');
	}

	get(): Observable<User> {
		return new API<User>(this.http)
			.auth(this.username, this.password)
			.get('/user');
	}

	create(user: User): Observable<User> {
		return new API<User>(this.http)
			.body(user)
			.post('/users');
	}

	update(user: User): Observable<User> {
		return new API<User>(this.http)
			.auth(this.username, this.password)
			.body(user)
			.put('/user');
	}

	delete(): Observable<boolean> {
		return new API(this.http)
			.auth(this.username, this.password)
			.delete('/user');
	}
}
