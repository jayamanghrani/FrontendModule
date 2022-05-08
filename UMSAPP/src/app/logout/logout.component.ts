import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private dialogRef: MatDialog,) { }

  ngOnInit() {
    this.dialogRef.closeAll();
    history.pushState(null, null, location.href);
     window.close();
    window.onpopstate = function () {
        history.go(1);      
    };
  }




} 