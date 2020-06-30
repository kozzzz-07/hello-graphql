import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { TopComponent, RoomComponent } from './components/';
import { SharedModule } from '../shared/shared.module';
import { CommentComponent } from './components/comment/comment.component';

@NgModule({
  declarations: [TopComponent, RoomComponent, CommentComponent],
  imports: [CommonModule, ChatRoutingModule, SharedModule],
})
export class ChatModule {}
