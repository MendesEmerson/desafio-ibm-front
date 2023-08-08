import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardListReservasComponent } from './card-list-reservas.component';

describe('CardListReservasComponent', () => {
  let component: CardListReservasComponent;
  let fixture: ComponentFixture<CardListReservasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardListReservasComponent]
    });
    fixture = TestBed.createComponent(CardListReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
