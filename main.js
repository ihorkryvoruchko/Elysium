let gesamtBudget = 5000

const systeme = [
    {
        name: "Sauerstoffversorgung",
        status: "kritisch",
        energieverbrauch: 80,
        reparaturkosten: 1200
    },
    {
        name: "Kantine",
        status: "normal",
        energieverbrauch: 30,
        reparaturkosten: 100
    },
    {
        name: "Antrieb",
        status: "kritisch",
        energieverbrauch: 95,
        reparaturkosten: 5000
    },
    {
        name: "Kommunikation",
        status: "gestört",
        energieverbrauch: 40,
        reparaturkosten: 800
    }
]

const list = document.getElementById("list")
const filter = document.getElementById("filter")
const gesamtKosten = document.getElementById("gesamtenReparaturkosten")
const energieVerbrauchList = document.getElementById("energieVerbrauchList")
const statisticList = document.getElementById("statistik")
const budget = document.getElementById("budget")
const filterElemente = []
let statistik = {}

updateBudget()
filterByStatus(systeme)

filter.addEventListener("change", (event) => {
    if (event.target.value === "alle") {
        filterByStatus(systeme)
    } else {
        filterByStatus(systeme.filter((element) => element.status === event.target.value))
    }
})

list.addEventListener("click", (event) => {
    const button = event.target.closest(".reparieren");

    if (!button) return;

    const li = event.target.parentElement
    const id = li.querySelector("span").textContent
    if (id !== "normal") {
        const costen = Number(li.dataset.costen)
        if (costen <= gesamtBudget) {
            gesamtBudget -= costen
            updateBudget()
            const index = li.dataset.index
            systeme[index].status = "normal"
            filterByStatus(systeme)
        } else {
            alert("Sie brauchen mehr Geld")
        }
    }
})



for (const element of filterElemente) {
    const option = document.createElement("option")
    option.innerText = element
    filter.appendChild(option)
}

function filterByStatus(systemeList) {
    resetListe(list)
    resetListe(statisticList)

    for (let i = 0; i < systemeList.length; i++) {
        const system = systemeList[i]
        if (!filterElemente.includes(system.status)) {
            filterElemente.push(system.status)
        }

        statistik[system.status] = statistik[system.status] + 1 || 1

        const li = document.createElement("li")
        li.innerHTML = `System: ${system.name}, Status: <span>${system.status}</span> <button class="reparieren">reparieren</button>`
        li.dataset.costen = system.reparaturkosten
        li.dataset.index = i

        if (system.status === "kritisch") {
            li.classList.add("kritisch")
        } else if (system.status === "gestört") {
            li.classList.add("gestört")
        }

        list.appendChild(li)
    }
    const cost = systemeList.reduce((total, systemElement) => total + systemElement.reparaturkosten, 0)
    gesamtKosten.dataset.costen = cost
    gesamtKosten.innerText = "Gesamten Reparaturkosten: " + cost + "€"

    for (const [key, value] of Object.entries(statistik)) {
        const statisticLi = document.createElement("li")
        statisticLi.id = key
        statisticLi.dataset.count = value
        statisticLi.textContent = `${key}: ${value}`
        statisticList.appendChild(statisticLi)
    }
}

function resetListe(list) {
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }
}

function updateBudget() {
    budget.innerText = gesamtBudget
}

const newListe = systeme.map((element) => `${element.name} ${element.energieverbrauch}`)
for (const element of newListe) {
    const li = document.createElement("li")
    li.innerText = element
    energieVerbrauchList.appendChild(li)
}
