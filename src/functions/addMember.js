import generateId from "./generateId"
import getMembers from "./getMembers"
import mensagemErro from "./notification/mensagemErro"
import mensagemSucesso from "./notification/mensagemSucesso"

const addMember = (name, setMembers) => {
  try {

    const members = getMembers()
    const novoMembro = { name: name, id: generateId() }
    members.push(novoMembro)
    localStorage.setItem("membersDespesas", JSON.stringify(members))
    setMembers(getMembers())
    mensagemSucesso('Membro foi adicionado com sucesso')
  } catch (error) {
    mensagemErro('Ocorreu um erro ao adicionar novo membro')
  }
}

export default addMember
