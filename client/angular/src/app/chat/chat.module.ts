import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { TopComponent } from './top/top.component';
import { RoomComponent } from './room/room.component';


@NgModule({
  declarations: [TopComponent, RoomComponent],
  imports: [
    CommonModule,
    ChatRoutingModule
  ]
})
export class ChatModule { }
