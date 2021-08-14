import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSliderModule } from '@angular/material/slider';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AgGridModule } from '@ag-grid-community/angular';
import { FormsModule } from '@angular/forms';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryContactService } from './service/in-memory-contact.service';

import {MatExpansionModule} from '@angular/material/expansion';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AdresseFormComponent } from './adresse-form/adresse-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { ListContactsComponent } from './list-contacts/list-contacts.component';
import { MatGridListModule} from '@angular/material/grid-list';
import { ContactComponent } from './contact/contact.component';
import { RouterModule, Routes } from "@angular/router";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'
import { HttpClientModule } from '@angular/common/http';
import { ModifierContactComponent } from './modifier-contact/modifier-contact.component';

const appRoutes: Routes = [
  {path: 'adresseForm', component: AdresseFormComponent},
  {path: 'modify/:id', component: ModifierContactComponent },
  {path: '', component: ListContactsComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    AdresseFormComponent,
    ListContactsComponent,
    ContactComponent,
    ModifierContactComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatExpansionModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryContactService, { dataEncapsulation: false }),
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    AgGridModule.withComponents([]),
    LayoutModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
