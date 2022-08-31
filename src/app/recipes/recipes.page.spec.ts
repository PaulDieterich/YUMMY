import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';
import {ExploreContainerComponentModule} from '../explore-container/explore-container.module';

import {RecipesPage} from './recipes.page';

describe('Tab2Page', () => {
	let component: RecipesPage;
	let fixture: ComponentFixture<RecipesPage>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [RecipesPage],
			imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
		}).compileComponents();

		fixture = TestBed.createComponent(RecipesPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
