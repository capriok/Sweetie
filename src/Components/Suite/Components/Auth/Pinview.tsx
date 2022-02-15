import React from 'react'

import 'Styles/Suite/components/auth/pinview.scss'

const Pinview: React.FC<any> = ({ pincode }) => {
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