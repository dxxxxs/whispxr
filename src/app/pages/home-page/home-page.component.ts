import { Component } from '@angular/core';
import { SecretFormComponent } from '../../components/secret-form/secret-form.component';
import { SecretsService } from '../../_services/secrets.service';

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

  constructor(private SecretsService: SecretsService) {
    this.getCounter();
  }

  getCounter(){
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

}
