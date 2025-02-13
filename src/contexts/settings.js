import { createContext, useContext, useState } from 'react'

const SettingsContext = createContext()

export const SettingsProvider = ({ children }) => {

  const [timeframe, setTimeframe] = useState('Day')
  const [chartStopLoss, setChartStopLoss] = useState(false)

  const timeframes = {
    'Day': {
      interval: '2min',
      limit: 720
    },
    'Week': {
      interval: '15min',
      limit: 672
    },
    'Month': {
      interval: '1hour',
      limit: 720
    },
    '3 Months': {
      interval: '3hour',
      limit: 720
    },
    'Year': {
      interval: '1day',
      limit: 365
    }
  }

  const settings = {
    timeframe,
    setTimeframe,
    chartStopLoss,
    setChartStopLoss,
    timeframes
  }
  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = () => {
  return useContext(SettingsContext)
}