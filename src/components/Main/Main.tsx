import React from 'react'
import { useSelector } from 'react-redux'

import { TicketList } from '../TicketList'
import { Tabs } from '../Tabs'
import  { Error }   from '../Error'
import { LoadingSpin } from '../LoadingSpin'

import './Main.scss'

interface RootState {
  tickets: {
    isLoading: boolean,
    error: string | null
  }
}

const Main = () => {
  const isLoading = useSelector((state: RootState) => state.tickets.isLoading)
  const error = useSelector((state: RootState) => state.tickets.error)
  return (
    <div className='main'>
      <Tabs />
      {isLoading && <LoadingSpin />}
      {error && <Error />}
      <TicketList />
    </div>
  )
}

export default Main