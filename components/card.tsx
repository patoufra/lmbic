import React from 'react'
import { theme } from '@/styles/theme'

interface CardProps {
  children: React.ReactNode
  className?: string
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div 
      className={`
        bg-${theme.colors.surface} 
        rounded-lg p-6 shadow-lg 
        transition-all duration-300 ease-in-out
        hover:shadow-xl
        ${className}
      `}
      style={{ 
        fontFamily: theme.fonts.body,
        color: theme.colors.text.primary,
      }}
    >
      {children}
    </div>
  )
}

