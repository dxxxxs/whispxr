import { Injectable } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private clipboard: Clipboard) { }

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

  fireShareModal(url: string): void {
    const htmlContent = `
<div class="d-flex flex-column align-items-center">
  <p class="form-control white-background border-0 text-center m-1 pointerCursor rounded-pill">
    ${url}
  </p>
  <div class="d-flex flex-row justify-content-center mt-3 gap-3">
    <!-- Share Button -->
    <button id="shareButton" class="btn btn-secondary rounded-circle d-flex justify-content-center align-items-center" style="width: 50px; height: 50px; padding: 0; font-size: 1.5rem; line-height: 1;">
      <i class="bi bi-share"></i>
    </button>
    <!-- Copy to Clipboard Button -->
    <button id="copyButton" class="btn btn-secondary rounded-circle d-flex justify-content-center align-items-center" style="width: 50px; height: 50px; padding: 0; font-size: 1.5rem; line-height: 1;">
      <i class="bi bi-clipboard"></i>
    </button>
    <!-- WhatsApp -->
    <button id="whatsappButton" class="btn btn-success rounded-circle d-flex justify-content-center align-items-center" style="width: 50px; height: 50px; padding: 0; font-size: 1.5rem; line-height: 1;">
      <i class="bi bi-whatsapp"></i>
    </button>
    <!-- Telegram -->
    <button id="telegramButton" class="btn btn-primary rounded-circle d-flex justify-content-center align-items-center" style="width: 50px; height: 50px; padding: 0; font-size: 1.5rem; line-height: 1;">
      <i class="bi bi-telegram"></i>
    </button>
  </div>
</div>
    `;

    Swal.fire({
      title: 'Share this URL',
      html: htmlContent,
      showCloseButton: true,
      showConfirmButton: false,
      allowOutsideClick: true,
      didOpen: () => {
        // Asignar eventos a los botones
        const copyButton = document.getElementById('copyButton');
        const shareButton = document.getElementById('shareButton');
        const whatsappButton = document.getElementById('whatsappButton');
        const telegramButton = document.getElementById('telegramButton');

        copyButton?.addEventListener('click', () => this.copyToClipboard(url));
        shareButton?.addEventListener('click', () => this.shareNavigator(url));
        whatsappButton?.addEventListener('click', () => this.shareOnWhatsApp(url));
        telegramButton?.addEventListener('click', () => this.shareOnTelegram(url));
      },
    });
  }

  // Métodos auxiliares
  copyToClipboard(url: string): void {
    this.clipboard.copy(url);
    this.fireToastSuccessTimer("URL copied to clipboard");
  }

  private shareNavigator(url: string): void {
    if (navigator.share) {
      navigator
        .share({ title: 'Share URL', url })
        .catch((error) => console.error('Sharing failed', error));
    } else {
      Swal.fire('Sharing not supported on this browser.', '', 'error');
    }
  }

  private shareOnWhatsApp(url: string): void {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(url)}`;
    window.open(whatsappUrl, '_blank');
  }

  private shareOnTelegram(url: string): void {
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}`;
    window.open(telegramUrl, '_blank');
  }
}
