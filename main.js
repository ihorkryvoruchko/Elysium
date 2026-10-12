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
const statisticUl = document.getElementById("statistik")
const filterElemente = []

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

    let id = li.querySelector("span").textContent
    if (id !== "normal") {
        let newCount = Number(statisticUl.querySelector(`#${id}`).dataset.count) - 1
        statisticUl.querySelector(`#${id}`).dataset.count = newCount
        statisticUl.querySelector(`#${id}`).textContent = `${id}: ${newCount}`

        if (statisticUl.querySelector(`#normal`)) {
            let newNormalCount = Number(statisticUl.querySelector(`#normal`).dataset.count) + 1
            statisticUl.querySelector(`#normal`).dataset.count = newNormalCount
            statisticUl.querySelector(`#normal`).textContent = `normal: ${newNormalCount}`
        } else {
            const statisticLi = document.createElement("li")
            statisticLi.id = "normal"
            statisticLi.dataset.count = "1"
            statisticLi.textContent = `normal: 1`
            statisticUl.appendChild(statisticLi)
        }

        li.classList.remove("kritisch", "gestört")
        li.querySelector("span").textContent = "normal"
    }
})



for (const element of filterElemente) {
    const option = document.createElement("option")
    option.innerText = element
    filter.appendChild(option)
}

function filterByStatus(systemeList) {
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }

    while (statisticUl.hasChildNodes()) {
        statisticUl.removeChild(statisticUl.firstChild);
    }

    let statistik = {}

    for (const system of systemeList) {
        if (!filterElemente.includes(system.status)) {
            filterElemente.push(system.status)
        }

        statistik[system.status] = statistik[system.status] + 1 || 1

        const li = document.createElement("li")
        li.innerHTML = `System: ${system.name}, Status: <span>${system.status}</span> <button class="reparieren">reparieren</button>`

        if (system.status === "kritisch") {
            li.classList.add("kritisch")
        } else if (system.status === "gestört") {
            li.classList.add("gestört")
        }

        list.appendChild(li)
    }
    gesamtKosten.innerText = "Gesamten Reparaturkosten: " + systemeList.reduce((total, systemElement) => total + systemElement.reparaturkosten, 0) + "€"

    for (const [key, value] of Object.entries(statistik)) {
        const statisticLi = document.createElement("li")
        statisticLi.id = key
        statisticLi.dataset.count = value
        statisticLi.textContent = `${key}: ${value}`
        statisticUl.appendChild(statisticLi)
    }
}

const newListe = systeme.map((element) => `${element.name} ${element.energieverbrauch}`)
for (const element of newListe) {
    const li = document.createElement("li")
    li.innerText = element
    energieVerbrauchList.appendChild(li)
}
