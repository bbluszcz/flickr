import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class DisplayErrorsService {

  constructor(public snackBar: MatSnackBar) { }

  displayErrors(message1, message2) {
    this.openSnackBar(`Error of status:${message1}`, `${message2}. Try reloading the page`);
  }

  openSnackBar(message1: string, message2: string) {
    this.snackBar.open(message1, message2, {
      duration: 5000,
    });
  }
}
