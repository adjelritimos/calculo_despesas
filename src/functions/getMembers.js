const getMembers = () => {
    let members = []
    if (localStorage.getItem("membersDespesas")) {
        members = JSON.parse(localStorage.getItem("membersDespesas"))
    }
    return members.sort((a, b) => a.name.localeCompare(b.name))
}

export default getMembers
