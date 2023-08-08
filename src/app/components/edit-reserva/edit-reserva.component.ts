import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Reserva } from 'src/app/model/reserva';
import { ReservasService } from 'src/app/service/reservas.service';
import { DialogAlertComponent } from '../dialog-alert/dialog-alert.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-reserva',
  templateUrl: './edit-reserva.component.html',
  styleUrls: ['./edit-reserva.component.scss'],
})
export class EditReservaComponent implements OnInit {
  form: FormGroup;
  id: number = 0;
  reserva: Reserva | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private service: ReservasService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.form = formBuilder.group({
      nomeHospede: [''],
      dataInicio: [Date],
      dataFim: [Date],
      quantidadePessoas: [Number],
      status: [''],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.id = +params['id'];
        this.findById();
      }
    });
  }
  findById() {
    this.service.findById(this.id).subscribe((result) => {
      this.reserva = result;

      this.form.patchValue({
        nomeHospede: this.reserva.nomeHospede,
        dataInicio: this.reserva.dataInicio,
        dataFim: this.reserva.dataFim,
        quantidadePessoas: this.reserva.quantidadePessoas,
      });

      console.log(this.reserva);
      console.log(this.form);
    });
  }

  onSubmit() {
    const formData = this.form.value;

    if (
      !formData.nomeHospede ||
      !formData.dataInicio ||
      !formData.dataFim ||
      !formData.quantidadePessoas ||
      !formData.status
    ) {
      this.snackBar.open('Todos os campos devem ser preenchidos', '', {
        duration: 4000,
      });
      return;
    }

    formData.dataInicio = moment(formData.dataInicio).format('YYYY-MM-DD');
    formData.dataFim = moment(formData.dataFim).format('YYYY-MM-DD');

    this.service.editById(this.id, formData).subscribe({
      next: (result) => {
        this.onSuccess();
      },
      error: (error) => {
        this.snackBar.open(error.error.detail, '', { duration: 6000 });
      },
    });
  }

  onCancel() {
    this.location.back();
  }

  onSuccess() {
    this.snackBar.open('Reserva editada com sucesso!', '', { duration: 4000 });
    this.router.navigateByUrl('/');
  }

  OpenDialog() {
    const dialogRef = this.dialog.open(DialogAlertComponent, {
      width: '300px',
      data: {
        title: 'Atenção!',
        text: 'Tem certeza que deseja cancelar esta reserva?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.onSubmit();
      }
    });
  }
}
