/* global data */
/* exported data */

var url = document.querySelector('#photo-url');
var img = document.querySelector('img');

url.addEventListener('input', function updateImgSource(event) {
  img.src = url.value;
});

var form = document.querySelector('form');

form.addEventListener('submit', function (event) {
  event.preventDefault();
  var userInput = {};
  userInput.title = form.elements.title.value;
  userInput.url = form.elements.url.value;
  userInput.notes = form.elements.notes.value;
  userInput.entryId = data.entries.length + 1;
  ++data.nextEntryId;
  data.entries.push(userInput);
  img.setAttribute('src', 'images/placeholder-image-square.jpg');
  form.reset();
});
