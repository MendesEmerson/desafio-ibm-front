import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Reserva } from 'src/app/model/reserva';
import { ReservasService } from 'src/app/service/reservas.service';
import { DialogAlertComponent } from '../dialog-alert/dialog-alert.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-card-list-reservas',
  templateUrl: './card-list-reservas.component.html',
  styleUrls: ['./card-list-reservas.component.scss'],
})
export class CardListReservasComponent implements OnInit {
  list: Reserva[] = [];
  confirmadas: Reserva[] = [];
  pendentes: Reserva[] = [];
  canceladas: Reserva[] = [];

  constructor(
    private service: ReservasService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.findAll();
  }

  OpenDialog(id: number) {
    const dialogRef = this.dialog.open(DialogAlertComponent, {
      width: '300px',
      data: {
        title: 'Atenção!',
        text: 'Tem certeza que deseja cancelar esta reserva?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.service.deleteById(id).subscribe({
          next: (result) => {
            this.onSuccess();
          },
          error: (error) => {
            this.snackBar.open(error.error.detail, '', { duration: 6000 });
          },
        });
      }
    });
  }

  editarReserva(id: number) {
    this.router.navigate(['/reserva/edit', id]);
  }

  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      this.list = resposta;

      this.confirmadas = this.list.filter(
        (item) => item.status === 'CONFIRMADO'
      );
      this.pendentes = this.list.filter((item) => item.status === 'PENDENTE');
      this.canceladas = this.list.filter((item) => item.status === 'CANCELADO');
    });
  }

  onSuccess() {
    this.snackBar.open('Reserva Cancelada com sucesso!', '', {
      duration: 4000,
    });
    this.router.navigateByUrl('/');
  }
}
