import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { branchFeature} from './store/reducers/branch.reducer';
import { warehouseFeature } from './store/reducers/warehouse.reducer';


export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(), provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideStore({[branchFeature.name]:branchFeature.reducer, [warehouseFeature.name]:warehouseFeature.reducer})
  ]
};
