const SubmitForm = document.getElementById('FORM_Search')
const inputBar = document.getElementById('INPUT_search')

const INPUT_insertUser_Name = document.getElementById('INPUT_insertUser_Name')
const INPUT_insertUser_Email = document.getElementById('INPUT_insertUser_Email')
const INPUT_insertUser_Password = document.getElementById('INPUT_insertUser_Password')

const FORM_insertUser = document.getElementById('FORM_insertUser')
FORM_insertUser.addEventListener('submit', async (e) => {
	e.preventDefault()

	//pull {name email password} variables that client submitted
	const dataToSend = {
		name: INPUT_insertUser_Name.value,
		email: INPUT_insertUser_Email.value,
		password: INPUT_insertUser_Password.value,
	}

	// dataToSend.forEach((element) => {
	// 	if (!element) {
	// 		console.warn(`Invalid parameter [${element}]`)
	// 		return
	// 	}
	// })

	const response = await fetch('/user', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(dataToSend),
	})

	if (!response.ok) {
		console.warn('There was an Error with importing user')
		return
	}
	const data = await response.json()
	console.log(data)
})

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
		console.warn('Only numbers are accepted!')
		return
	}

	// const url = idNumber ? `/user?id=${idNumber}` : '/user'
	try {
		const response = await fetch('/user', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ requestedID: idNumber }),
		})

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
