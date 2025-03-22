import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { sortTicketByPrice, sortTicketByDuration, sortTicketOptimal } from '../../store/Slice'

import './Tabs.scss'

const Tabs: React.FC = () => {
  const dispatch = useDispatch()
  const [selectedTab, setSelectedTab] = useState<'cheap' | 'fast' | 'optimal' | null>(null)

  const handleClick = (tab: 'cheap' | 'fast' | 'optimal') => {
    setSelectedTab(tab)
    switch (tab) {
      case 'cheap':
        dispatch(sortTicketByPrice())
        break
      case 'fast':
        dispatch(sortTicketByDuration())
        break
      case 'optimal':
        dispatch(sortTicketOptimal())
        break
    }
  }

  return (
    <div className="tabs">
      <div
        role="presentation"
        className={`tab ${selectedTab === 'cheap' ? 'select' : ''}`}
        onClick={() => handleClick('cheap')}
      >
        <span>САМЫЙ ДЕШЕВЫЙ</span>
      </div>
      <div
        role="presentation"
        className={`tab ${selectedTab === 'fast' ? 'select' : ''}`}
        onClick={() => handleClick('fast')}
      >
        <span>САМЫЙ БЫСТРЫЙ</span>
      </div>
      <div
        role="presentation"
        className={`tab ${selectedTab === 'optimal' ? 'select' : ''}`}
        onClick={() => handleClick('optimal')}
      >
        <span>ОПТИМАЛЬНЫЙ</span>
      </div>
    </div>
  )
}

export default Tabs