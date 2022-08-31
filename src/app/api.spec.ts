import {Request} from './api';
import {Plan} from './plans/plan.class';

describe('API', () => {
	it('should create an instance', () => {
		expect(new Request()).toBeTruthy();
	});

	it('should work properly', async () => {
		expect(new Request()).toBeTruthy();

		const response = await new Request().get('/v3/plans/{id}', 1);
		expect(response.statusCode).toBe(200);
		expect(response.headers.get('content-type')).toBe('application/json');

		const body = await response.body<Plan>();
		expect(body).toBeTruthy();
	});
});
