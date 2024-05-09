// const bcrypt = require('bcryptjs');



// // Hashing a password
// bcrypt.hash('myPassword123', 10, function(err, hash) {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log(hash);
//     }
//     // console.log(hash)
// });

// // Verifying a password
// const hashFromDatabase = '$2a$10$Lncsjz0Q7p8nIxZhNXp3WOvxlGsRzU1xtvke34RMLMZtyZQQO7Udm';
// bcrypt.compare('myPassword123', hashFromDatabase, function(err, result) {
//     if (err) {
//         console.error(err);
//     } else if (result) {
//         console.log('It matches!');
//     } else {
//         console.log('Invalid password!');
//     }
//     console.log(result)
// });
const axios = require('axios');

axios.get('https://jsonplaceholder.typicode.com/todos/1')
  .then(function (response) {
    // handle success
    console.log(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
 

