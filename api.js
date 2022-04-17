// JSON object notation.
// Some background: the data is in .json format. It contains three arrays (info, results, [[prototype]])

/* Vanilla format */

/* fetch("https://randomuser.me/api/?results=10")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  }); */

/* Vanilla format, explained */

/* fetch("https://randomuser.me/api/?results=10")
  .then((response) => response.json()) // this line seems to tell the code to read the code in .json format.
  .then((data) => {
    console.log(data);
  }); // This line tells the code to do something. Only the part in {} should be modifiable. */

/* Narrowing down output to 'data.results'. Note that 'results' is a subset of 'data'. And note that 'data' is an arbitrary name defined in the antecedent of the function. */

/* fetch("https://randomuser.me/api/?results=10")
  .then((response) => response.json())
  .then((data) => {
    console.log(data.results);
  }); */

/* This pulls up more specific data: 
(a) Logs data.results
(b) for all elements of the array, log first name. */

/* fetch("https://randomuser.me/api/?results=10")
  .then((response) => response.json())
  .then((data) => {
    console.log(data.results);
    const users = data.results;
    for (var x = 0; x < users.length; x++) {
      const user = users[x];
      console.log(user.name.first);
    }
  }); */

/* This pulls up more specific data: 
(c) Log both first AND last name */

/* fetch("https://randomuser.me/api/?results=10")
  .then((response) => response.json())
  .then((data) => {
    console.log(data.results);
    const users = data.results;
    for (var x = 0; x < users.length; x++) {
      const user = users[x];
      console.log(user.name.first, user.name.last);
    }
  }); */

/* How to put this data into an html table: 
  https://www.youtube.com/watch?v=J3iH2pc2q0s ~52.00, the function
  
  */

let allUsers = [];
let table = document.getElementById("table");

fetch("https://randomuser.me/api/?results=10")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    console.log(data.results);
    allUsers = data.results;
    tableMaker(allUsers);
  });

// Now we make a function to do all the work.

function tableMaker(allUsers) {
  let allMarkup = "";
  for (var x = 0; x < allUsers.length; x++) {
    let user = allUsers[x];
    console.log(user.name.first, user.name.last);
    let markup = `<tr>
    <td> ${user.name.first} </td>
    <td> ${user.name.last} </td>
    <td> ${user.location.street.number}, ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.postcode} </td>
    <td></td>
    <tr>`;
    console.log(markup);
    allMarkup += markup;
  }

  let tableHTML = `
  <thead>
  <tr>
  <td>First Name:</td>
  <td>Last Name:</td>
  <td>Address:</td>
  </tr>
  </thead>
  <tbody>${allMarkup}</tbody>
  `;
  table.innerHTML = tableHTML;
}
