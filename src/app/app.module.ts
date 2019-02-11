import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { NgxGraphModule } from '@swimlane/ngx-graph';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AppComponent } from './app.component';
import { GraphComponent } from './components/graph/graph.component';
import { IdstrPipe } from './pipes/idstr.pipe';
import { GoogleAuthComponent } from './components/google-auth/google-auth.component';


import { AuthGuard } from './guards/auth.guard';
import { NavComponent } from './components/nav/nav.component';

const routes: Routes = [
    { path: '', component: GoogleAuthComponent},
    { path: 'graph', component: GraphComponent, canActivate: [AuthGuard]}
];


@NgModule({
  declarations: [AppComponent, GraphComponent, IdstrPipe, GoogleAuthComponent, NavComponent],
    imports: [
        RouterModule.forRoot(routes),
        BrowserModule, FormsModule,
        HttpClientModule,
        NgxGraphModule,
        NgxChartsModule,
        BrowserAnimationsModule],
    providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
