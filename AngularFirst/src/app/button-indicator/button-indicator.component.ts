import { Component, OnInit } from "@angular/core";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
export interface Fruit {
  name: string;
}

@Component({
  selector: "app-button-indicator",
  templateUrl: "./button-indicator.component.html",
  styleUrls: ["./button-indicator.component.css"],
})
export class ButtonIndicatorComponent implements OnInit {
  public badgeCounter: number;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: Fruit[] = [{ name: "Lemon" }, { name: "Lime" }, { name: "Apple" }];

  constructor(private spinnerService: Ng4LoadingSpinnerService) {
    this.badgeCounter = 4;
  }

  ngOnInit() {}

  template: string =
    '<img src="http://pa1.narvii.com/5722/2c617cd9674417d272084884b61e4bb7dd5f0b15_hq.gif" />';

  incrementCount() {
    this.badgeCounter++;
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || "").trim()) {
      this.fruits.push({ name: value.trim() });
      console.log(this.fruits[0].name);
      console.log("value---" + event.value);
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }
  showSpinner() {
    console.log("spinner called");
    this.spinnerService.show();
  }
}
