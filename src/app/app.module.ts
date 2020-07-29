import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LayoutModule } from '@angular/cdk/layout';

import { FlexLayoutModule } from '@angular/flex-layout';

//Route
import { APP_ROUTING } from './app.routes';

//Firebase - back
//import { firebaseConfig, environment } from '../environments/environment';
//para mandar a producción con ng build --prod, necesita llamar el ambiente.prod
import { environment } from '../environments/environment.prod';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
//Storage de Firebase
import { AngularFirestoreModule } from '@angular/fire/firestore';

//QR
import { QRCodeModule } from 'angularx-qrcode';

//Material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';

//Luego de ng add @angular/pwa se importa el ServiceWorker
import { ServiceWorkerModule } from '@angular/service-worker';

//Components

import { MainNavComponent } from './main-nav/main-nav.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { ReportsComponent } from './components/reports/reports.component';
import { HelpComponent } from './components/help/help.component';
import { NewProductComponent } from './components/inventory/new-product/new-product.component';
import { GeneralInventoryComponent } from './components/inventory/general-inventory/general-inventory.component';
import { ProductComponent } from './components/products/product/product.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    HomeComponent,
    ProductsComponent,
    InventoryComponent,
    ReportsComponent,
    HelpComponent,
    NewProductComponent,
    GeneralInventoryComponent,
    ProductComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    APP_ROUTING,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    //Para que trabaje de manera offline
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    AngularFirestoreModule,
    QRCodeModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    LayoutModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatMenuModule,
    MatTabsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
