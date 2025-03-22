import React from 'react'


import iteration from '../../utile/iteration'
import { getArrivalTime, getDepartureTime, getTravelTime } from '../../utile/date'

import './Ticket.scss'

interface Segment {
  date: string;
  origin: string;
  destination: string;
  stops: string[];
  duration: number;
}

interface TicketProps {
  price?: number;
  carrier?: string;
  segments?: Segment[];
}

const Ticket: React.FC<TicketProps> = ({ price = 0, carrier = '', segments = [] }) => {
  const priceStr = String(price).replace(/(\d)(?=(\d{3})+$)/g, '$1 ')

  return (
    <div className="ticket">
      <div className="price_logo">
        <div className="price"> {`${priceStr} \u20bd`} </div>
        <img className="logo" alt="logo" src={`//pics.avs.io/99/36/${carrier}.png`} />
      </div>
      {segments.map((item) => (
        <div className="information" key={item.date}>
          <div className="text gray_text">
            {item.origin}-{item.destination}
          </div>
          <div className="text gray_text">В ПУТИ</div>
          <div className="text gray_text">
            {item.stops.length} {iteration(item.stops.length)}
          </div>
          <div className="text">
            {getDepartureTime(item.date)} - {getArrivalTime(item.date, item.duration)}
          </div>
          <div className="text"> {getTravelTime(item.duration)}</div>
          <div className="text"> {item.stops.join(', ')}</div>
        </div>
      ))}
    </div>
  )
}

export default Ticket
