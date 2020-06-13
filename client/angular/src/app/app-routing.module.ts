import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavComponent } from './shared/components/nav/nav.component';

const routes: Routes = [
  {
    path: 'hello-world',
    component: NavComponent,
    loadChildren: () =>
      import('./hello-world/hello-world.module').then(m => m.HelloWorldModule),
  },
  {
    path: 'chat',
    component: NavComponent,
    loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
