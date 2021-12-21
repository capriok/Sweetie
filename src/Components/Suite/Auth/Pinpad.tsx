import React from 'react'

import '../../../Styles/Suite/Auth/Pinpad.scss'
const Pinpad: React.FC<any> = ({ set }) => (
  <div className="pinpad">
    <div className="pad">
      <div className="digit" onClick={() => set(1)}>1</div>
      <div className="digit" onClick={() => set(2)}>2</div>
      <div className="digit" onClick={() => set(3)}>3</div>
      <div className="digit" onClick={() => set(4)}>4</div>
      <div className="digit" onClick={() => set(5)}>5</div>
      <div className="digit" onClick={() => set(6)}>6</div>
      <div className="digit" onClick={() => set(7)}>7</div>
      <div className="digit" onClick={() => set(8)}>8</div>
      <div className="digit" onClick={() => set(9)}>9</div>
      <div className="digit null-digit"></div>
      <div className="digit" onClick={() => set(0)}>0</div>
      <div className="digit" onClick={() => set(-1)}>⇦</div>
    </div>
  </div>
)

export default Pinpad