import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SecretsService } from '../../_services/secrets.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { AlertService } from '../../_services/alert.service';

@Component({
  selector: 'app-secret-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './secret-form.component.html',
  styleUrl: './secret-form.component.scss'
})
export class SecretFormComponent {
  
  @Output() createdSecret = new EventEmitter<any>();

  base_url: string = 'https://whispxr.onrender.com/#/';

  constructor(private SecretsService: SecretsService, private clipboard: Clipboard, private AlertService: AlertService) { }

  form = new FormGroup({
    text: new FormControl('', { nonNullable: true }),
    password: new FormControl('', { nonNullable: true }),
    expirationTime: new FormControl('5', { nonNullable: true })

  });

  createdSecretUUID: string = '';
  final_url: string = '';
  isWaitingResponse: boolean = false;

  submit() {


    const secret = this.form.value.text;
    const password = this.form.value.password;
    const expirationTime = this.form.value.expirationTime;

    const date = new Date();

    if (expirationTime) {
      const expirationMinutes = parseInt(expirationTime, 10);
      if (!isNaN(expirationMinutes)) {
        date.setMinutes(date.getMinutes() + expirationMinutes);
      }
    }

    if (secret && password) {
      this.isWaitingResponse = true;
      this.SecretsService.createSecret(secret, password, date).subscribe({
        next: res => {
          this.isWaitingResponse = false;
          console.log(res);
          this.createdSecretUUID = res.body.uuid;
          this.final_url = this.base_url + this.createdSecretUUID;
          this.AlertService.fireToastSuccessTimer("Whispxr created successfully");
          this.createdSecret.emit();
          this.form.reset();
        },
        error: err => {
          console.log(err);
          this.isWaitingResponse = false;

        }
      });
    }
  }

  copyToClipboard() {
    this.clipboard.copy(this.final_url);
    this.AlertService.fireToastSuccessTimer("URL copied to clipboard");
  }

  shareOnWhatsApp() {
    window.open(`https://wa.me/?text=${encodeURIComponent(this.final_url)}`, '_blank');
  }

  shareOnMessenger() {
    window.open(`fb-messenger://share/?link=${encodeURIComponent(this.final_url)}`, '_blank');
  }

  shareOnTelegram() {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(this.final_url)}`, '_blank');
  }

  shareOnTwitter() {
    window.open(`https://twitter.com/share?url=${encodeURIComponent(this.final_url)}`, '_blank');
  }
}
