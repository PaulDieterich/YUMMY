import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

export class API<E> {

	private mUrl = 'http://144.24.179.204:8080';
	private mHeaders = new HttpHeaders();
	private mBody: E;
	private mPathParams: Map<string, any> = new Map();
	private mQueryParams = new HttpParams();

	constructor(private http: HttpClient) {
		this.mHeaders = this.mHeaders.set('Content-Type', 'application/json');
		this.mHeaders = this.mHeaders.set('Accept', 'application/json');
	}

	headers(headers: Map<string, any>): API<E> {
		headers.forEach((value, key) => this.header(key, value));
		return this;
	}

	header(key: string, value: any): API<E> {
		this.mHeaders = this.mHeaders.set(key, value);
		return this;
	}

	auth(username: string, password: string): API<E> {
		this.header('Authorization', 'Basic ' + btoa(username + ':' + password));
		return this;
	}

	body(body: E): API<E> {
		this.mBody = body;
		return this;
	}

	pathParams(params: Map<string, string | number>): API<E> {
		params.forEach((value, key) => this.pathParam(key, value));
		return this;
	}

	pathParam(key: string, value: string | number): API<E> {
		this.mPathParams.set(key, encodeURIComponent(value));
		return this;
	}

	queryParams(params: Map<string, string | number | boolean | Array<string | number | boolean>>): API<E> {
		params.forEach((value, key) => this.queryParam(key, value));
		return this;
	}

	queryParam(key: string, value: string | number | boolean | Array<string | number | boolean>): API<E> {
		if (value instanceof Array<string | number | boolean>) {
			value.forEach(v => this.queryParam(key, v));
		} else {
			this.mQueryParams = this.mQueryParams.append(key, value);
		}
		return this;
	}

	options(path: string, ...params: any[]): Observable<string[]>;
	options(path: string, params: Map<string, any>): Observable<string[]>;
	options(path: string, params?: any[] | Map<string, any>): Observable<string[]> {
		this.prepare(path, params);
		return new Observable<string[]>(observer => {
			this.http.options<E>(this.mUrl, {
				headers: this.mHeaders,
				observe: 'response',
				params: this.mQueryParams
			}).subscribe(response => {
				observer.next(response.headers.getAll('Allow'));
				observer.complete();
			});
		});
	}

	get(path: string, ...params: any[]): Observable<E>;
	get(path: string, params: Map<string, any>): Observable<E>;
	get(path: string, params?: any[] | Map<string, any>): Observable<E> {
		this.prepare(path, params);
		return this.http.get<E>(this.mUrl, {
			headers: this.mHeaders,
			params: this.mQueryParams
		});
	}

	post(path: string, ...params: any[]): Observable<E>;
	post(path: string, params: Map<string, any>): Observable<E>;
	post(path: string, params?: any[] | Map<string, any>): Observable<E> {
		this.prepare(path, params);
		return this.http.post<E>(this.mUrl, this.mBody, {
			headers: this.mHeaders,
			params: this.mQueryParams
		});
	}

	put(path: string, ...params: any[]): Observable<E>;
	put(path: string, params: Map<string, any>): Observable<E>;
	put(path: string, params?: any[] | Map<string, any>): Observable<E> {
		this.prepare(path, params);
		return this.http.put<E>(this.mUrl, this.mBody, {
			headers: this.mHeaders,
			params: this.mQueryParams
		});
	}

	delete(path: string, ...params: any[]): Observable<boolean>;
	delete(path: string, params: Map<string, any>): Observable<boolean>;
	delete(path: string, params?: any[] | Map<string, any>): Observable<boolean> {
		this.prepare(path, params);
		return new Observable<boolean>(observer => {
			this.http.delete<boolean>(this.mUrl, {
				headers: this.mHeaders,
				observe: 'response',
				params: this.mQueryParams
			}).subscribe(response => {
				observer.next(response.status === 200);
				observer.complete();
			});
		});
	}

	private prepare(path: string, params?: any[] | Map<string, any>): void {
		// Append path to url
		if (path.startsWith('/')) {
			this.mUrl += path;
		} else {
			this.mUrl += '/' + path;
		}

		// If there are path params
		if (params) {
			if (params instanceof Map) {
				// Add named path params to the list of query params
				params.forEach((value, key) => this.pathParam(key, value));
			} else {
				// Replace positional path params with the given args
				if (params instanceof Array) {
					this.mUrl = this.mUrl.replace(/{[^}]*}/g, () => encodeURIComponent(params.shift()));
				} else {
					this.mUrl = this.mUrl.replace(/{[^}]*}/g, () => encodeURIComponent(params));
				}
			}
		}
		if (this.mPathParams.size > 0) {
			for (const [key, value] of this.mPathParams) {
				this.mUrl = this.mUrl.replace('{' + key + '}', value);
			}
		}
	}
}
