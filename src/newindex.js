document.addEventListener("DOMContentLoaded", () => {

  init()

  function init() {
    renderChores()
    const submitButton = document.getElementById("submit-btn")
    submitButton.addEventListener("click", () => {
      const newChore = {
        title: document.getElementById("title").value,
        priority: document.getElementById("priority").value,
        duration: document.getElementById("duration").value
      }
      createChore(newChore)
    })
  }

  async function fetchAllChores() {
    const response = await fetch("http://localhost:3000/chores")
    const data = await response.json()
    return data
  }

  async function createChore(newChore) {
    const data = newChore.priority
    const response = await fetch("http://localhost:3000/chores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(data)
    })
    renderChores()
    return response.json()
  }

  async function deleteChore(id) {
    const response = await fetch(`http://localhost:3000/chores/${id}`, {
      method: "DELETE"
    })
    renderChores()
    return response.json()
  }

  async function editChore(id, data) {
    const response = await fetch(`http://localhost:3000/chores/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        priority: data
      })
    })
    renderChores()
    return response.json()
  }

  function renderChores() {
    const choreDiv = document.getElementById("chore-list")
    choreDiv.innerHTML = ""
    const data = fetchAllChores()
      .then( chores => {
        chores.forEach( chore => {
          choreDiv.append(choreElement(chore))
        })
      })
  }

  function choreElement(chore) {
    const choreDiv = document.createElement("div")
    choreDiv.classList.add("chore-card")

    const deleteButton = document.createElement("button")
    deleteButton.innerText = "X"
    deleteButton.classList.add("delete-button")
    deleteButton.addEventListener("click", () => deleteChore(chore.id))

    const h1 = document.createElement("h1")
    h1.innerText = chore.title

    const p = document.createElement("p")
    p.innerText = chore.duration

    const chorePriority = document.createElement("input")
    chorePriority.value = chore.priority
    chorePriority.addEventListener("blur", () => editChore(chore.id, chorePriority.value))

    choreDiv.append(deleteButton, h1, p, chorePriority)
    return choreDiv
  }

})
