import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {API} from './api.class';
import {Entity} from './entity.class';
import {Filter} from './list/filter.class';
import {Sorter} from './list/sorter.class';
import {Pagination} from './list/pagination.class';

export abstract class ApiService<E extends Entity, Attribute> {

	protected constructor(private http: HttpClient, private readonly basePath: string) { }

	list(filters?: Filter<Attribute>[], sorter?: Sorter<Attribute>[], pagination?: Pagination): Observable<E[]> {
		const request = new API<E[]>(this.http);

		if (filters) {
			filters.forEach(filter => {
				request.queryParam(filter.getAttribute() as unknown as string, filter.getFilter() + ':' + filter.getValue());
			});
		}

		if (sorter) {
			sorter.forEach(sort => {
				request.queryParam('sort', sort.toString());
			});
		}

		if (pagination) {
			if (pagination.getLimit()) {
				request.queryParam('limit', pagination.getLimit());
			}
			if (pagination.getAfterId()) {
				request.queryParam('afterId', pagination.getAfterId());
			}
			if (pagination.getOffset()) {
				request.queryParam('offset', pagination.getOffset());
			}
			if (pagination.getPage()) {
				request.queryParam('page', pagination.getPage());
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
		request.body(entity);
		return request.post(`${this.basePath}`);
	}

	update(entity: E): Observable<E> {
		const request = new API<E>(this.http);
		request.body(entity);
		return request.put(`${this.basePath}/{id}`, entity.getId());
	}

	delete(id: number) {
		const request = new API<E>(this.http);
		return request.delete(`${this.basePath}/{id}`, id);
	}
}
