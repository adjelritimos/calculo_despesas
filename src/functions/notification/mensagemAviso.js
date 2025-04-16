import { toast } from 'react-toastify'

const mensagemAviso = (mensagem) => {
    toast.warn(mensagem, {
        position: "bottom-right"
    })
}
export default mensagemAviso