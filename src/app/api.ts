/* eslint-disable no-underscore-dangle */

/*
 * Utility to make API calls to the backend. Syntax based on Java's RestAssured library.
 */
export class Request {

	private _url = 'http://144.24.179.204:8080';
	private _headers = new Headers();
	private _body: object;
	private _pathParams: Map<string, any> = new Map();
	private _queryParams: Map<string, any> = new Map();

	constructor() {
		this._headers.set('Content-Type', 'application/json');
		this._headers.set('Accept', 'application/json');
	}

	headers(headers: Map<string, any>): Request {
		headers.forEach((value, key) => this.header(key, value));
		return this;
	}

	header(key: string, value: any): Request {
		this._headers.set(key, value);
		return this;
	}

	auth(username: string, password: string): Request {
		this.header('Authorization', 'Basic ' + btoa(username + ':' + password));
		return this;
	}

	body(body: object): Request {
		this._body = body;
		return this;
	}

	pathParam(key: string, value: any): Request {
		this._pathParams.set(key, encodeURIComponent(value));
		return this;
	}

	pathParams(params: Map<string, any>): Request {
		params.forEach((value, key) => this.pathParam(key, value));
		return this;
	}

	queryParam(key: string, value: any): Request {
		this._queryParams.set(key, encodeURIComponent(value));
		return this;
	}

	queryParams(params: Map<string, any>): Request {
		params.forEach((value, key) => this.queryParam(key, value));
		return this;
	}

	async options(path: string, ...params: any[]): Promise<Response>;
	async options(path: string, params: Map<string, any>): Promise<Response>;
	async options(path: string, params?: any[] | Map<string, any>): Promise<Response> {
		return await this._send('OPTIONS', path, params);
	}

	async get(path: string, ...params: any[]): Promise<Response>;
	async get(path: string, params: Map<string, any>): Promise<Response>;
	async get(path: string, params?: any[] | Map<string, any>): Promise<Response> {
		this._body = null;
		return await this._send('GET', path, params);
	}

	async post(path: string, ...params: any[]): Promise<Response>;
	async post(path: string, params: Map<string, any>): Promise<Response>;
	async post(path: string, params?: any[] | Map<string, any>): Promise<Response> {
		return await this._send('POST', path, params);
	}

	async put(path: string, ...params: any[]): Promise<Response>;
	async put(path: string, params: Map<string, any>): Promise<Response>;
	async put(path: string, params?: any[] | Map<string, any>): Promise<Response> {
		return await this._send('PUT', path, params);
	}

	async delete(path: string, ...params: any[]): Promise<Response>;
	async delete(path: string, params: Map<string, any>): Promise<Response>;
	async delete(path: string, params?: any[] | Map<string, any>): Promise<Response> {
		return await this._send('DELETE', path, params);
	}

	private async _send(method: string, path: string, params?: any[] | Map<string, any>): Promise<Response> {
		// Append path to url
		if (path.startsWith('/')) {
			this._url += path;
		} else {
			this._url += '/' + path;
		}

		// If there are path params
		if (params) {
			if (params instanceof Map) {
				// Add named path params to the list of query params
				params.forEach((value, key) => this.pathParam(key, value));
			} else {
				// Replace positional path params with the given args
				if (params instanceof Array) {
					this._url = this._url.replace(/{[^}]*}/g, () => encodeURIComponent(params.shift()));
				} else {
					this._url = this._url.replace(/{[^}]*}/g, () => encodeURIComponent(params));
				}
			}
		}
		if (this._pathParams.size > 0) {
			for (const [key, value] of this._pathParams) {
				this._url = this._url.replace('{' + key + '}', value);
			}
		}

		// If there are query params
		if (this._queryParams.size > 0) {
			this._url += '?';
			for (const [key, value] of this._queryParams) {
				this._url += key + '=' + value + '&';
			}
			this._url = this._url.slice(0, -1);
		}

		const fetchOptions: RequestInit = {
			method,
			headers: this._headers
		};
		if (this._body) {
			fetchOptions.body = JSON.stringify(this._body);
		}

		return new Promise<Response>((resolve, reject) => {
			fetch(this._url, fetchOptions).then(async response => {
				resolve(new Response(response));
			}).catch(error => {
				reject(error);
			});
		});
	}
}

export class Response {

	private _statusCode: number;
	private _headers: Map<string, any> = new Map();
	private _body: Promise<any>;

	constructor(_fetchResult: globalThis.Response) {
		this._statusCode = _fetchResult.status;
		_fetchResult.headers.forEach((value, key) => this._headers.set(key, value));
		this._body = _fetchResult.json();
	}

	get statusCode(): number {
		return this._statusCode;
	}

	get headers(): Map<string, any> {
		return this._headers;
	}

	async body<T>(): Promise<T> {
		return (await this._body) as T;
	}
}
