import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

// import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { GroupsPage } from './groups.page';
import { GroupsPageModule } from './groups.module';
describe('GroupsPage', () => {
  let component: GroupsPage;
  let fixture: ComponentFixture<GroupsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupsPage],
      imports: [IonicModule.forRoot(),] // ExploreContainerComponentModule
    }).compileComponents();

    fixture = TestBed.createComponent(GroupsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
