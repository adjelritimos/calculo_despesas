import { toast } from 'react-toastify'

const mensagemErro = (mensagem) => {
    toast.error(mensagem, {
        position: "bottom-right"
    })
}
export default mensagemErro