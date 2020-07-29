import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { ProductsComponent } from './components/products/products.component';
import { ReportsComponent } from './components/reports/reports.component';
import { HelpComponent } from './components/help/help.component';
import { ProductComponent } from './components/products/product/product.component';
import { LoginComponent } from './components/login/login.component';

const APP_ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'inventario', component: InventoryComponent },
  { path: 'productos', component: ProductsComponent },
  { path: 'productos/:id', component: ProductComponent },
  { path: 'reportes', component: ReportsComponent },
  { path: 'ayuda', component: HelpComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
]
//useHash para un mejor rendimiento al pasar parametros
export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash: true });
