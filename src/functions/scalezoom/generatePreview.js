const getMes = (mes) => {
    const meses = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"]
    return meses.indexOf(mes) + 1
}

const obterTotalDiasDoMesPorNome = (nomeMes, setDaysInMonth, setSelectedMonth) => {

    const mesIndex = getMes(nomeMes)
    setSelectedMonth(nomeMes)

    if (nomeMes === 'selecione um mês') {
        setDaysInMonth(0)
        return
    }

    if (mesIndex === -1) {
        console.error("Mês inválido")
        return
    }

    setDaysInMonth(new Date(new Date().getFullYear(), mesIndex, 0).getDate())
}


export default obterTotalDiasDoMesPorNome
