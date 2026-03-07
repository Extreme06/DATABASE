const SubmitForm = document.getElementById('SubmitForm')
const inputBar = document.getElementById('inputBar')

SubmitForm.addEventListener('submit', async (e) => {
	e.preventDefault()

	const inputValue = inputBar.value
	const response = await getData(inputValue)
	console.log(response)
})

async function getData(idNumber = 0) {
	if (idNumber.isNan) {
		console.error('Only numbers are accepted!')
		console.log(idNumber)
	} else {
		let url = '/user'
		if (idNumber) url += `?id=${idNumber}`

		try {
			const response = await fetch(url)
			const data = await response.json()
			return data
		} catch (err) {
			console.error('Failed to get data from Database ' + err)
		}
	}
}
