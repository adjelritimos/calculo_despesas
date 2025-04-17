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
    <div className={ isMobile ? "view d-flex flex-wrap p-3" : "view d-flex gap-2 p-3" }>
      <div className={ isMobile ? "w-100 p-2 rounded bg-white" : "w-25 p-2 rounded bg-white" }>
        <div className="d-flex w-100 justify-content-between border-bottom border-info pb-2">
          <h1 className='fw-normal fs-4 text-info mt-auto mb-auto'>Elementos da casa</h1>
          <button type="button" data-bs-toggle="modal" data-bs-target="#adicionar" className="btn btn-info text-white fw-bold mt-auto mb-auto rounded-circle">+</button>
          <AddMembers setMembers={setMembers} />
        </div>

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

      <div className={ isMobile ? "w-100 p-2 rounded bg-white" : "w-75 p-2 rounded bg-white" }>
        <div className="w-100 justify-content-between border-bottom border-info pb-2">
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
          <div className="d-flex gap-2 text-end">
            <div className="form-text text-start">
              <label className="form-label">Mês da fatura</label>
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

            <div className="form-text">
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
            <button type="button" data-bs-toggle="modal" data-bs-target="#adicionarPart" className="btn btn-info text-white fw-bold mt-auto mb-auto rounded-circle">+</button>
            <AddPartitions valueByDay={valueByDay} members={members} partitions={partitions} setPartitions={setPartitions} />
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