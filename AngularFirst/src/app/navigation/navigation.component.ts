import { Component, OnInit } from "@angular/core";
import { MatMenuListItem } from "../BeanClass/model/MatMenuListItem";
import { BackendApiService } from "../services/backend-api.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.css"],
})
export class NavigationComponent implements OnInit {
  menuListItems: MatMenuListItem[];
  public selectedMenu: string;
  xhr: XMLHttpRequest;
  public serviceResponse: string;
  routeid;

  constructor(
    public BackendApiService: BackendApiService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.routeid = this.route.snapshot.paramMap.get("username");

    this.menuListItems = [
      { menuLinkText: "Settings", menuIcon: "settings", isDisabled: false },
      { menuLinkText: "AboutUs", menuIcon: "AboutUs", isDisabled: false },
      { menuLinkText: "Help", menuIcon: "help", isDisabled: false },
      { menuLinkText: "Contact", menuIcon: "contact", isDisabled: true },
    ];
  }

  onMenuClick(matMenu: string) {
    console.log("matMenu" + matMenu);
  }

  clickMenuItem(menuItem: MatMenuListItem) {
    console.log(menuItem);
    this.selectedMenu = menuItem.menuLinkText;
  }

  service() {
    console.log("calling service");
    this.xhr = this.BackendApiService.service();

    this.xhr.onreadystatechange = () => {
      if (this.xhr.readyState == 4) {
        if (this.xhr.status == 200) {
          this.serviceResponse = this.xhr.responseText;
        }
      }
    };
  }
}
