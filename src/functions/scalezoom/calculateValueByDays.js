const calculateValueByDays = (totalValue, daysInMonth, setValueByDay) => {
    
    if (!totalValue || !daysInMonth) {
        setValueByDay(0)
        return
    }

    const valuePerDay = (Math.round((totalValue / daysInMonth) * 100) / 100).toFixed(2)
    setValueByDay(valuePerDay)
}

export default calculateValueByDays
