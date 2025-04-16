import getMembers from "./getMembers"
import mensagemErro from "./notification/mensagemErro"
import mensagemSucesso from "./notification/mensagemSucesso"

const removeMember = (member, setMembers) => {

    try {
        var members = getMembers()
        members = members.filter(m => m.id !== member.id)
        localStorage.setItem("membersDespesas", JSON.stringify(members))
        setMembers(members)
        mensagemSucesso('Membro removido...')
    } catch (error) {
        mensagemErro('Não foi possível remover o membro!!!')
    }
}

export default removeMember
