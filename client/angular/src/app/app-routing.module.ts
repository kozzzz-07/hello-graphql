import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HelloWorldComponent } from './hello-world/hello-world.component';
import { TopComponent } from './chat/top/top.component';

const routes: Routes = [
  { path: 'hello-world', component: HelloWorldComponent },
  { path: 'chat', component: TopComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
