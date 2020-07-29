import { RouterModule, Routes } from '@angular/router';

import { AutenticacionGuard } from './guards/autenticacion.guard';
import { NologinGuard } from './guards/nologin.guard';

import { HomeComponent } from './components/home/home.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { ProductsComponent } from './components/products/products.component';
import { ReportsComponent } from './components/reports/reports.component';
import { HelpComponent } from './components/help/help.component';
import { ProductComponent } from './components/products/product/product.component';
import { LoginComponent } from './components/login/login.component';
import { MainNavComponent } from './main-nav/main-nav.component';

const APP_ROUTES: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [NologinGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AutenticacionGuard] },
  { path: 'inventario', component: InventoryComponent, canActivate: [AutenticacionGuard] },
  { path: 'productos', component: ProductsComponent, canActivate: [AutenticacionGuard] },
  { path: 'productos/:id', component: ProductComponent, canActivate: [AutenticacionGuard] },
  { path: 'reportes', component: ReportsComponent, canActivate: [AutenticacionGuard] },
  { path: 'ayuda', component: HelpComponent, canActivate: [AutenticacionGuard] },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
]
//useHash para un mejor rendimiento al pasar parametros
export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash: true });
