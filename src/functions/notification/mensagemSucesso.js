import { toast } from 'react-toastify'

const mensagemSucesso = (mensagem) => {
    toast.success(mensagem, {
        position: "bottom-right"
    })
}
export default mensagemSucesso