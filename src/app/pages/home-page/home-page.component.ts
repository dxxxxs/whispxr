import { Component } from '@angular/core';
import { SecretFormComponent } from '../../components/secret-form/secret-form.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [SecretFormComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
