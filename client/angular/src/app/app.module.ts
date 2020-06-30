import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GraphQLModule } from './modules/graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { HelloWorldComponent } from './hello-world/hello-world.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, HelloWorldComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    GraphQLModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
