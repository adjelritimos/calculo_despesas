import { useState } from "react"

const totoriais = [
    {
      title: 'Adicionar Membros',
      content: 'Na sessão dos elementos da casa, contém um butão, que permite adicionar membros. Basta dar um clique nele e preencher o formulário com nome do novo membro.',
      image: 'addmember.gif',
    },
    {
      title: 'Selecionar tipo Fatura',
      content: 'Selecione o tipo de fatura que deseja calcular, permite que na hora de fazer o download jáfica identificado o tipo de fatura que foi calculado.',
      image: 'selectFaturaType.gif',
    },
    {
      title: 'Selecionar Mês',
      content: 'Você deverá selecionar um mês para qual a fatura será calculada, e em seguda o número do dia já será prenchido. depois colocarás o valor da fatura, e será feito o calculo por dia, que será preenchido o campo de valor por dia.',
      image: 'selectMonth.gif',
    },
    {
      elementId: 'add-partitions-button',
      title: 'Adicionar Partições',
      content: 'O butão "nova particão" permite adicionar novas partições, onde teras um formuário para preencher com o intervalo da partição indicando o dada de inicio e fim, bem como os elemetos que estavam em casa neste período.',
      image: 'addPartition.gif',
    },
    {
      elementId: 'calculate-individual',
      title: 'Exportação da imagem',
      content: 'Tem um butão com icone de "download" que te permitirá fazer o download da imagem da fatura, com o valor por dia, e o valor total da fatura, as partições e os membros, e o valor total que cada membro deve pagar.',
      image: 'dodownload.gif',
    },
  ]

const Totorial = () => {
    // Estado para armazenar os tutoriais e o índice do tutorial atual
    localStorage.removeItem('hasSeenTotorial')
    const [currentTutorialIndex, setCurrentTutorialIndex] = useState(0)
    const [show, setShow] = useState(true)

    // Função para avançar para o próximo tutorial
    const handleNext = () => {
        if (currentTutorialIndex < totoriais.length - 1) {
            // Avança para o próximo tutorial
            setCurrentTutorialIndex(currentTutorialIndex + 1)
        } else {
            // Fecha o modal ou reinicia para o primeiro tutorial
            setShow(false)
            localStorage.setItem('hasSeenTotorial', 'true') // Marca como visto
        }
    }

    // Se o modal não deve ser exibido, retorna null
    if (!show || totoriais.length === 0) {
        return null
    }

    // Obtém o tutorial atual
    const currentTutorial = totoriais[currentTutorialIndex]

    return (
        <div className="modal" tabIndex="-1" style={{ display: show ? 'block' : 'none' }}>
            <div className="modal-dialog">
                <div className="modal-content rounded shadow bg-info text-white">
                    <div className="modal-header border-info">
                        <h5 className="modal-title">{currentTutorial.title}</h5>
                        <button type="button" className="btn-close" onClick={() => setShow(false)} aria-label="Close"></button>
                    </div>
                    <div className="modal-body mt-0 mb-0 pt-0 pb-0">
                        <img className="w-100 totorial rounded border border-white border-2" src={`./${currentTutorial.image}`} alt="totorial"/>
                        <p style={{textAlign: 'justify'}}>{currentTutorial.content}</p>
                    </div>
                    <div className="modal-footer border-info mt-0 pt-0">
                        <button type="button"className="btn btn-light"  onClick={handleNext}>
                            {currentTutorialIndex < totoriais.length - 1 ? 'Próximo' : 'Fechar'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Totorial