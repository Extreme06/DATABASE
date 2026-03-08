const SubmitForm = document.getElementById('SubmitForm')
const inputBar = document.getElementById('inputBar')

SubmitForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const requestedID = inputBar.value
    const response = await getData(requestedID)

    console.log(response)
})

async function getData(idNumber = 0) {
    if (isNaN(idNumber)) {
        console.error('Only numbers are accepted!')
        return 0
    }
    const url = idNumber ? `/user?id=${idNumber}` : '/user'
    console.log(url)
    try {
        const response = await fetch(url)
        const data = await response.json()

        return data
    } catch (err) {
        console.error('Failed to get data from Database ', err)
    }
}
