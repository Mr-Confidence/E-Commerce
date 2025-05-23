import React from 'react'

const FormattedPrice = ({amount}) => {
    const formattedAmount = new Number(amount).toLocaleString ("en-US", {style: "currency", currency: "USD", minimunFractionDigits: 2, maximumFractionDigits: 2})
  return (
    <span>{formattedAmount}</span>
  )
}

export default FormattedPrice