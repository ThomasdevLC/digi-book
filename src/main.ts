import {bootstrapApplication} from '@angular/platform-browser';
import {appConfig} from './app/app.config';
import {AppComponent} from './app/app.component';
import {provideToastr} from "ngx-toastr";
import {provideHttpClient} from "@angular/common/http";
import {routes} from "./app/app.routes";
import {provideRouter} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {importProvidersFrom} from "@angular/core";

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    provideToastr(),
    provideHttpClient(),
    provideRouter(routes),
    importProvidersFrom(BrowserAnimationsModule),
  ],
})
  .catch((err) => console.error(err));
