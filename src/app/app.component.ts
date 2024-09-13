import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SecretsService } from './_services/secrets.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SecretViewerComponent } from './components/secret-viewer/secret-viewer.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'front';

  constructor() {

  }




}
