var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");
var intervalId;
var t = 0;
var cleared = false;
var mancare = 0;
var pesti = 12;

c.fillStyle = "White";
c.fillRect(0, 0, canvas.width, canvas.height);
c.lineWidth = 2;
c.strokeStyle = "tan";

//prin asta se genereaza la intamplare barile
var numere = [];
var nrGasite = 0;

for (var i = 0; i < 133; i++) {
  numere.push(Math.floor((Math.random() * 310) + 1));
}
showArray();

//functia prin care porneste sortarea la apasarea butonului "Sort"
function start() {
  document.getElementById("sortButton");
  intervalId = setInterval(function start() {
    mergeSort(numere);
    showArrayAnimated();
  }, 100);
}

function clear() {
  c.save();
  c.fillStyle = "CadetBlue";
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.restore();
}

function selSortStep() {
  numere.sort();
}

//functia MergeSort
function mergeSort(elemente) {

  if (elemente.length < 2) {
    return elemente;
  }

  var centru = Math.floor(elemente.length / 2),
    stanga = elemente.slice(0, centru),
    dreapta = elemente.slice(centru),
    parametri = merge(mergeSort(stanga), mergeSort(dreapta));

  parametri.unshift(0, elemente.length);
  elemente.splice.apply(elemente, parametri);
  return elemente;
}

function merge(stanga, dreapta) {
  var rezultat = [],
    istanga = 0,
    idreapta = 0;

  while (istanga < stanga.length && idreapta < dreapta.length) {
    if (stanga[istanga] < dreapta[idreapta]) {
      rezultat.push(stanga[istanga++]);
    } else {
      rezultat.push(dreapta[idreapta++]);
    }
  }

  return rezultat.concat(stanga.slice(istanga)).concat(dreapta.slice(idreapta));
}

function drawLines(iteration) {
  c.beginPath();
  c.moveTo(iteration * 4 + 2, 310);
  c.lineTo(iteration * 4 + 2, 310 - numere[iteration]);
  c.stroke();
}
//functia care multiplica liniile
function showArray() {
  clear();
  for (var i = 0; i < numere.length; i++) {
    drawLines(i);
  }
}

function beginDraw() {
  if (t < numere.length) {
    requestAnimationFrame(beginDraw);
  } else {
    clearInterval(intervalId);
    return;
  }

  drawLines(t);

  t++;
}
//functia care animeaza sortarea
function showArrayAnimated() {
  if (!cleared) {
    clear();
    cleared = true;
  }

  beginDraw();
}
