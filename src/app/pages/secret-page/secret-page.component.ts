import { Component } from '@angular/core';
import { SecretViewerComponent } from "../../components/secret-viewer/secret-viewer.component";
import { NavigationStart, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-secret-page',
  standalone: true,
  imports: [SecretViewerComponent],
  templateUrl: './secret-page.component.html',
  styleUrl: './secret-page.component.scss'
})
export class SecretPageComponent {

  
}
