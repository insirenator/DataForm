// THE MAIN SCRIPT

// HTML Elements
const form = document.querySelector('#data-form');
const data_el = document.querySelector('.data');
const submitBtn = document.querySelector('#submit-btn');
const showDetailsBtn = document.querySelector('#show-users');
const clearDetailsBtn = document.querySelector('#clear-users');

const filterBar = `
<div class="filter-bar">

	<p class="filter-labels">FILTERS</p>
	<div class="filters">
	<div class="filter-field">
	<p class="field-name">Age</p>
	<select name="age" id="age" class="field field0">
		<option selected value="">none</option>
		<option value="below18"><18</option>
		<option value="from18to25">18-25</option>
		<option value="above25">>25</option>
	</select>
	</div>

	<div class="filter-field">
	<p class="field-name">Height (cms)</p>
	<select name="age" id="age" class="field field0">
		<option selected value="">none</option>
		<option value="below160"><160</option>
		<option value="from160to180">160-180</option>
		<option value="above180">>180</option>
	</select>
	</div>

	<div class="filter-field">
	<p class="field-name">Weight (kgs)</p>
	<select name="age" id="age" class="field field0">
		<option selected value="">none</option>
		<option value="below60"><60</option>
		<option value="from60to100">60-100</option>
		<option value="above100">>100</option>
	</select>
	</div>
	</div>
</div>
`

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
	}
});

// Show Details Button Event Listener
showDetailsBtn.addEventListener('click', () => {
	if(data_el.classList.contains('hide')){
		displayData(); // Also sets the button to hide users
		window.scroll({
			top: 780,
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

// Displays the user data in organised form
function displayData() {

	let users = JSON.parse(localStorage.getItem('userRecord'));

	if (isNotDisplayable(users)) {
		alert('No Users in Database!');
	} 
	else {
		console.log("Number of users = " + users.length);
		
		// Set the button to hide user
		showDetailsBtn.textContent = "Hide Users";

		//Add the title
		data_el.innerHTML = '<h3 id="data-title">USER DETAILS</h3>';
		// Add the filter bar
		data_el.innerHTML += filterBar;

		data_el.classList.remove('hide');
		users.forEach((user, idx) => {
			data_el.innerHTML += `<p class="user">USER ${idx+1}</p>`;

			for (const field in user) {
				data_el.innerHTML += `<p class="entry"><span class="entry-title">${field.toUpperCase()} :</span> <span class="entry-field">${user[field]}</span></p>`; 
			}
		});
	}
}