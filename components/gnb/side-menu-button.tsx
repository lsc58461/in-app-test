import React from 'react'

interface ISideMenuButtonProps {
  isSideMenuModalOpen: boolean
  handleMenuClick: () => void
}

function SideMenuButton({
  isSideMenuModalOpen,
  handleMenuClick,
}: ISideMenuButtonProps) {
  return (
    <button
      type="button"
      className={`flex items-center justify-center ${isSideMenuModalOpen ? 'rotate-45' : ''}`}
      onClick={handleMenuClick}
      aria-label={`${isSideMenuModalOpen ? 'Close' : 'Open'} Menu`}
    >
      <svg
        className="stroke-blueDefault fill-[none]"
        viewBox="0 0 100 100"
        width="40"
        style={{ strokeWidth: '5.5', strokeLinecap: 'round' }}
      >
        <path
          className="transition-all duration-300"
          d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"
          style={
            isSideMenuModalOpen
              ? { strokeDashoffset: '-64', strokeDasharray: '40 160' }
              : { strokeDasharray: '40 160' }
          }
        />
        <path
          className="transition-all duration-300"
          d="m 30,50 h 40"
          style={
            isSideMenuModalOpen
              ? {
                  rotate: '90deg',
                  strokeDasharray: '40 142',
                  transformOrigin: '50%',
                }
              : { strokeDasharray: '40 142', transformOrigin: '50%' }
          }
        />
        <path
          className="transition-all duration-300"
          d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"
          style={
            isSideMenuModalOpen
              ? {
                  strokeDashoffset: '-64',
                  strokeDasharray: '40 85',
                  transformOrigin: '50%',
                }
              : { strokeDasharray: '40 85', transformOrigin: '50%' }
          }
        />
      </svg>
    </button>
  )
}

export { SideMenuButton }
