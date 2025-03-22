import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { setValueFilterTicket, switchFilterAll } from '../../store/Slice'

import './Filter.scss'

const Filter = () => {
  const [checkedAllTicket, setCheckedAllTicket] = useState<boolean>(true)
  const [checkedNone, setCheckedNone] = useState<boolean>(true)
  const [checkedOne, setCheckedOne] = useState<boolean>(true)
  const [checkedTwo, setCheckedTwo] = useState<boolean>(true)
  const [checkedThree, setCheckedThree] = useState<boolean>(true)

  const dispatch = useDispatch()

  useEffect(() => {
    if (checkedNone && checkedOne && checkedTwo && checkedThree) {
      setCheckedAllTicket(true)
    } else {
      setCheckedAllTicket(false)
    }
  }, [checkedNone, checkedOne, checkedTwo, checkedThree])

  useEffect(() => {
    dispatch(switchFilterAll(checkedAllTicket))
  }, [dispatch, checkedAllTicket])

  useEffect(() => {
    dispatch(setValueFilterTicket({ isChecked: checkedNone, filterValue: 0 }))
  }, [checkedNone, dispatch])

  useEffect(() => {
    dispatch(setValueFilterTicket({ isChecked: checkedOne, filterValue: 1 }))
  }, [checkedOne, dispatch])

  useEffect(() => {
    dispatch(setValueFilterTicket({ isChecked: checkedTwo, filterValue: 2 }))
  }, [checkedTwo, dispatch])

  useEffect(() => {
    dispatch(setValueFilterTicket({ isChecked: checkedThree, filterValue: 3 }))
  }, [checkedThree, dispatch])

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case 'None':
        setCheckedNone(event.target.checked)
        break
      case 'One':
        setCheckedOne(event.target.checked)

        break
      case 'Two':
        setCheckedTwo(event.target.checked)

        break
      case 'Three':
        setCheckedThree(event.target.checked)

        break
      default:
        setCheckedAllTicket(event.target.checked)
        setCheckedNone(event.target.checked)
        setCheckedOne(event.target.checked)
        setCheckedTwo(event.target.checked)
        setCheckedThree(event.target.checked)
    }
  }

  return (
    <div className='filter'>
      <div className='title'>КОЛИЧЕСТВО ПЕРЕСАДОК</div>
      <div className='wrapper'>
        <input
          type="checkbox"
          id="all"
          name="All"
          className='checkbox'
          checked={checkedAllTicket}
          onChange={(event) => handleCheckboxChange(event)}
        />
        <label className='label' htmlFor="all">
                    Все
        </label>
      </div>
      <div className='wrapper'>
        <input
          type="checkbox"
          id="None_transfer"
          name="None"
          className='checkbox'
          checked={checkedNone}
          onChange={(event) => handleCheckboxChange(event)}
        />
        <label className='label' htmlFor="None_transfer">
                    Без пересадок
        </label>
      </div>
      <div className='wrapper'>
        <input
          type="checkbox"
          id="One_transfer"
          name="One"
          className='checkbox'
          checked={checkedOne}
          onChange={(event) => handleCheckboxChange(event)}
        />
        <label className='label' htmlFor="One_transfer">
                    1 пересадка
        </label>
      </div>
      <div className='wrapper'>
        <input
          type="checkbox"
          id="Two_transfer"
          name="Two"
          className='checkbox'
          checked={checkedTwo}
          onChange={(event) => handleCheckboxChange(event)}
        />
        <label className='label' htmlFor="Two_transfer">
                    2 пересадки
        </label>
      </div>
      <div className='wrapper'>
        <input
          type="checkbox"
          id="Three_transfer"
          name="Three"
          className='checkbox'
          checked={checkedThree}
          onChange={(event) => handleCheckboxChange(event)}
        />
        <label className='label' htmlFor="Three_transfer">
                    3 пересадки
        </label>
      </div>
    </div>
  )
}
export default Filter