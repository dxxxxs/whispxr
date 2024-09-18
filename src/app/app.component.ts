import { Component } from '@angular/core';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { SecretsService } from './_services/secrets.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SecretViewerComponent } from './components/secret-viewer/secret-viewer.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'front';

  constructor(private SecretService: SecretsService, private router: Router) {
    this.SecretService.healthCheck().subscribe((res) => console.log(res.statusText));
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        Swal.close();
      }
    });
  }

}
