/* global data */
/* exported data */

var $urlInput = document.querySelector('#photo-url');
var $img = document.querySelector('img');

$urlInput.addEventListener('input', function updateImgSource(event) {
  $img.src = $urlInput.value;
});
