import { Ticket } from './ticket.model';

export interface Order {
  id: number;
  userId: number;
  tickets: Ticket[];
  totalPrice: number;
}
