import { useState } from 'react'
import generateId from '../functions/generateId'
import mensagemErro from '../functions/notification/mensagemErro'
import mensagemSucesso from '../functions/notification/mensagemSucesso'
import mensagemAviso from '../functions/notification/mensagemAviso'

const AddPartitions = (props) => {

    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [selectedMembers, setSelectedMembers] = useState([])

    const handleAddPartition = () => {
        try {

            if (!startDate || !endDate) {
                mensagemAviso('Datas inválidas')
                return
            }

            if (selectedMembers.length === 0) {
                mensagemAviso('Selecione pelo menos um membro')
                return
            }

            const start = new Date(startDate)
            const end = new Date(endDate)
            // Calculate total days between dates
            const diffTime = Math.abs(end - start)
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1

            if (end < start) {
                mensagemAviso('Data final não pode ser menor que data inicial')
                return
            }
            const partition = {
                id: generateId(),
                startDate,
                valueToPay: Number((Math.round(((props.valueByDay * diffDays) / selectedMembers.length) * 100) / 100).toFixed(2)),
                endDate,
                members: selectedMembers
            }
            console.log(partition)
            props.setPartitions([...props.partitions, partition])
            mensagemSucesso('Partição adicionada com sucesso')

            // Reset form
            setStartDate('')
            setEndDate('')
            setSelectedMembers([])

        } catch (error) {
            mensagemErro('Ocorreu um erro ao adicionar nova partição')
        }
    }

    const handleMemberSelection = (memberName) => {
        if (selectedMembers.includes(memberName)) {
            setSelectedMembers(selectedMembers.filter(name => name !== memberName))
        } else {
            setSelectedMembers([...selectedMembers, memberName])
        }
    }

    return (
        <div className="modal fade" id="adicionarPart" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header pb-0 border-white">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Nova Partição</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body pb-0 pt-0">
                        <div className='d-flex gap-2 w-100'>
                            <div className="form-text w-50 mb-3">
                                <label className="form-label">Data Inicial</label>
                                <input
                                    type="date"
                                    className="form-control w-100 border-info"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                            </div>
                            <div className="form-text w-50 mb-3">
                                <label className="form-label">Data Final</label>
                                <input
                                    type="date"
                                    className="form-control w-100 border-info"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-text">
                            <label className="form-label">Selecione os Membros</label>
                            <div className="d-flex flex-wrap gap-2">
                                {props.members && props.members.map(member => (
                                    <div
                                        key={member.id}
                                        className={`btn ${selectedMembers.includes(member.name) ? 'btn-info text-white' : 'btn-outline-info'}`}
                                        onClick={() => handleMemberSelection(member.name)}
                                    >
                                        {member.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer border-white">
                        <button
                            onClick={handleAddPartition}
                            type="button"
                            className="btn btn-info fw-bold text-white rounded-pill w-100"
                            data-bs-dismiss="modal"
                        >
                            Adicionar Partição
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddPartitions
