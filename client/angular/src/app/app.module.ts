import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GraphQLModule } from './modules/graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { HelloWorldComponent } from './hello-world/hello-world.component';
import { MaterialModule } from './modules/material.module';
import { SideNavComponent } from './shared/side-nav/side-nav.component';

@NgModule({
  declarations: [AppComponent, HelloWorldComponent, SideNavComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    GraphQLModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
