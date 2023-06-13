/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { DayPicker } from 'react-day-picker'
import { id } from 'date-fns/locale'
import { format } from 'date-fns'

interface KalenderPickerProps {
  onChangeSelected: (e: any) => void
  onMonthChange?: (e: any) => void
  merkedDate: Array<Date[]>
}

export const KalenderPicker: React.FC<KalenderPickerProps> = ({
  onChangeSelected,
  onMonthChange,
  merkedDate,
}) => {
  const today = new Date()
  const [selectedDay, setSelectedDay] = React.useState<Date | undefined>(today)
  const modifiers = {
    markedDay: merkedDate,
  }

  useEffect(() => {
    onChangeSelected(selectedDay)
  }, [selectedDay])

  const css = `
    .my-selected:not([disabled]) { 
      border: none;
      color: white;
      background-color: #90CDEB;
    }
    .my-selected:hover:not([disabled]) { 
      border: none;
      color: white;
    }
    .marked-day {
      color: #90CDEB;
      border: 3px solid #90CDEB;
      border-radius: 50%;
    }
    `

  return (
    <div>
      <style>{css}</style>
      <DayPicker
        locale={id}
        modifiersClassNames={{
          selected: 'my-selected',
          today: 'my-today',
          markedDay: 'marked-day',
        }}
        styles={{
          head_cell: {
            width: '60px',
          },
          table: {
            maxWidth: 'none',
            borderRadius: '12px',
            boxShadow: '3px 15px 14px -7px rgba(79,97,99,0.1)',
            margin: '8px',
          },
          day: {
            margin: 'auto',
          },
          caption_label: {
            color: '#114D6C',
            fontSize: '16px',
          },
          nav_icon: {
            height: '20px',
          },
        }}
        className='text-primary-darker'
        mode='single'
        selected={selectedDay}
        onSelect={setSelectedDay}
        onMonthChange={onMonthChange}
        modifiers={modifiers}
      />
    </div>
  )
}
