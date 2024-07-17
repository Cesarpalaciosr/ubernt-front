import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RolPage } from './rol.page';

describe('RolPage', () => {
  let component: RolPage;
  let fixture: ComponentFixture<RolPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RolPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
