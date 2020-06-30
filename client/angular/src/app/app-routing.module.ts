import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavComponent } from './shared/components/nav/nav.component';

const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [
      { path: '', redirectTo: '/chat', pathMatch: 'full' },
      {
        path: 'hello-world',
        loadChildren: () =>
          import('./hello-world/hello-world.module').then(
            m => m.HelloWorldModule,
          ),
      },
      {
        path: 'chat',
        loadChildren: () =>
          import('./chat/chat.module').then(m => m.ChatModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
