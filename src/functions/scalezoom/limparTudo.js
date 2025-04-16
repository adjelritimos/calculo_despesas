const limparTudo = (setPartitions, setValueByDay, setSelectedMonth, setIndividualPayments, setTotalValue, setDaysInMonth) => {
    setPartitions([])
    setValueByDay(0)
    setSelectedMonth('selecione um mês')
    setIndividualPayments([])
    setTotalValue(0)
    setDaysInMonth(0)
}

export default limparTudo