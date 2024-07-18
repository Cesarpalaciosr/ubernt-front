import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { RecommendedPage } from './recommended.page';

describe('RecommendedPage', () => {
  let component: RecommendedPage;
  let fixture: ComponentFixture<RecommendedPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecommendedPage],
      imports: [IonicModule.forRoot(), RouterModule.forRoot([])]
    }).compileComponents();

    fixture = TestBed.createComponent(RecommendedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

