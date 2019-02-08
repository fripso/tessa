import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { NgxGraphModule } from '@swimlane/ngx-graph';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AppComponent } from './app.component';
import { GraphComponent } from './components/graph/graph.component';
import { IdstrPipe } from './pipes/idstr.pipe';
import { GoogleAuthComponent } from './components/google-auth/google-auth.component';

@NgModule({
  declarations: [AppComponent, GraphComponent, IdstrPipe, GoogleAuthComponent],
    imports: [BrowserModule, FormsModule, HttpClientModule, NgxGraphModule, NgxChartsModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
