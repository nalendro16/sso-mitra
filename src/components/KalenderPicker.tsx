/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { DayPicker } from 'react-day-picker'
import { id } from 'date-fns/locale'
import { format } from 'date-fns'

interface KalenderPickerProps {
  onChangeSelected: (e: any) => void
}

export const KalenderPicker: React.FC<KalenderPickerProps> = ({
  onChangeSelected,
}) => {
  const [selected, setSelected] = React.useState<Date[]>()

  useEffect(() => {
    onChangeSelected(
      selected?.map((date) => format(date, 'PPP', { locale: id }))
    )
  }, [selected])

  const css = `
    .my-selected:not([disabled]) { 
      border: none;
      color: #4D69FF;
    }
    .my-selected:hover:not([disabled]) { 
      border: none;
      color: white;
    }
    .my-today { 
      font-weight: bold;
      background-color: #90CDEB;
      color: white;
    }`

  return (
    <div>
      <style>{css}</style>
      <DayPicker
        locale={id}
        modifiersClassNames={{
          selected: 'my-selected',
          today: 'my-today',
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
        mode='multiple'
        selected={selected}
        onSelect={setSelected}
      />
    </div>
  )
}
