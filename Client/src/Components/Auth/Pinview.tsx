import React from 'react'

import 'Styles/components/auth/pinview.scss'

interface Props {
  pincode: Array<number>
}

const Pinview: React.FC<Props> = (props) => {
  const { pincode } = props
  const passcode = process.env.REACT_APP_PASSCODE

  return (
    <div className="pinview">
      <div id="pin">
        {passcode!.split('').map((_, i) =>
          <div key={i} className={
            pincode[i] !== undefined
              ? 'mark val'
              : 'mark dot'
          } />
        )}
      </div>
    </div>
  )
}

export default Pinview