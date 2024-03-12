import React from 'react'
import { useMediaQuery } from 'react-responsive'
import BookingDesktop from './BookingDesktop'
import BookingMobile from './BookingMobile'

export default function Booking() {
  const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 992 })
    return isDesktop ? children : null
  }
  const Tablet = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
    return isTablet ? children : null
  }
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 })
    return isMobile ? children : null
  }
  return (
    <div>
      <Desktop>
        <BookingDesktop/>
      </Desktop>
      <Tablet>
        <BookingMobile/>
      </Tablet>
      <Mobile>
        <BookingMobile/>
      </Mobile>
    </div>
  )
}
