interface Segment {
  duration: number;
}

interface Ticket {
  segments: Segment[];
}

const FlyDuration = (ticket: Ticket): number =>
  ticket.segments
    .map((segment) => segment.duration)
    .reduce((previousValue, currentValue) => previousValue + currentValue, 0)

export default FlyDuration
