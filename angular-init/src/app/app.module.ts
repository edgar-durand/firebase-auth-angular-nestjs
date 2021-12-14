import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from "./material.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {environment} from '../environments/environment';
import {AngularFireAuthGuard} from "@angular/fire/compat/auth-guard";
import {getAuth, provideAuth} from "@angular/fire/auth";
import firebase from 'firebase/compat/app';
import {AngularFireModule} from "@angular/fire/compat";
import {AuthInterceptorService} from "./interceptors/request.interceptor";

firebase.initializeApp(environment.firebase);
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    provideAuth(() => getAuth()),
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [
    AngularFireAuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
