import html2canvas from "html2canvas"
import { useRef } from "react"

function IndividualValue(props) {

    const divRef = useRef(null)

    const SaveAsImage = () => {
        if (!divRef.current) return
        html2canvas(divRef.current).then((canvas) => {
            const link = document.createElement("a")
            link.href = canvas.toDataURL("image/png")
            link.download = `calculo-de-despesa-de-${props.fatureName}-${props.selectedMonth}.png`
            link.click()
        })
    }

    return (
        <div className="modal fade" id="individualValue" tabIndex="-1" aria-labelledby="individualValueLabel" aria-hidden="true">
            <div  className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div ref={divRef}>
                  <div className="modal-header bg-info text-white text-center fw-bold">
                        <h5 className="modal-title text-center" id="individualValueLabel">{'Despesas de ' + props.fatureName +' para o mes de ' + props.selectedMonth}</h5>
                    </div>
                    <div className="modal-body">
                        <div className="w-100 justify-content-between border-bottom border-info pb-2">
                            <div className="d-flex gap-2 text-start">
                                <div className="form-text w-75">
                                    <label className="form-label">Nº de dias</label>
                                    <input disabled value={props.daysInMonth} type="text" className="form-control border-info text-end" aria-describedby="passwordHelpBlock" />
                                </div>

                                <div className="form-text w-75">
                                    <label className="form-label">Valor da fatura</label>
                                    <input disabled value={props.totalValue + '€'} type="text" className="form-control w-100 border-info text-end" aria-describedby="passwordHelpBlock" />
                                </div>

                                <div className="form-text w-75">
                                    <label className="form-label">Valor por dia</label>
                                    <input disabled value={props.valueByDay + '€'} type="text" className="form-control border-info text-end" aria-describedby="passwordHelpBlock" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <h1 className='fw-normal text-start ps-3 pe-3 fs-4 text-info mt-auto mb-auto'>Partições:</h1>
                    <div className="d-flex flex-column text-start p-3 gap-2 pt-2">
                        {props.partitions && props.partitions.map(partition => (
                            <div key={partition.id} className="border border-info rounded p-3">
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <p className="mb-0 text-info fw-bold">Período</p>
                                        <p className="mb-0">{partition.startDate} até {partition.endDate}</p>
                                    </div>
                                    <div>
                                        <p className="mb-0 text-info fw-bold">Elementos</p>
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

                    <h1 className='fw-normal text-start ps-3 pe-3 fs-4 text-info mt-auto mb-auto'>Valor a pagar individualmente:</h1>
                    <div className="d-flex flex-column text-start ms-3 me-3 gap-2">                       
                            <div className="border bg-info border-info rounded-top p-1 text-white">
                                <div className="d-flex bg-info justify-content-between">
                                <div className="w-50">
                                        <p className="mb-0 p-0 fw-bold">{'Nome da pessoa'}</p>
                                    </div>

                                    <div className="w-50">
                                        <p className="mb-0  p-0 fw-bold">{'Somatórios'}</p>
                                    </div>
                                    <div className="w-50">
                                        <p className="mb-0 p-0 fw-bold text-end">{'Total a pagar'}</p>
                                    </div>
                                </div>
                            </div>
        
                    </div>
                    <div className="d-flex flex-column text-start p-3 gap-1 pt-2">
                        {props.individualPayments && props.individualPayments.map(partition => (
                            <div key={partition.id} className="border border-info rounded p-2">
                                <div className="d-flex justify-content-between">
                                    <div className="w-50">
                                        <p className="mb-0 text-info fw-bold">{partition.name}</p>
                                    </div>

                                    <div className="w-50">
                                        <p className="mb-0 text-info fw-bold">{partition.soma}</p>
                                    </div>
                                    <div className="w-50">
                                        <p className="mb-0 text-end">{partition.total}€</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                  </div>
                    <div className="modal-footer">
                        <button onClick={()=> SaveAsImage()} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Salvar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IndividualValue
