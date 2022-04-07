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
  userInput.entryId = data.nextEntryId;
  ++data.nextEntryId;
  data.entries.push(userInput);
  img.setAttribute('src', 'images/placeholder-image-square.jpg');
  form.reset();
  $formContainer.className = 'container ' + 'hidden';
  $entryContainer.className = 'container';
  data.view = 'entries';
  $ul.prepend(returnDomTree(userInput));
});

function returnDomTree(entry) {
  var $li = document.createElement('li');
  var imgColumnHalf = document.createElement('div');
  var $img = document.createElement('img');
  var textColumnHalf = document.createElement('div');
  var $h3 = document.createElement('h3');
  var $p = document.createElement('p');
  var $row = document.createElement('div');
  var $icon = document.createElement('i');
  var $titleRow = document.createElement('div');
  var $notesRow = document.createElement('div');
  $notesRow.setAttribute('class', 'row');
  $titleRow.setAttribute('class', 'row flex');
  $row.setAttribute('class', 'row');
  imgColumnHalf.setAttribute('class', 'column-half');
  textColumnHalf.setAttribute('class', 'column-half');
  $img.setAttribute('src', entry.url);
  $icon.setAttribute('class', 'fas fa-pen fa-xl');
  $h3.setAttribute('class', 'inline');
  $li.setAttribute('data-entry-id', entry.entryId);
  $h3.textContent = entry.title;
  $p.textContent = entry.notes;
  $li.appendChild($row);
  $row.appendChild(imgColumnHalf);
  $row.appendChild(textColumnHalf);
  imgColumnHalf.appendChild($img);
  textColumnHalf.appendChild($titleRow);
  $titleRow.appendChild($h3);
  $titleRow.appendChild($icon);
  $notesRow.appendChild($p);
  textColumnHalf.appendChild($notesRow);
  return $li;
}
var $ul = document.querySelector('ul');

document.addEventListener('DOMContentLoaded', function (event) {
  for (var i = data.entries.length - 1; i >= 0; i--) {
    var $entry = returnDomTree(data.entries[i]);
    $ul.appendChild($entry);
  }
});

var $entryButton = document.querySelector('#entry-button');
var $entryContainer = document.querySelector('#entry-container');
var $formContainer = document.querySelector('#form-container');
var $newEntryButton = document.querySelector('#new-entry');

$entryButton.addEventListener('click', function click() {
  $formContainer.className = 'container ' + 'hidden';
  $entryContainer.className = 'container';
  data.view = 'entries';
}
);

$newEntryButton.addEventListener('click', function click(event) {
  $entryContainer.className = 'container ' + 'hidden';
  $formContainer.className = 'container';
  data.view = 'entry-form';
});

document.addEventListener('DOMContentLoaded', function (event) {
  if (data.view === 'entries') {
    $formContainer.className = 'container ' + 'hidden';
    $entryContainer.className = 'container';
  } else {
    $entryContainer.className = 'container ' + 'hidden';
    $formContainer.className = 'container';
  }
});

$ul.addEventListener('click', function (event) {
  if (event.target.matches('i')) {
    $entryContainer.className = 'container ' + 'hidden';
    $formContainer.className = 'container';
    var $closest = event.target.closest('li');
    for (var i = 0; i < data.entries.length; i++) {
      if ($closest.getAttribute('data-entry-id') === data.entries[i].entryId.toString()) {
        var title = document.querySelector('#title');
        var notes = document.querySelector('#notes');
        data.editing = data.entries[i];
        img.src = data.editing.url;
        url.textContent = data.editing.url;
        title.textContent = data.editing.title;
        notes.textContent = data.editing.notes;
        notes.write();
      }
    }
  }
});
