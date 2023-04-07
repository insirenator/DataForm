const sortBy = document.querySelector('#sort');
const orderBy = document.querySelector('#order');

function sortUsers(users, sortBy, orderBy) {
	if (sortBy === "name") {
		users.sort( (a, b) => {
			if (orderBy === "1") {
				return (a[sortBy] < b[sortBy])? -1 : 1;
			}
			else {
				return (a[sortBy] > b[sortBy])? -1 : 1;
			}
		});
	}

	else {
		users.sort( (a, b) => {
			if (orderBy === "1") {
				return parseInt(a[sortBy]) - parseInt(b[sortBy]);
			}
			else {
				return parseInt(b[sortBy]) - parseInt(a[sortBy]);
			} 
		});
	}
	console.log("sorted!");
	console.log(users);
	return users;
}

sortBy.addEventListener('change', () => {
	let users = JSON.parse(localStorage.getItem('userRecord'));
	users = sortUsers(users, sortBy.value, orderBy.value);
	displayData(users);
});

orderBy.addEventListener('change', () => {
	let users = JSON.parse(localStorage.getItem('userRecord'));
	users = sortUsers(users, sortBy.value, orderBy.value);
	displayData(users);
});