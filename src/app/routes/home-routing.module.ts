import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from '../pages/home/home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'user',
        loadChildren: () =>
          import('../pages/home/user/user.module').then((m) => m.UserPageModule),
      },
      {
        path: 'map',
        loadChildren: () =>
          import('../pages/home/map/map.module').then((m) => m.MapPageModule),
      },
      {
        path: 'groups',
        loadChildren: () =>
          import('../pages/home/groups/groups.module').then((m) => m.GroupsPageModule), 
      },
      {
        path: 'recommended',
        loadChildren: () =>
          import('../pages/home/recommended/recommended.module').then((m) => m.RecommendedPageModule),
      },
      {
        path: 'schedule',
        loadChildren: () =>
          import('../pages/home/schedule/schedule.module').then((m) => m.SchedulePageModule),
      },
      {
        path: 'saved',
        loadChildren: () =>
          import('../pages/home/saved/saved.module').then((m) => m.SavedPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}