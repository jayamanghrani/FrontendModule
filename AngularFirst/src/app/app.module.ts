import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { TestComponent } from "./test/test.component";
import { ChildComponent } from "./child/child.component";
import { Component1Component } from "./component1/component1.component";
import { Component2Component } from "./component2/component2.component";
import { UploadComponent } from "./upload/upload.component";

import { FormcontrolComponent } from "./formcontrol/formcontrol.component";
import {
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatRadioModule,
  MatOptionModule,
  MatSelectModule,
  MatSliderModule,
  MatCardModule,
  MatSlideToggleModule,
  MatMenuModule,
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule,
  MatDividerModule,
  MatListModule,
  MatGridListModule,
  MatExpansionModule,
  MatTabsModule,
} from "@angular/material";

import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { Ng4LoadingSpinnerModule } from "ng4-loading-spinner";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";
import { MatTreeModule } from "@angular/material/tree";
import { MatStepperModule } from "@angular/material/stepper";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NavigationComponent } from "./navigation/navigation.component";
import { LayoutComponent } from "./layout/layout.component";
import { ButtonIndicatorComponent } from "./button-indicator/button-indicator.component";
import { MatChipsModule } from "@angular/material/chips";
import { MatProgressBarModule } from "@angular/material/progress-bar";

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    ChildComponent,
    Component1Component,
    Component2Component,
    UploadComponent,
    FormcontrolComponent,
    NavigationComponent,
    LayoutComponent,
    ButtonIndicatorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatOptionModule,
    MatSelectModule,
    MatSliderModule,
    MatCardModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatExpansionModule,
    MatGridListModule,
    MatStepperModule,
    MatTabsModule,
    MatTreeModule,
    MatButtonModule,
    MatBadgeModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    Ng4LoadingSpinnerModule.forRoot(),
    MatProgressBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
