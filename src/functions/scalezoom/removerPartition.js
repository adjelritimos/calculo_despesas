import mensagemErro from "../notification/mensagemErro"
import mensagemSucesso from "../notification/mensagemSucesso"

const removePartition = (partitionId, partitions, setPartitions) => {

    try {
        const result = partitions.filter(p=> p.id !== partitionId)
        setPartitions(result)
        mensagemSucesso('partição removida...')
    } catch (error) {
        mensagemErro('Não foi possível remover a partição!!!')
    }
}

export default removePartition
