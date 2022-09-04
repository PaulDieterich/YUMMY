import {Filter} from './list/filter.class';
import {Sorter} from './list/sorter.class';
import {Pagination} from './list/pagination.class';
import {Request} from './api.class';
import {Entity} from './entity.class';

export abstract class Service<E extends Entity, Attribute> {

	// Ruft Zeitpläne aus der API ab und persistiert diese auf 3 Ebenen:
	// - Ebenen 1: Online (keine Persistenz)
	// - Ebenen 2: Cache (Persistiert in lokaler Variable)
	// - Ebenen 3: Favoriten (Persistiert in LocalStorage, bisher nicht implementiert)

	private readonly basePath: string;
	private lists = new Map<Filter<Attribute>[], E[]>();
	private entitys = new Map<number, E>();

	protected constructor(basePath: string) {
		this.basePath = basePath;
	}

	list(filters?: Filter<Attribute>[], sorter?: Sorter<Attribute>[], pagination?: Pagination): Promise<E[]> {
		return this.computeIfAbsentAsync(this.lists, filters, async () => {
			const request = new Request();
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
			const response = await request.get('{basePath}', this.basePath);
			return response.body<E[]>();
		});
	}

	get(id: number): Promise<E> {
		return this.computeIfAbsentAsync(this.entitys, id, async () => {
			const request = new Request();
			const response = await request.get('{basePath}/{id}', this.basePath, id);
			return response.body<E>();
		});
	}

	create(entity: E): Promise<E> {
		const promise = new Promise<E>((resolve, reject) => {
			const request = new Request();
			request.body(entity);
			request.post('{basePath}', this.basePath).then(response => {
				resolve(response.body<E>());
			});
		});
		promise.then(this.updateCache);
		return promise;
	}

	update(entity: E): Promise<E> {
		const promise = new Promise<E>((resolve, reject) => {
			const request = new Request();
			request.body(entity);
			request.put('{basePath}/{id}', this.basePath, entity.getId()).then(response => {
				resolve(response.body<E>());
			});
		});
		promise.then(this.updateCache);
		return promise;
	}

	delete(id: number): Promise<boolean> {
		const promise = new Promise<boolean>((resolve, reject) => {
			const request = new Request();
			request.delete('{basePath}/{id}', this.basePath, id).then(response => {
				resolve(response.statusCode === 200);
			});
		});
		promise.then(success => {
			if (success) {
				this.deleteCache(id);
			}
		});
		return promise;
	}

	private computeIfAbsentAsync<K, V>(map: Map<K, V>, key: K, value: () => Promise<V>): Promise<V> {
		if (!map.has(key)) {
			return new Promise<V>((resolve, reject) => {
				value().then(val => map.set(key, val));
			});
		} else {
			return Promise.resolve(map.get(key));
		}
	}

	private updateCache(entity: E) {
		// Add or update entity in local cache
		this.entitys.set(entity.getId(), entity);
		// Iterate through all filtered lists and update the entity if it is in there
		this.lists.forEach((entitys, filters) => {
			const index = entitys.findIndex(p => entity.getId() === p.getId());
			if (index !== -1) {
				entitys[index] = entity;
				this.lists.set(filters, entitys);
			}
		});
	}

	private deleteCache(id: number) {
		// Remove entity in local cache
		this.entitys.delete(id);
		// Iterate through all filtered lists and remove the entity if it is in there
		this.lists.forEach((entitys, filters) => {
			const index = entitys.findIndex(p => id === p.getId());
			if (index !== -1) {
				entitys.splice(index, 1);
				this.lists.set(filters, entitys);
			}
		});
	}
}
