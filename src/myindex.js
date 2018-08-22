document.addEventListener("DOMContentLoaded", () => {

  fetchAll()

  const choreList = document.getElementById('chore-list')
  const submitButton = document.getElementById('submit-btn')
  submitButton.addEventListener("click", (e) => {
    createChore()
  })

  async function fetchAll() {
    const result = await fetch("http://localhost:3000/chores")
    const data = await result.json()
    displayChoreCard(data)
  }

  const displayChoreCard = (data) => {
    data.forEach(chore => {
      const choreDiv = document.createElement('div')
      choreDiv.classList.add('chore-card')
      choreDiv.dataset.id = chore.id
      choreDiv.innerHTML =
      `<button class="delete-button">X</button>
      <h3>${chore.title}</h3>
      <p>${chore.priority}</p>
      <p>${chore.duration}</p>
      `
      choreList.append(choreDiv)
    })
    const deleteButtons = document.querySelectorAll('.delete-button')
    deleteButtons.forEach( (deleteButton) => {
      deleteButton.addEventListener("click", (e) => {
        let id = e.target.parentElement.getAttribute("data-id")
        deleteChore(id)
        e.target.parentElement.remove()
      })
    })
  }

  async function deleteChore(id) {
    const result = await fetch(`http://localhost:3000/chores/${id}`, {
      method: 'DELETE'
    })
  }

  async function createChore() {
    let data = {
      title: document.getElementById('title').value,
      priority: document.getElementById('priority').value,
      duration: document.getElementById('duration').value
    }
    const result = await fetch("http://localhost:3000/chores", {
      method: 'POST',
      headers:{
        Accept: 'applicaton/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }

})
