import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SecretsService } from '../../_services/secrets.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../_services/alert.service';

@Component({
  selector: 'app-secret-viewer',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './secret-viewer.component.html',
  styleUrl: './secret-viewer.component.scss'
})
export class SecretViewerComponent {


  uuid: string = '';
  secret: string = '';

  constructor(private SecretsService: SecretsService, private activatedRoute: ActivatedRoute, private AlertService: AlertService) {
    this.activatedRoute.params.subscribe(params => {
      this.uuid = params['uuid'];
    });
  }

  form = new FormGroup({
    password: new FormControl('')
  });


  submit() {
    const password = this.form.value.password;
    if (password && this.uuid) {
      this.SecretsService.getSecret(this.uuid, password).subscribe({
        next: res => {
          this.secret = res.secret;
          this.AlertService.firePlainMessageAlert(this.secret);
        },
        error: err => console.log(err)
      });
    }
  }
}
