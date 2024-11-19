import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SecretsService } from '../../_services/secrets.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { AlertService } from '../../_services/alert.service';
import { driver } from "driver.js";
import { LocalStorageService } from '../../_services/local-storage.service';

const driverObj_2 = driver();

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

  constructor(private SecretsService: SecretsService, private clipboard: Clipboard, private AlertService: AlertService, private LocalStorageService: LocalStorageService) { }

  form = new FormGroup({
    text: new FormControl('', { nonNullable: true }),
    password: new FormControl('', { nonNullable: true }),
    expirationTime: new FormControl('5', { nonNullable: true })

  });

  createdSecretUUID: string = '';
  final_url: string = '';
  isWaitingResponse: boolean = false;


  ngOnInit() {
    this.startTypingEffect();
  }


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
          this.createdSecretUUID = res.body.uuid;
          this.final_url = this.base_url + this.createdSecretUUID;
          this.AlertService.fireToastSuccessTimer("Whispxr created successfully");
          this.createdSecret.emit();
          this.form.reset();

          const checkElement = setInterval(() => {
            const element = document.querySelector('#secret_url_container');
            if (element) {
              clearInterval(checkElement);

              const tutorialSeen = this.LocalStorageService.isTutorialSeen('success');
              if (!tutorialSeen) {
                driverObj_2.highlight({
                  element: '#secret_url_container',
                  popover: {
                    title: 'Congratulations!',
                    description: 'You’ve created your first Whispxr! Share it now and don’t forget the password.',
                  },
                });
                this.LocalStorageService.markTutorialAsSeen('success');
              }
            }
          }, 100);

        },
        error: err => {
          console.log(err);
          this.isWaitingResponse = false;
        }
      });
    }
  }

  isPasswordVisible: boolean = false;

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }


  copyToClipboard() {
    this.clipboard.copy(this.final_url);
    this.AlertService.fireToastSuccessTimer("URL copied to clipboard");
  }

  shareNavigator() {
    const shareData: ShareData = {
      title: "Whispxr",
      text: "Reveal the message!",
      url: this.final_url,
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => console.log('Mensaje compartido exitosamente'))
        .catch((err) => console.error('Error al compartir:', err));
    } else {
      console.warn('La API de compartir no está disponible en este navegador.');
    }
  }

  phrases: string[] = [
    "The code to open the chest is in the blue book...",
    "Sometimes the stars don’t shine, but they’re still there...",
    "Find the key under the broken clock...",
    "This too shall pass, trust me...",
    "Don’t forget to check the pocket of your coat...",
    "Tuesday at 8, at the usual place...",
    "I know you have doubts, but everything will be okay...",
    "The answer is on the first page of the journal...",
    "I miss you more than you think...",
    "The password is 'RedBird'..."
  ];


  currentText: string = '';
  private phraseIndex: number = 0;
  private charIndex: number = 0;
  isTyping: boolean = true;

  startTypingEffect(): void {
    const currentPhrase = this.phrases[this.phraseIndex];

    if (this.charIndex <= currentPhrase.length && this.isTyping) {
      this.currentText = currentPhrase.slice(0, this.charIndex + 1);
      this.charIndex++;
      setTimeout(() => this.startTypingEffect(), 100);
    }
    else if (this.isTyping) {
      this.isTyping = false;
      setTimeout(() => this.startTypingEffect(), 400);
    }
    else if (this.charIndex > 0 && !this.isTyping) {
      this.currentText = currentPhrase.slice(0, this.charIndex - 1);
      this.charIndex--;
      setTimeout(() => this.startTypingEffect(), 50);
    }
    else {
      this.isTyping = true;
      this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
      this.startTypingEffect();
    }
  }

  showSharingModal() {
    this.AlertService.fireShareModal(this.final_url);
  }
}