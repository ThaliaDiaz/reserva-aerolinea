// declarar un array que reprensetará los asientos de nuestro avión con false indicando que esto están vacíos

var airlineSeats = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false
];

// Contador que nos ayudará a rastrear el número de asientos ocupados

var busySeats = 0; 

var paintSeats = function(array) {
  var containerSeats = document.getElementById('seats');

  for (var i = 0; i < array.length; i++) {
    var seat = document.createElement('div');
    seat.className = 'seats';

    // del primer elemento al cuarto, en nuestro arreglo va ser primera clase, que sería desde el indice 0 al 3
    if (i < 4) {
      seat.style.background = 'purple';
    } else {
      seat.style.background = 'yellow';
    }
    containerSeats.appendChild(seat);
  }
};

var reserve = function() {
  var btn = document.getElementById('btn');
  btn.addEventListener('click', chooseZone);
};

var chooseZone = function() {
  var choice = prompt('En qué zona prefieres reservar \n 1. Primera clase \n 2. Económica \n \n Por favor ingresa el número de tu preferencia');

  if (choice == 1) {
    checkFirstClassZone();
  } else if (choice == 2) {
    checkEconomicZone();
  } else {
    alert('Por favor ingresa un númeor válido ');
  }
};

var checkFirstClassZone = function() {
  var zone = 'Primera clase';
  // recorre del elememto 0 al elememto 3 y verifica cuales están disponibles
  for (var index = 0; index < 4; index++) {
    if (airlineSeats[index] == false) {
      airlineSeats[index] = true;
      reserveSeat(index);
      paintTicket(index, zone);
      busySeats++;
      // al reservar un asient ya no necesitamos seguir recorriendo el arreglo
      break;
    } else if (index == 3 && airlineSeats[index] == true) {
      reasignEconomicZone(zone);
    }
  }
};

var reserveSeat = function(indexToPaint) {
  var seat = document.getElementsByClassName('seats');
  seat[indexToPaint].textContent = 'Ocupado';
};


var checkEconomicZone = function() {
  var zone = 'Económica';
  for (var index = 4; index < 10 ; index++) {
    if (airlineSeats[index] == false) {
      airlineSeats[index] = true;
      reserveSeat(index);
      paintTicket(index, zone);
      busySeats++;
      break;
    } else if (index == 9 && airlineSeats[index] == true) {
      reasignFirstClassZone(zone);
    }
  }
};

var reasignEconomicZone = function(zone) {
  if (busySeats == 10) {
    noSeats();
    nextFlight();
  } else {
    var reasign = confirm('Ya no quedan asientos disponibles en' + zone + ' :( \n Quieres reservar en zona económica?');
    if (reasign == true) {
      checkEconomicZone();
    } else {
      nextFlight();
    }
  }
};
var reasignFirstClassZone = function(zone) {
  if (busySeats == 10) {
    noSeats();
    nextFlight();
  } else {
    var reasign = confirm('Ya no quedan asientos en' + zone + ':( \n Quieres reservar asiento en Primera clase?');
    
    if (reasign == true) {
      checkFirstClassZone();
    } else {
      nextFlight();
    }
  }
}; 

var paintTicket = function(index, zone) {
  var containerTickets = document.getElementById('tickets');
  var ticket = document.createElement('div');
  ticket.className = 'seats';
  var title = document.createElement('p');
  var reservedSeating = document.createElement('p');
  var zoneClass = document.createElement('p');
  title.textContent = 'PASE A ABORDAR';
  reservedSeating.textContent = 'Numero de asientos: ' + (index + 1);
  zoneClass.textContent = zone;
  ticket.appendChild(title);
  ticket.appendChild(reservedSeating);
  ticket.appendChild(zoneClass);
  containerTickets.appendChild(ticket);
};

var nextFlight = function() {
  alert('Nuestro próximo vuelo sale en 3 horas');
};

var noSeats = function() {
  alert('Lo sentimos :( \n ya no quedan asientos disponibles en est avión.');
};

paintSeats(airlineSeats);
reserve();

