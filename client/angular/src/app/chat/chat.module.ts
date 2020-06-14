import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { TopComponent } from './components/top/top.component';
import { RoomComponent } from './components/room/room.component';

@NgModule({
  declarations: [TopComponent, RoomComponent],
  imports: [CommonModule, ChatRoutingModule],
})
export class ChatModule {}
