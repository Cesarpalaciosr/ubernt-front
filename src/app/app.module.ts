import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular'; 
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
//process.env.
@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideFirebaseApp(() => initializeApp({
    "projectId":"ubernt-99b85",
    "appId":"1:592747694283:web:16e99bef85bc7120c0b34e",
    "storageBucket":"ubernt-99b85.appspot.com",
    "apiKey":"AIzaSyA0hVJYyEk71oPi5WKQp2_PNx-cLEF1IL4",
    "authDomain":"ubernt-99b85.firebaseapp.com",
    "messagingSenderId":"592747694283"
  })), provideStorage(() => getStorage())],
  bootstrap: [AppComponent],
})
export class AppModule {}