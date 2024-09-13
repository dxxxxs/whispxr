import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  fireErrorAlert(text: string) {
    Swal.fire({
      title: 'Error!',
      text: text,
      icon: 'error',
      confirmButtonText: 'Dismiss'
    })
  }

  fireSuccessAlert(title:string,text:string){
    Swal.fire({
      title: title,
      text: text,
      icon: "success"
    });
  }

  firePlainMessageAlert(text:string){
    Swal.fire({
      text: text
    });
  }
}
