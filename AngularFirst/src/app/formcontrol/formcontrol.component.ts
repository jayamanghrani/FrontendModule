import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-formcontrol',
  templateUrl: './formcontrol.component.html',
  styleUrls: ['./formcontrol.component.css']
})
export class FormcontrolComponent implements OnInit {

  public MyFormControl: FormGroup;
  public username:string;
  public password:string;
  public dateval:Date;
 public date:Date;
  public checkboxval:boolean;
  public radioval:string;
  public dropdownvalue:string;
  public sliderinputvalue:string; 
  public slidertoggleval: string;

public list=[
    {"id":1, "name":"option1"},
    {"id":2, "name":"option2"},

]
public Food = ["Bhelpuri", "Khichdi"];




  constructor() {
console.log("I am constructor ");

   }

  ngOnInit() {
    console.log("I am ngOnInit ");

    this.MyFormControl = new FormGroup({
      username: new FormControl('', Validators.required),

      password: new FormControl('', Validators.required),

      date: new FormControl('', Validators.required),


      });
      

     

  }

  submit()
  {
    console.log("calling submit");
    this.username=this.MyFormControl.get('username').value
    this.password=this.MyFormControl.get('password').value
    

    console.log("username"+this.username);
    console.log("password"+this.password);
   
  }

  OnChange($event){
    this.checkboxval=$event.checked;
    console.log($event.checked); 
    //MatCheckboxChange {checked,MatCheckbox}
}

onRadioChange($event)
{
  this.radioval=$event.value;
  console.log(this.radioval);
}

ondateClick()
{
  this.dateval=this.MyFormControl.get('date').value
  console.log(this.dateval);

}

onClickDropDown(value:string)
{
  this.dropdownvalue=value;


}


sliderChange(sliderval:string)
{
  console.log("inside sliderchange");
  this.sliderinputvalue=sliderval;
 
}

slideToggle(sliderToggleval:string)
{
  this.slidertoggleval=sliderToggleval;
  console.log("toggle"+sliderToggleval);
}

}
