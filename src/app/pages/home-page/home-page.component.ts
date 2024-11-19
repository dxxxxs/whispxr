import { Component } from '@angular/core';
import { SecretFormComponent } from '../../components/secret-form/secret-form.component';
import { SecretsService } from '../../_services/secrets.service';
import { driver } from "driver.js";
import { LocalStorageService } from '../../_services/local-storage.service';

const driverObj = driver({
  popoverClass: 'driverjs-theme',
  showButtons: [
    'next',
    'previous'
  ],
  steps: [
    { popover: { title: 'Welcome to Whispxr', description: 'This is a secure, one-way messaging app. Create your secret messages and share them with peace of mind!' } },
    { element: '#textDiv', popover: { title: 'Message', description: 'Write your secret message here. This is what you want to keep private.' } },
    { element: '#passwordDiv', popover: { title: 'Password', description: 'Set a password for your message. This will be used to encrypt the content.' } },
    { element: '#expirationDiv', popover: { title: 'Expiration Time', description: 'Choose how long the message will be available before it expires. You can set it from 5 minutes to 3 hours.' } },
    { element: '#createButton', popover: { title: 'Create Secret', description: 'Once everything is set, click here to create your secret message with all the settings applied.' } },
  ]
});

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [SecretFormComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {


  count: number = 0;
  targetCount: number = 0; // Valor objetivo que obtendrás de la API

  constructor(private SecretsService: SecretsService, private LocalStorageService: LocalStorageService) {
    this.getCounter();
  }

  ngOnInit() {
    const tutorialSeen = this.LocalStorageService.isTutorialSeen('welcome');
    if (!tutorialSeen) {
      driverObj.drive();
      this.LocalStorageService.markTutorialAsSeen('welcome');
    }
  }

  getCounter() {
    this.SecretsService.getCounter().subscribe({
      next: res => {
        this.targetCount = res.body.count;
        this.animateCount(); // Inicia la animación
      },
      error: err => console.error(err)
    });
  }

  animateCount() {
    const incrementTime = 20; // Tiempo en milisegundos entre incrementos
    const incrementValue = Math.ceil(this.targetCount / 100); // Divide el valor para hacerlo más fluido

    const interval = setInterval(() => {
      this.count += incrementValue; // Incrementa el valor poco a poco
      if (this.count >= this.targetCount) {
        this.count = this.targetCount; // Asegúrate de que no se pase del valor objetivo
        clearInterval(interval); // Detiene la animación
      }
    }, incrementTime);
  }


  scrollToForm(): void {
    const formElement = document.getElementById('secretForm');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

}
