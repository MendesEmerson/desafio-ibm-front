export interface Reserva {
  id: number,
  nomeHospede: String,
  dataInicio: Date,
  dataFim: Date,
  quantidadePessoas: number,
  status?: String
}
