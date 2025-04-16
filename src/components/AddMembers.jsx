import { useState } from 'react'
import addMember from '../functions/addMember'

const AddMembers = (props) => {
    const [name, setName] = useState('')

    return (
        <div className="modal fade" id="adicionar" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header pb-0 border-white">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Novo membro</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body pb-0 pt-0">
                        <div className="form-text">
                            <input type="text"placeholder='Nome do membro' className="form-control border-info" value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>
                    </div>
                    <div className="modal-footer border-white">
                        <button onClick={()=> addMember(name, props.setMembers)} type="button" className="btn btn-info fw-bold text-white rounded-pill w-100" data-bs-dismiss="modal">Adicionar</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AddMembers
