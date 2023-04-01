function isANumber(num) {
	return /^\d+$/.test(num) && (num > 0);
}

const checkNumber = (element, elementError) => {
	const enteredVal = element.value;

	if(!isANumber(enteredVal)) {
		if(elementError.classList.contains('hide'))
			elementError.classList.remove('hide');
		element.style.border = "1px solid red";
	}
	else {
		elementError.classList.add('hide');
		element.style.border = "none";
	}
};

// On Spot Age, Height and Weight Check
const age = document.querySelector('#age');
const height = document.querySelector('#height');
const weight = document.querySelector('#weight');

const ageError = document.querySelector('#age-error');
const heightError = document.querySelector('#height-error');
const weightError = document.querySelector('#weight-error');

age.addEventListener('blur', () => checkNumber(age, ageError));
height.addEventListener('blur', () => checkNumber(height, heightError));
weight.addEventListener('blur', () => checkNumber(weight, weightError));

// On Spot Name Check
const name = document.querySelector('#name');
const nameError = document.querySelector('#name-error');

name.addEventListener('blur', () => {
	if(!name.value){
		if(nameError.classList.contains('hide'))
			nameError.classList.remove('hide');
		name.style.border = "1px solid red";
	}
	else {
		nameError.classList.add('hide');
		name.style.border = "none";
	}
});