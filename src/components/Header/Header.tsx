import React from 'react'

import logo from '/src/assets/img/Logo.svg'

import './Header.scss'

export const Header:React.FC = () => (
  <div className='header'>
    <img className='logo' alt="logo" src={logo} />
  </div>
)

