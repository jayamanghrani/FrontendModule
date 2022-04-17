import { Component, OnInit ,Inject  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

interface DialogData {
  response: string;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

      onOKClick(): void {
        this.dialogRef.close();
      }

  ngOnInit() {
   
  }

}
