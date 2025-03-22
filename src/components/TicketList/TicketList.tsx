import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showMoreTicket } from '../../store/Slice'
import { Ticket } from '../Ticket'
import ticketTransfer  from '../../utile/ticketTransfer'
import key from '../../utile/key'
import './TicketList.scss'

const TicketList: React.FC = () => {
  const tickets = useSelector((state: any) => state.tickets.tickets)
  const numShowTicket = useSelector((state: any) => state.tickets.numShowTicket)
  const showAllTickets = useSelector((state: any) => state.tickets.showAllTickets)
  const valueFilterTransfer = useSelector((state: any) => state.tickets.valueFilterTransfer)
  const error = useSelector((state: any) => state.tickets.error)
  const isLoading = useSelector((state: any) => state.tickets.isLoading)

  const dispatch = useDispatch()

  const ticketsFilter = tickets.filter((ticket: any) => {
    return ticketTransfer({ ticket, showAllTickets, valueFilterTransfer })
  })

  return (
    <div className='ticketList'>
      {ticketsFilter.slice(0, numShowTicket).map((ticket: any) => (
        <Ticket key={key()} {...ticket} />
      ))}
      {ticketsFilter.length === 0 && !error && !isLoading && (
        <div>Совпадений не найдено</div>
      )}
      {ticketsFilter.length > numShowTicket && (
        <button
          type="button"
          className='button'
          onClick={() => dispatch(showMoreTicket())}
        >
                    ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
        </button>
      )}
    </div>
  )
}

export default TicketList
