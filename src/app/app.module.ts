import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {MatDatepickerModule} from '@angular/material';
import {AuthInterceptor} from './modules/auth/auth.interceptor';
import {JWT_OPTIONS, JwtHelperService} from '@auth0/angular-jwt';
import {ToastrModule} from 'ngx-toastr';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import { SharedModule } from './modules/shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';
import { PageNotFound } from './components/404-not-found/404-not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { StoreModule } from '@ngrx/store';
import { reducers } from './modules/tasks/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFound,
    DashboardComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SharedModule,
    AuthModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    })
  ],
  exports: [SharedModule],
  providers: [
    MatDatepickerModule,
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
