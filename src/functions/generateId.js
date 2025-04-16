import getMembers from "./getMembers"

const verifyIdExist = (idGenerated) => {
    const members = getMembers()
    return members.some(member => member.id === idGenerated)
}

const generateId = () => {
    let newId
    do {
        newId = Math.floor(Math.random() * 5000000)
    } while (verifyIdExist(newId))

    return newId
}

export default generateId
