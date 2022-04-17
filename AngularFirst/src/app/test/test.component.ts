import { Component, OnInit } from '@angular/core';
import { TestService } from '../test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
 myvar='';
 name='';
  constructor(private testService:TestService) { }

  ngOnInit() {
    this.myvar='session 1 of test service';
    this.name=this.testService.getMyname();
  }

} 
 