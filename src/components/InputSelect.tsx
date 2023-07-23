import images from 'assets/images'
import clsx from 'clsx'
import React from 'react'
import Select from 'react-select'

interface InputSelectProps {
  className?: string
  label?: string
  placeholder?: string
  value: any
  options: any
  noOptionsMessage?:
    | ((obj: { inputValue: string }) => React.ReactNode)
    | undefined
  isSearchable?: boolean
  onChange: (e: any) => void
  error?: string
}

export const InputSelect: React.FC<InputSelectProps> = ({
  className,
  label,
  placeholder,
  value,
  options,
  isSearchable = false,
  onChange,
  noOptionsMessage,
  error,
}) => {
  return (
    <div className={clsx('text-sm', className)}>
      {label && (
        <div className='font-semi-bold text-neutral-30 mb-2'>{label}</div>
      )}
      <Select
        placeholder={placeholder}
        value={value}
        options={options}
        noOptionsMessage={noOptionsMessage}
        styles={styleReactSelect}
        isSearchable={isSearchable}
        onChange={onChange}
      />
      {error && (
        <div className='flex items-center mt-1 ml-1'>
          <img className='w-3 h-3' src={images.ic_invalid} alt='' />
          <div className='text-error text-xs ml-1'>{error}</div>
        </div>
      )}
    </div>
  )
}

const styleReactSelect: any = {
  control: (provided: any, state: any) => ({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: '#EEF5FC',
    border: `1px solid ${state.isFocused ? '#EEF5FC' : 'none'}`,
    borderRadius: '.375rem',
    height: '46px',
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: '#2c2829',
    fontSize: '.875rem',
    fontFamily: 'NunitoSans Regular',
  }),
  valueContainer: (provided: any) => ({
    ...provided,
    padding: '0px 12px',
  }),
  dropdownIndicator: () => ({
    padding: '8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  option: (provided: any, state: any) => ({
    cursor: 'default',
    padding: '10px',
    backgroundColor:
      state.isFocused && state.isSelected
        ? '#38A5DB'
        : state.isFocused
        ? '#EEF5FC'
        : state.isSelected && '#229BD8',
    color: state.isSelected ? '#FFFFFF' : '#2c2829',
    fontSize: '.875rem',
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: '#B3B3B3',
    fontSize: '.875rem',
    fontFamily: 'NunitoSans Regular',
  }),
  indicatorSeparator: () => {},
  menu: (provided: any) => ({
    ...provided,
    zIndex: '10',
  }),
}
