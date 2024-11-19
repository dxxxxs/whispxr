import { Component } from '@angular/core';
import { SecretViewerComponent } from "../../components/secret-viewer/secret-viewer.component";
import { SecretsService } from '../../_services/secrets.service';
import { Router } from '@angular/router';
import { driver } from "driver.js";
import { LocalStorageService } from '../../_services/local-storage.service';


@Component({
  selector: 'app-secret-page',
  standalone: true,
  imports: [SecretViewerComponent],
  templateUrl: './secret-page.component.html',
  styleUrl: './secret-page.component.scss'
})

export class SecretPageComponent {

  count: number = 0;
  targetCount: number = 0;

  constructor(private SecretsService: SecretsService, private router: Router, private LocalStorageService: LocalStorageService) {
    this.getCounter();
  }

  ngOnInit() {
    if (this.isMobileDevice()) {
      this.scrollToForm();
    }
    const tutorialSeen = this.LocalStorageService.isTutorialSeen('reveal');
    if (!tutorialSeen) {
      this.runRevealDriver();
      this.LocalStorageService.markTutorialAsSeen('reveal');
    }
  }

  private isMobileDevice(): boolean {
    return window.innerWidth < 768;
  }

  navigateToHome(): void {
    this.router.navigate(['']); // Navega a la ruta con path ""
  }

  getCounter() {
    this.SecretsService.getCounter().subscribe({
      next: res => {
        this.targetCount = res.body.count;
        this.animateCount();
      },
      error: err => console.error(err)
    });
  }

  animateCount() {
    const incrementTime = 20;
    const incrementValue = Math.ceil(this.targetCount / 100);

    const interval = setInterval(() => {
      this.count += incrementValue;
      if (this.count >= this.targetCount) {
        this.count = this.targetCount;
        clearInterval(interval);
      }
    }, incrementTime);
  }

  scrollToForm(): void {
    const formElement = document.getElementById('secretForm');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  runRevealDriver() {
    const driverReveal = driver({
      popoverClass: 'driverjs-theme',
      showButtons: [
        'next',
        'previous'
      ],
      steps: [
        {
          popover: {
            title: 'Welcome to Whispxr',
            description: 'It seems someone has sent you a secret. Let’s see how to unveil it.',
          },
        },
        {
          element: '#passwordDiv',
          popover: {
            title: 'Enter Password',
            description: 'Type the password associated with the secret to proceed.',
          },
        },
        {
          element: '#revealButton',
          popover: {
            title: 'Reveal Your Secret',
            description: 'Click this button to unveil the encrypted message securely.',
          },
        },
      ]
    });

    driverReveal.drive();
  }
}
