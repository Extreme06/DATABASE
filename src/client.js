const SubmitForm = document.getElementById('FORM_Search')
const inputBar = document.getElementById('INPUT_search')

SubmitForm.addEventListener('submit', async (e) => {
	e.preventDefault()

	const requestedID = inputBar.value
	const response = await getData(requestedID)

	if (!response) return

	const userData = JSON.stringify(response.data, null, 2)
	console.log(userData)
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

		if (!response.ok) {
			console.warn(data.message)
			return
		}
		return data
	} catch (err) {
		console.error('Failed to get data from Database ', err)
	}
}
