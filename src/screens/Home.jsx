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

  useEffect(() => {
    const savedMembers = getMembers()
    setMembers(savedMembers)
  }, [])

  return (
    <div className="view d-flex flex-column flex-md-row gap-2 p-2 p-md-3">
      {/* Painel de Membros */}
      <div className="w-100 w-md-25 p-2 rounded bg-white mb-3 mb-md-0">
        <div className="d-flex w-100 justify-content-between border-bottom border-info pb-2">
          <h1 className='fw-normal fs-5 fs-md-4 text-info mt-auto mb-auto'>Elementos da casa</h1>
          <button 
            type="button" 
            data-bs-toggle="modal" 
            data-bs-target="#adicionar" 
            className="btn btn-info text-white fw-bold mt-auto mb-auto rounded-circle"
          >
            +
          </button>
          <AddMembers setMembers={setMembers} />
        </div>

        <div className="w-100">
          <ul className="list-group list-group-flush mt-3">
            {members.map(member => (
              <li 
                key={member.id} 
                role='button' 
                className="list-group-item border mb-1 border-info rounded d-flex justify-content-between align-items-center"
              >
                <span className="text-truncate">{member.name}</span>
                <button 
                  className="btn btn-outline-danger rounded-circle border-white btn-sm" 
                  onClick={() => removeMember(member, setMembers)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Calculadora de Despesas */}
      <div className="w-100 w-md-75 p-2 rounded bg-white">
        <div className="w-100 border-bottom border-info pb-2">
          <div className='d-flex flex-column flex-md-row gap-2 mb-3 mb-md-0'>
            <h1 className='fw-normal fs-5 fs-md-4 text-info mt-auto mb-auto'>Calculadora de Despesas</h1>
            <div className="w-100 w-md-auto">
              <select 
                value={fatureName} 
                onChange={(e) => { 
                  setFatureName(e.target.value); 
                  limparTudo(setPartitions, setValueByDay, setSelectedMonth, setIndividualPayments, setTotalValue, setDaysInMonth) 
                }} 
                className="form-select border-info"
              >
                <option value="Selecione a fatura">selecione um tipo</option>
                <option value="Água">Água</option>
                <option value="Energia">Energia</option>
                <option value="Gás">Gás</option>
                <option value="Internet">Internet</option>
              </select>
            </div>
          </div>
          
          <div className="d-flex flex-wrap gap-2">
            <div className="w-50 w-md-auto">
              <label className="form-label">Mês da fatura</label>
              <select 
                value={selectedMonth} 
                onChange={(e) => obterTotalDiasDoMesPorNome(e.target.value, setDaysInMonth, setSelectedMonth)} 
                className="form-select border-info"
              >
                <option value="Selecione o mês da fatura">selecione um mês</option>
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

            <div className="w-25 w-md-auto">
              <label className="form-label">Nº de dias</label>
              <input 
                value={daysInMonth} 
                type="text" 
                className="form-control border-info text-end" 
                aria-describedby="passwordHelpBlock" 
              />
            </div>

            <div className="w-25 w-md-auto">
              <label className="form-label">Valor da fatura</label>
              <input 
                value={totalValue} 
                onChange={(e) => { 
                  setTotalValue(e.target.value); 
                  calculateValueByDays(e.target.value, daysInMonth, setValueByDay) 
                }} 
                type="text" 
                className="form-control border-info text-end" 
                aria-describedby="passwordHelpBlock" 
              />
            </div>

            <div className="w-25 w-md-auto">
              <label className="form-label">Valor por dia</label>
              <input 
                value={valueByDay} 
                type="text" 
                className="form-control border-info text-end" 
                aria-describedby="passwordHelpBlock" 
              />
            </div>
            
            <div className="w-auto ms-auto">
              <button 
                onClick={() => calculateIndividualPayment(partitions, setIndividualPayments)} 
                type="button" 
                data-bs-toggle="modal" 
                data-bs-target="#individualValue" 
                className="btn btn-outline-info mt-auto mb-auto rounded-circle border-white btn-sm"
              >
                <i className="fa-solid fa-download"></i>
              </button>
            </div>

            <IndividualValue 
              members={members} 
              valueByDay={valueByDay} 
              selectedMonth={selectedMonth} 
              totalValue={totalValue}
              daysInMonth={daysInMonth}
              partitions={partitions}
              individualPayments={individualPayments}
              fatureName={fatureName}
            />
          </div>
        </div>

        <div className="w-100 overflow-auto" style={{ maxHeight: "calc(100vh - 200px)" }}>
          <div className="d-flex flex-column flex-md-row w-100 justify-content-between border-bottom border-info pt-2 pb-2">
            <h1 className='fw-normal fs-5 fs-md-4 text-info mt-auto mb-auto mb-2 mb-md-0'>Partições</h1>
            <button 
              type="button" 
              data-bs-toggle="modal" 
              data-bs-target="#adicionarPart" 
              className="btn btn-info text-white fw-bold mt-auto mb-auto rounded-circle align-self-start align-self-md-center"
            >
              +
            </button>
            <AddPartitions 
              valueByDay={valueByDay} 
              members={members} 
              partitions={partitions} 
              setPartitions={setPartitions} 
            />
          </div>
          
          <div className="d-flex flex-column gap-2 pt-2">
            {partitions && partitions.map(partition => (
              <div key={partition.id} className="border border-info rounded p-3">
                <div className="d-flex flex-column flex-md-row justify-content-between">
                  <div className="mb-2 mb-md-0">
                    <p className="mb-0 text-info fw-bold">Período</p>
                    <p className="mb-0">{partition.startDate} até {partition.endDate}</p>
                  </div>
                  <div>
                    <div className='d-flex justify-content-between gap-2'>
                      <p className="mb-0 text-info fw-bold text-start text-md-end">Elementos</p>
                      <button 
                        onClick={() => removePartition(partition.id, partitions, setPartitions)} 
                        type="button" 
                        className="btn btn-outline-danger mt-auto mb-auto rounded-circle border-white btn-sm"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                    <div className="d-flex flex-wrap gap-2">
                      {partition.members.map(member => {
                        return member && (
                          <span key={member} className="badge bg-info">
                            {member}
                          </span>
                        )
                      })}
                    </div>
                    <div>
                      <p className="mb-0 text-info fw-bold text-start text-md-end">Valor a pagar</p>
                      <p className="mb-0 text-start text-md-end">{partition.valueToPay}€</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <ToastContainer position="top-center" className="mt-3" />
    </div>
  )
}

export default Home