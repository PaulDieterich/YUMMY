import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {API} from './api.class';
import {Entity} from './entity.class';
import {Filter, Pagination, Sorter} from './list/util.class';

export class ApiService<E extends Entity, Attribute> {

	public user: string;
	public password: string;

	public constructor(private http: HttpClient, private readonly basePath: string) { }

	auth(user: string, password: string): ApiService<E, Attribute> {
		this.user = user;
		this.password = password;
		return this;
	}

	list(filters?: Filter<Attribute>[], sorter?: Sorter<Attribute>[], pagination?: Pagination): Observable<E[]> {
		const request = new API<E[]>(this.http);

		if (filters) {
			filters.forEach(filter => {
				request.queryParam(filter.attribute as unknown as string, filter.filter + ':' + filter.value);
			});
		}

		if (sorter) {
			sorter.forEach(sort => {
				request.queryParam('sort', sort.toString());
			});
		}

		if (pagination) {
			if (pagination.limit) {
				request.queryParam('limit', pagination.limit);
			}
			if (pagination.afterId) {
				request.queryParam('afterId', pagination.afterId);
			}
			if (pagination.offset) {
				request.queryParam('offset', pagination.offset);
			}
			if (pagination.page) {
				request.queryParam('page', pagination.page);
			}
		}

		return request.get(`${this.basePath}`);
	}

	get(id: number): Observable<E> {
		const request = new API<E>(this.http);
		return request.get(`${this.basePath}/{id}`, id);
	}

	create(entity: E): Observable<E> {
		const request = new API<E>(this.http);
		request.auth(this.user, this.password);
		request.body(entity);
		return request.post(`${this.basePath}`);
	}

	update(entity: E): Observable<E> {
		const request = new API<E>(this.http);
		request.auth(this.user, this.password);
		request.body(entity);
		return request.put(`${this.basePath}/{id}`, entity.getId());
	}

	delete(id: number) {
		const request = new API<E>(this.http);
		request.auth(this.user, this.password);
		return request.delete(`${this.basePath}/{id}`, id);
	}
}
