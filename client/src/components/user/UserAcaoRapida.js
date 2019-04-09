import React, { useState, useEffect } from 'react'

import './UserAcaoRapida.scss'

const UserAcaoRapida = props => {

  const [isAdd, setIsAdd] = useState('bg-gray')

  useEffect(() => {
    props.isAdd ? setIsAdd('acao-rapida-blue') : setIsAdd('acao-rapida-gray')
  }, [])


  return (
    <div className={`my-2 ml-1 mr-2 acao-rapida ${isAdd}`}>
      aaaa
    </div>
  )
}

export default UserAcaoRapida
