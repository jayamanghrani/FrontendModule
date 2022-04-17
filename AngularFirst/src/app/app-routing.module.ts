import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Component1Component } from "./component1/component1.component";
import { Component2Component } from "./component2/component2.component";
import { UploadComponent } from "./upload/upload.component";
import { FormcontrolComponent } from "./formcontrol/formcontrol.component";
import { NavigationComponent } from "./navigation/navigation.component";
import { LayoutComponent } from "./layout/layout.component";
import { ButtonIndicatorComponent } from "./button-indicator/button-indicator.component";

const routes: Routes = [
  { path: "Navigation/:username", component: NavigationComponent },
  { path: "layout", component: LayoutComponent },
  { path: "formControl", component: FormcontrolComponent },
  { path: "btn&Indicator", component: ButtonIndicatorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
