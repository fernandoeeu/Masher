import React from 'react'

const Errors = props => {
  const { msg } = props
  return (
    <div className="alert alert-warning" role="alert">
      {msg}
    </div>
  )
}

export default Errors
