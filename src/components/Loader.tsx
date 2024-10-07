import React from 'react'
import {SyncLoader} from "react-spinners"

const Loader = () => {
  return (
    <div className='flex justify-center items-center w-full h-screen z-50'>
         <SyncLoader
        color="white"
        loading={true}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
        speedMultiplier={1}
      />

    </div>
  )
}

export default Loader
