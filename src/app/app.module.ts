import { ServiceFetchService } from './service-fetch.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { MatInputModule } from '@angular/material/input';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { EmpListComponent } from './emp-list/emp-list.component';
import { SecondComponent } from './second/second.component';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { CommonModule, DatePipe } from '@angular/common';
import {CookieService } from 'ngx-cookie-service';
import { SwitcherComponent } from './switcher/switcher.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import { LoginHeaderComponent } from './login-header/login-header.component';
import { ItemSwitchComponent } from './item-switch/item-switch.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { ViewItemComponent } from './view-item/view-item.component';
import { ViewContactComponent } from './view-contact/view-contact.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { RestrictedDirective } from './restricted.directive';
import {MatPaginatorModule} from '@angular/material/paginator';
import { DialogCloseComponent } from './dialog-close/dialog-close.component';


@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    HeaderComponent,
    FooterComponent,
    EmpListComponent,
    SecondComponent,
    LoginComponent,
    SwitcherComponent,
    LoginHeaderComponent,
    ItemSwitchComponent,
    EditItemComponent,
    ViewItemComponent,
    ViewContactComponent,
    EditContactComponent,
    RestrictedDirective,
    DialogCloseComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    MatTabsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatPaginatorModule
  ],
  providers: [ServiceFetchService,CookieService,DatePipe ],
  bootstrap: [AppComponent]
})
export class AppModule { }
