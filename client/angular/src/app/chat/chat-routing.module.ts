import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopComponent } from './components/top/top.component';
import { RoomComponent } from './components/room/room.component';
import { ChatResolver } from './guards/room.resolver';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: TopComponent,
      },
      {
        path: 'room',
        component: RoomComponent,
        resolve: {
          ChatResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatRoutingModule {}
