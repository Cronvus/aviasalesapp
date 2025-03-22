import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { fetchSearchId, fetchTickets, TicketsState } from './store/Slice'
import { Header } from './components/Header'
import { FilterTab } from './components/FilterTab'
import { Main } from './components/Main'
import CookieUtils from './utile/CookieUtils'
import './App.scss'


const App: React.FC = () => {
  const tickets = useAppSelector((state: { tickets: TicketsState }) => state.tickets.tickets)
  const fetch500 = useAppSelector((state: { tickets: TicketsState }) => state.tickets.fetchStatus500)
  const stopFetch = useAppSelector((state: { tickets: TicketsState }) => state.tickets.stopFetch)
  const searchId = useAppSelector((state: { tickets: TicketsState }) => state.tickets.searchId)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchSearchId())

    return () => CookieUtils.deleteCookie('searchId')
  }, [dispatch])

  useEffect(() => {
        
    if (!stopFetch && searchId) dispatch(fetchTickets())
  }, [dispatch, tickets, fetch500, stopFetch, searchId])

  return (
    <div className='app'>
      <Header />
      <FilterTab />
      <Main />
    </div>
  )
}

export default App
