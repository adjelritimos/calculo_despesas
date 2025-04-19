import { useState, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import removeMember from '../functions/removeMember'
import AddMembers from '../components/AddMembers'
import getMembers from '../functions/getMembers'
import AddPartitions from '../components/addParticions'
import obterTotalDiasDoMesPorNome from '../functions/scalezoom/generatePreview'
import calculateValueByDays from '../functions/scalezoom/calculateValueByDays'
import IndividualValue from '../components/IndividualValue'
import calculateIndividualPayment from '../functions/scalezoom/individualToPay'
import limparTudo from '../functions/scalezoom/limparTudo'
import removePartition from '../functions/scalezoom/removerPartition'
import Totorial from '../components/totorial'


const steps = [
  {
    title: 'Adicionar Membros',
    content: 'Na sessão dos elementos da casa, contém um butão, que permite adicionar membros. Basta dar um clique nele e preencher o formulário com nome do novo membro.',
    image: '../assets/addmember.gif',
  },
  {
    title: 'Selecionar tipo Fatura',
    content: 'Selecione o tipo de fatura que deseja calcular, permite que na hora de fazer o download jáfica identificado o tipo de fatura que foi calculado.',
    image: '../assets/selectFaturaType.gif',
  },
  {
    title: 'Selecionar Mês',
    content: 'Você deverá selecionar um mês para qual a fatura será calculada, e em seguda o número do dia já será prenchido. depois colocarás o valor da fatura, e será feito o calculo por dia, que será preenchido o campo de valor por dia.',
    image: '../assets/selectMonth.gif',
  },
  {
    elementId: 'add-partitions-button',
    title: 'Adicionar Partições',
    content: 'O butão "nova particão" permite adicionar novas partições, onde teras um formuário para preencher com o intervalo da partição indicando o dada de inicio e fim, bem como os elemetos que estavam em casa neste período.',
    image: '../assets/addPartition.gif',
  },
  {
    elementId: 'calculate-individual',
    title: 'Exportação da imagem',
    content: 'Tem um butão com icone de "download" que te permitirá fazer o download da imagem da fatura, com o valor por dia, e o valor total da fatura, as partições e os membros, e o valor total que cada membro deve pagar.',
    image: '../assets/dodownload.gif',
  },
]

function Home() {

  const [members, setMembers] = useState([])
  const [partitions, setPartitions] = useState([])
  const [fatureName, setFatureName] = useState('')
  const [valueByDay, setValueByDay] = useState(0)
  const [selectedMonth, setSelectedMonth] = useState('selecione um mês')
  const [individualPayments, setIndividualPayments] = useState([])
  const [totalValue, setTotalValue] = useState(0)
  const [daysInMonth, setDaysInMonth] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  const handleResize = () => {
    setIsMobile(window.innerWidth < 992)
  }

  useEffect(() => {
    const savedMembers = getMembers()
    setMembers(savedMembers)
    handleResize()

  }, [])


  return (
    <div className={isMobile ? "view d-flex flex-column gap-2 p-3" : "view d-flex gap-2 p-3"}>
      <div className={isMobile ? "w-100 p-2 rounded bg-white" : "w-25 p-2 rounded bg-white"}>
        <div className="d-flex w-100 justify-content-between border-bottom border-info pb-2">
          <h1 className='fw-normal fs-4 text-info mt-auto mb-auto'>Elementos da casa</h1>
          <button type="button" data-bs-toggle="modal" data-bs-target="#adicionar" className="btn btn-info text-white fw-bold mt-auto mb-auto rounded-circle">+</button>
          <AddMembers setMembers={setMembers} />
        </div>
        <Totorial totoriais={steps} />
        <div className="w-100">
          <ul className="list-group list-group-flush mt-3">
            {members.map(member => (
              <li key={member.id} role='button' className="list-group-item border mb-1 border-info rounded d-flex justify-content-between align-items-center">
                {member.name}
                <button className="btn btn-outline-danger rounded-circle border-white btn-sm" onClick={() => removeMember(member, setMembers)}><i className="fa-solid fa-trash"></i></button>
              </li>
            ))}
          </ul>
        </div>

      </div>

      <div className={isMobile ? "w-100 p-2 rounded bg-white" : "w-75 p-2 rounded bg-white"}>
        <div className="w-100 justify-content-between border-bottom border-info pb-2">
          <div className='d-flex gap-2 justify-content-between'>
            <div className='d-flex gap-2'>
              <h1 className='fw-normal fs-4 text-info mt-auto mb-auto'>Calculadora de Despesas</h1>
              <div className="form-text text-start">
                <select value={fatureName} onChange={(e) => { setFatureName(e.target.value); limparTudo(setPartitions, setValueByDay, setSelectedMonth, setIndividualPayments, setTotalValue, setDaysInMonth) }} className="form-select border-info">
                  <option value="Selecione a fatura" selected>selecione um tipo</option>
                  <option value="Água">Água</option>
                  <option value="Energia">Energia</option>
                  <option value="Gás">Gás</option>
                  <option value="Internet">Internet</option>
                </select>
              </div>
            </div>

            <p className="btn btn-outline-info border border-white rounded-pill" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">ajuda</p>

            <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
              <div className="offcanvas-header border-bottom border-info">
                <h5 className="offcanvas-title fw-bold text-info" id="offcanvasRightLabel">Ajudas para uso do site</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div className="offcanvas-body">
                {steps.map((step, index) => (
                  <div key={index} className="btn btn-outline-light text-dark text-start mb-2" id={step.elementId}>
                    <h3>{step.title}</h3>
                    <p style={{textAlign: 'justify'}} className='text-justify'>{step.content}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
          <div className="d-flex gap-2 text-end">
            <div className="form-text text-start">
              <label className="form-label">{isMobile ? "Mês" : "Mês da fatura"}</label>
              <select value={selectedMonth} onChange={(e) => obterTotalDiasDoMesPorNome(e.target.value, setDaysInMonth, setSelectedMonth)} className="form-select border-info">
                <option value="Selecione o mês da fatura" selected>selecione um mês</option>
                <option value="janeiro">janeiro</option>
                <option value="fevereiro">fevereiro</option>
                <option value="março">março</option>
                <option value="abril">abril</option>
                <option value="maio">maio</option>
                <option value="junho">junho</option>
                <option value="julho">julho</option>
                <option value="agosto">agosto</option>
                <option value="setembro">setembro</option>
                <option value="outubro">outubro</option>
                <option value="novembro">novembro</option>
                <option value="dezembro">dezembro</option>
              </select>

            </div>

            <div className={isMobile ? "visually-hidden" : "form-text"}>
              <label className="form-label">Nº de dias</label>
              <input value={daysInMonth} type="text" className="form-control border-info text-end" aria-describedby="passwordHelpBlock" />
            </div>

            <div className="form-text">
              <label className="form-label">Valor da fatura</label>
              <input value={totalValue} onChange={(e) => { setTotalValue(e.target.value); calculateValueByDays(e.target.value, daysInMonth, setValueByDay) }} type="text" className="form-control border-info text-end" aria-describedby="passwordHelpBlock" />
            </div>

            <div className="form-text">
              <label className="form-label">Valor por dia</label>
              <input value={valueByDay} type="text" className="form-control border-info text-end" aria-describedby="passwordHelpBlock" />
            </div>
            <button onClick={() => calculateIndividualPayment(partitions, setIndividualPayments)} type="button" data-bs-toggle="modal" data-bs-target="#individualValue" className="btn btn-outline-info mt-auto mb-auto rounded-circle border-white btn-sm">
              <i className="fa-solid fa-download"></i>
            </button>

            <IndividualValue members={members} valueByDay={valueByDay} selectedMonth={selectedMonth} totalValue={totalValue}
              daysInMonth={daysInMonth}
              partitions={partitions}
              individualPayments={individualPayments}
              fatureName={fatureName}
            />


          </div>
        </div>

        <div className="w-100 overflow-auto" style={{ height: "calc(100vh - 200px)" }}>
          <div className="d-flex w-100 justify-content-between border-bottom border-info pt-2 pb-2">
            <h1 className='fw-normal fs-4 text-info mt-auto mb-auto'>Partições</h1>
            <button type="button" data-bs-toggle="modal" data-bs-target="#adicionarPart" className="btn btn-info text-white fw-bold mt-auto mb-auto rounded-pill">+ nova partição</button>
            <AddPartitions limit={totalValue} valueByDay={valueByDay} members={members} partitions={partitions} setPartitions={setPartitions} />
          </div>
          <div className="d-flex flex-column gap-2 pt-2">
            {partitions && partitions.map(partition => (
              <div key={partition.id} className="border border-info rounded p-3">
                <div className="d-flex justify-content-between">
                  <div>
                    <p className="mb-0 text-info fw-bold">Período</p>
                    <p className="mb-0">{partition.startDate} até {partition.endDate}</p>
                  </div>
                  <div>
                    <div className='d-flex justify-content-between gap-2'>
                      <p className="mb-0 text-info fw-bold text-end">Elementos</p>
                      <button onClick={() => removePartition(partition.id, partitions, setPartitions)} type="button" className="btn btn-outline-danger mt-auto mb-auto rounded-circle border-white btn-sm">
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                    <div className="d-flex gap-2">
                      {partition.members.map(member => {
                        return member && (
                          <span className="badge bg-info">
                            {member}
                          </span>
                        )
                      })}
                    </div>
                    <div>
                      <p className="mb-0 text-info fw-bold text-end">Valor a pagar</p>
                      <p className="mb-0 text-end">{partition.valueToPay}€</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Home