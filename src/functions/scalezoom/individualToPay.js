import getMembers from "../getMembers";

const calculateIndividualPayment = (partitions, setIndividualPayments) => {
    const members = getMembers();
    let individualPayments = [];

    if (!partitions || partitions.length === 0) {
        setIndividualPayments([]);
        return;
    }

    for (let a = 0; a < members.length; a++) {
        const individual = { name: members[a].name, soma: '', total: 0 };
        for (let b = 0; b < partitions.length; b++) {
            if (partitions[b].members.includes(individual.name)) {
                if (individual.soma) {
                    individual.soma += `+${partitions[b].valueToPay}`
                } else {
                    individual.soma = `${partitions[b].valueToPay}`
                }
                individual.total += partitions[b].valueToPay
            }
        }
        individual.total = individual.total.toFixed(2)
        individualPayments.push(individual)
    }

    setIndividualPayments(individualPayments)
};

export default calculateIndividualPayment;