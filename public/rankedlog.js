function ddragonSearch(name) {
  return `https://ddragon.leagueoflegends.com/cdn/9.10.1/img/champion/${name}.png`;
};

// this function saves a new logEntry to the db, THEN calls getData
function saveNewEntry() {

// get information from the inputs and make date
  var role = document.getElementById('role').value;
  var champion = document.getElementById('champion').value;
  var wl = document.getElementById('wl').checked ? true : false;
  var notes = document.getElementById('notes').value;
  var d = new Date();
  var datestring = (d.getMonth()+1) + "/" + d.getDate();

  
  // save(post) information to DB
  fetch('/save', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }, 
    body: JSON.stringify({
      date: datestring,
      role,
      champion,
      wl,
      notes
    })
  })
   // append information
  .then(getDataAndRenderLogEntries())
  .catch(function(err) { console.log(err) });
 
}

// // create blank entry
// var entry = document.createElement("div");
// entry.setAttribute('class', 'entry');
// var date = document.createTextNode(datestring);
//   entry.appendChild(date);
//   // 

// this function should pull all games from the db and display them in the "log" div
// bugs: 1. needs to clear all old entries before posting new ones so that there aren't duplicates.
// 2: its appending object Object - not handling data correctly.

function getDataAndRenderLogEntries() {
  console.log("test")
  var target = document.getElementById("log");
  while (target.firstChild) {
    target.removeChild(target.firstChild);
}
  fetch('/load', {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(function (response) {
    return response.json();
  })
  .then(function (response) {
    for (var i = 0; i < response.length; i++) {
      var newEntry = document.createElement('div');
      newEntry.setAttribute('class', 'entry');

      var date = document.createTextNode(response[i].date);
      newEntry.appendChild(date);

      var role = document.createTextNode(response[i].role);
      newEntry.appendChild(role);

      var champion = document.createElement("img");
      champion.setAttribute('src', ddragonSearch(response[i].champion));
      newEntry.appendChild(champion);

      if (response[i].wl === true) {
        newEntry.setAttribute('class', 'win');
      } else {
        newEntry.setAttribute('class', 'lose')
      }

      var notes = document.createElement('div');
      notes.setAttribute('class', 'text');

      var notesTextNode = document.createTextNode(response[i].notes);
      notes.appendChild(notesTextNode);
      newEntry.appendChild(notes);
      target.appendChild(newEntry);
    }
  })
  .catch(function(err) { console.log(err) });
}
