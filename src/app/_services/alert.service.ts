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

  fireSuccessAlert(title: string, text: string) {
    Swal.fire({
      title: title,
      text: text,
      icon: "success",
      allowOutsideClick: false,
    });
  }

  fireToastSuccessTimer(text: string) {
    // Crear una instancia separada para la toast
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });

    // Mostrar la toast de éxito
    Toast.fire({
      icon: 'success',
      title: text
    });
  }

  fireToastErrorTimer(text: string) {
    // Crear una instancia separada para la toast
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });

    // Mostrar la toast de éxito
    Toast.fire({
      icon: 'error',
      title: text
    });
  }


  firePlainMessageAlert(text: string) {
    Swal.fire({
      text: text
    });
  }
}
