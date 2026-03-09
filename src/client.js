const SubmitForm = document.getElementById('SubmitForm')
const inputBar = document.getElementById('inputBar')

SubmitForm.addEventListener('submit', async (e) => {
	e.preventDefault()

	const requestedID = inputBar.value
	const response = await getData(requestedID)

	if (!response) {
		console.warn('There is no user with such ID')
	} else console.log(response)
})

async function getData(idNumber = 0) {
	if (isNaN(idNumber)) {
		console.error('Only numbers are accepted!')
		return
	}

	const url = idNumber ? `/user?id=${idNumber}` : '/user'
	try {
		const response = await fetch(url)
		const data = await response.json()

		return data
	} catch (err) {
		console.error('Failed to get data from Database ', err)
	}
}
