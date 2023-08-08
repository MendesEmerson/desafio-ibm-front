import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { ReservasService } from 'src/app/service/reservas.service';

@Component({
  selector: 'app-reserva-form',
  templateUrl: './reserva-form.component.html',
  styleUrls: ['./reserva-form.component.scss'],
})
export class ReservaFormComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: ReservasService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {
    this.form = formBuilder.group({
      nomeHospede: [''],
      dataInicio: [Date],
      dataFim: [Date],
      quantidadePessoas: [Number],
    });
  }

  onSubmit() {
    const formData = this.form.value;

    if (
      !formData.nomeHospede ||
      !formData.dataInicio ||
      !formData.dataFim ||
      !formData.quantidadePessoas
    ) {
      this.snackBar.open('Todos os campos devem ser preenchidos', '', {
        duration: 4000,
      });
      return; // Retorna para impedir que o código continue a ser executado
    }

    formData.dataInicio = moment(formData.dataInicio).format('YYYY-MM-DD');
    formData.dataFim = moment(formData.dataFim).format('YYYY-MM-DD');

    this.service.save(formData).subscribe({
      next: (result) => {
        this.onSuccess();
      },
      error: (error) => {
        this.snackBar.open(error.error.detail, '', { duration: 6000 });
      }
    });

  }

  onCancel() {
    this.location.back();
  }

  onSuccess() {
    this.snackBar.open('Reserva feita com sucesso!', '', { duration: 4000 });
  }
}
