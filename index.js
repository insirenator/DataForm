// THE MAIN SCRIPT

// HTML Elements
const form = document.querySelector('#data-form');
const data_el = document.querySelector('.data');
const submitBtn = document.querySelector('#submit-btn');
const showDetailsBtn = document.querySelector('#show-users');
const clearDetailsBtn = document.querySelector('#clear-users');



// Submit Button Event Listener
submitBtn.addEventListener('click', (e) => {
	// prevent form submission
	e.preventDefault();

	// Get the form values
	const formData = new FormData(form);
	const values = [...formData.entries()];
	console.log(values);

	// Convert to object
	const valuesObj = Object.fromEntries(values);

	// Validation Step for empty fields
	if (isValidData(valuesObj)){

		let userRecord = function() {
				let record = localStorage.getItem('userRecord');

				if (record === null) {
					localStorage.setItem('userRecord', "[]");
					return [];
				}

				return JSON.parse(record);
			}();

		// Update Local Storage
		userRecord.push(valuesObj);
		localStorage.setItem('userRecord', JSON.stringify(userRecord));
		showTick(); // Show the submitted tick
		//Clear out the fields
		clearFormFields();

		//Update the data section if its open
		if(!data_el.classList.contains('hide')) {
			userRecord = sortUsers(userRecord, sortBy.value, orderBy.value);
			displayData(userRecord);			
		}
	}
});

// Show Details Button Event Listener
showDetailsBtn.addEventListener('click', () => {
	if(data_el.classList.contains('hide')){
		let users = JSON.parse(localStorage.getItem('userRecord'));
		users = sortUsers(users, sortBy.value, orderBy.value)
		displayData(users); // Also sets the button to hide users
		window.scroll({
			top: 600,
			left: 0,
			behavior: "smooth",
		});
	}

	else {
		data_el.classList.add('hide');
		showDetailsBtn.textContent = "Show Users";
	}
});

// Clear Details Button Event Listener
clearDetailsBtn.addEventListener('click', () => {
	if(confirm("Clear the Local Storage?")) {
		// clear the local storage
		localStorage.clear();

		// Collapse the data box if not hidden
		if(!data_el.classList.contains('hide')){
			data_el.classList.add('hide');
			showDetailsBtn.textContent = "Show Users";
		}
	}
});

// Validates the user data fields
function isValidData(valuesObj){
	// Check for Empty fields
	for (const val of Object.values(valuesObj)) {
		if (!val){
			alert('Please Fill Out All Fields!');
			return false;
		}
	}

	// If all good
	return true;

}

// Check whether there is anything to display
function isNotDisplayable(data){
	return (data === null || data.length === 0);
}

function showTick() {
	const tick = document.querySelector('#submitted');
	tick.classList.remove('hide');

	setTimeout(() => {
		tick.classList.add('hide');
	}, 1000);
}

function clearFormFields() {
	document.querySelector('#name').value = "";
	document.querySelector('#age').value = "";
	document.querySelector('#height').value = "";
	document.querySelector('#weight').value = "";
}

// Displays the user data in organised form
function displayData(users) {

	if (isNotDisplayable(users)) {
		alert('No Users in Database!');
	} 
	else {
		console.log("Number of users = " + users.length);

		
		// Set the button to hide user
		showDetailsBtn.textContent = "Hide Users";

		//Add the title
		data_el.innerHTML = '';

		data_el.classList.remove('hide');

		users.forEach((user, idx) => {
			data_el.innerHTML += `<p class="user">USER ${idx+1}</p>`;

			for (const field in user) {
				data_el.innerHTML += `<p class="entry"><span class="entry-title">${field.toUpperCase()} :</span> <span class="entry-field">${user[field]}</span></p>`; 
			}
		});
	}
}