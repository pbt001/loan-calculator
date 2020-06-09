import React, { useState } from "react"

interface FormProps {
  loanAmount: number
  onSetAmount: Function
  loanTerm: number
  onSetTerm: Function
  loanLTV: number
  onSetLTV: Function
  loanRepaymentOption: string
  onSetRepaymentOption: Function
}

const CalculatorForm: React.FC<FormProps> = (props: FormProps) => {
  const [isValidAmount, setIsValidAmount] = useState(true)

  const numberToCurrency = (number: number): string => {
    return `$${new Intl.NumberFormat("en", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number)}`
  }

  const currencyToNumber = (val: string): number => {
    let numberString: string = val.replace("$", "")
    numberString = numberString.replace(",", "").replace(",", "")
    const amount: number = isNaN(parseInt(numberString))
      ? 0
      : parseInt(numberString)
    return amount
  }

  const emitAmountHandler = (amount): void => {
    props.onSetAmount(currencyToNumber(amount))
  }

  const checkIsValidAmount = (): void => {
    if (props.loanAmount <= 5000 || props.loanAmount > 25000000) {
      setIsValidAmount(false)
    } else {
      setIsValidAmount(true)
    }
  }

  const radioOptionsLTV: Array<number> = [3, 4, 5, 6, 7]
  const radioInputsLTV = radioOptionsLTV.map(option => {
    return (
      <input
        key={option}
        name="LTV"
        type="radio"
        value={option}
        checked={props.loanLTV === option}
        onChange={event => {
          props.onSetLTV(parseInt(event.target.value))
        }}
      />
    )
  })

  const radioOptionsRepayment: Array<string> = ["IO", "PI"]
  const radioInputsRepayment = radioOptionsRepayment.map(option => {
    return (
      <input
        key={option}
        name="RepaymentOptions"
        type="radio"
        value={option}
        checked={props.loanRepaymentOption === option}
        onChange={event => {
          props.onSetRepaymentOption(event.target.value)
        }}
      />
    )
  })

  return (
    <section className="calculator-form">
      <div>
        <label>
          How much do you want to borrow?
          <input
            placeholder="Enter desired loan amount in USD"
            type="tel"
            maxLength={11}
            value={`${numberToCurrency(props.loanAmount)}`}
            onChange={event => {
              emitAmountHandler(event.target.value)
            }}
            onBlur={event => {
              checkIsValidAmount()
            }}
          />
          {!isValidAmount && <p>Must be between $5,000 and $25,000,000</p>}
        </label>
      </div>
      <div>
        <label>
          How long do you need to pay back?
          <input
            type="range"
            min="3"
            max="36"
            value={props.loanTerm}
            onChange={event => {
              props.onSetTerm(event.target.value)
            }}
          />
          <span>{props.loanTerm}</span>
        </label>
      </div>
      <div>
        <label htmlFor="LTV">
          Loan-to-Value (LTV)
          {radioInputsLTV}
          <span>{props.loanLTV}</span>
        </label>
      </div>
      <div>
        <label htmlFor="RepaymentOptions">
          Repayment Option
          {radioInputsRepayment}
          <span>{props.loanRepaymentOption}</span>
        </label>
      </div>
    </section>
  )
}

export default CalculatorForm
