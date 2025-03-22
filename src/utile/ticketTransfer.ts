type Ticket = {
  segments: Array<{
    stops: Array<string>; 
  }>;
}

const NumOfStop = (ticket: Ticket): number =>
  ticket.segments
    .map((element) => element.stops.length)
    .reduce((previousValue, currentValue) => previousValue + currentValue, 0)

interface TicketTransferProps {
  ticket: Ticket;
  showAllTickets: boolean;
  valueFilterTransfer: number[];
}

const ticketTransfer = ({ ticket, showAllTickets, valueFilterTransfer }: TicketTransferProps): boolean => {
  if (!showAllTickets) {
    return valueFilterTransfer.includes(NumOfStop(ticket))
  }
  return true
}

export default  ticketTransfer
