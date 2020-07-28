import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import * as firebase from 'firebase';

firebase.initializeApp({
  apiKey: "AIzaSyBfMnCY-DbQDQ-WJmvTaMR4iyvILy6EDqo",
  authDomain: "todoapp-7c774.firebaseapp.com",
  databaseURL: "https://todoapp-7c774.firebaseio.com",
  projectId: "todoapp-7c774",
  storageBucket: "todoapp-7c774.appspot.com",
  messagingSenderId: "933393744395",
  appId: "1:933393744395:web:baf8356824f10717717d0e"
});

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
