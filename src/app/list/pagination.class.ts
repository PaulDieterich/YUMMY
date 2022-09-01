export class Pagination {

	private limit?: number;
	private afterId?: number;
	private offset?: number;
	private page?: number;

	getLimit(): number {
		return this.limit;
	}

	setLimit(value: number): void {
		this.limit = value;
	}

	getAfterId(): number {
		return this.afterId;
	}

	setAfterId(value: number): void {
		this.afterId = value;
	}

	getOffset(): number {
		return this.offset;
	}

	setOffset(value: number): void {
		this.offset = value;
	}

	getPage(): number {
		return this.page;
	}

	setPage(value: number): void {
		this.page = value;
	}

	toString(): string {
		let result = '';
		if (this.limit) {
			result += `&limit=${this.limit}`;
		}
		if (this.afterId) {
			result += `&after_id=${this.afterId}`;
		}
		if (this.offset) {
			result += `&offset=${this.offset}`;
		}
		if (this.page) {
			result += `&page=${this.page}`;
		}

		if (result.length > 0) {
			result = result.substring(1);
		}

		return result;
	}
}
