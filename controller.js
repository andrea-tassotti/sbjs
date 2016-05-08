/*
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 *    Copyrights (C) 2016 Andrea Tassotti
 */

/* Le stringhe sono oggetti immutabili
 * Mediante il prototipo possiamo alterare il tipo String
 * a nostro favore introducendo un nuovo metodo che ci consenta
 * di avere un tipo MutableString (simulato)
 */
String.prototype.replaceAt = function(index, character) {
	return this.substr(0,index) + character + this.substr(index+character.length);
}


/**
 *	Il controller
 */
angular.module('strikeball', []).controller('sb_controller', ['$scope' ,function($scope)
{
	$scope.len=4;
	$scope.max_risposte=10;
	$scope.punteggio=0;
	$scope.showoptions=false;
	$scope.debug = false;

	// Statistiche (TODO: registrare nel backend o localstorage)
	$scope.vittorie = 0;
	$scope.sconfitte = 0;
	$scope.rese = 0;
	$scope.migliore = -1;
	$scope.peggiore = 0;
	$scope.tempo = 0;	// media
	$scope.endTime = null;
	
	// Inject Math
	$scope.Math = window.Math;

/**
 *	Verifica la scommessa utente
 *
 */
$scope.verifica = function()
{
	var match="";
	var tmp = $scope.risposta;
	var matchcount=0;
	var reale = $scope.nascosto;
	
	// Ricerca strike (prioritaria)
	for(i=0; i < reale.length; i++)
			if ( reale.charAt(i) == $scope.risposta.charAt(i) )
			{
				match += 'X';
				matchcount++;
				reale = reale.replaceAt(i, ' ');
				tmp = tmp.replaceAt(i, '-');

			}
	// Ricerca ball
	for(i=0; i < reale.length; i++)
		for(j=0; j < tmp.length; j++)
			if ( reale.charAt(i) != ' ' && reale.charAt(i) == tmp.charAt(j) && i != j )
			{
				match += 'O';
				reale = reale.replaceAt(i, ' ');
				tmp = tmp.replaceAt(j, '-');
			}

	$scope.risposte.push({ "utente": $scope.risposta, "match": match, "win": $scope.win });

	if ( matchcount >= reale.length )
	{
		$scope.punteggio += 1 / $scope.risposte.length * $scope.max_risposte;
		$scope.vittorie += 1;
		if ( $scope.migliore > $scope.risposte.length )
			$scope.migliore = $scope.risposte.length;
		if ( $scope.peggiore < $scope.risposte.length )
			$scope.peggiore = $scope.risposte.length;
		$scope.endTime = new Date();
		var numero_partite = $scope.vittorie + $scope.sconfitte + $scope.rese;
 		$scope.tempo += $scope.endTime - $scope.startTime;
		if ( numero_partite >= 2) $scope.tempo =  $scope.tempo / 2;
		$scope.win = true;	// Non anticipare per non sommare il tempo animazione
		return;
	}

	if ( $scope.risposte.length >= $scope.max_risposte)
	{
		$scope.win = false;
		$scope.punteggio -= 10;
		$scope.sconfitte += 1;
		$scope.peggiore = $scope.max_risposte;
		$scope.endTime = new Date();
	}
	
}


/**
 *	Genera un numero di lunghezza data
 */
$scope.genera = function()
{
	$scope.nascosto = "";
	for(i=1;i<=$scope.len;i++)
		$scope.nascosto += Math.floor(Math.random()*9);
}

/**
 */
$scope.nuova = function()
{
	$scope.win=null;
	$scope.genera();
	$scope.risposta='';
	$scope.risposte=[];
	$scope.startTime = new Date();
	$scope.endTime = null;
}

/**
 */
$scope.resa = function()
{
	$scope.punteggio = $scope.punteggio - 10;
	$scope.rese += 1;
	$scope.peggiore = $scope.max_risposte;
	$scope.endTime = new Date();
	var numero_partite = $scope.vittorie + $scope.sconfitte + $scope.rese;
	$scope.tempo += $scope.endTime - $scope.startTime;
	if ( numero_partite >= 2) $scope.tempo =  $scope.tempo / 2;
	$scope.win = false;	// Non anticipare per non sommare il tempo animazione
}
 

// Prima esecuzione
$scope.nuova();

}])

	// From AngularJS $interval documentation
    // Register the 'myCurrentTime' directive factory method.
    // We inject $interval and dateFilter service since the factory method is DI.
    .directive('myCurrentTime', ['$interval', 'dateFilter',
      function($interval, dateFilter) {
        // return the directive link function. (compile function not needed)
        return function(scope, element, attrs) {
          var timer; // so that we can cancel the time updates

          // used to update the UI
          function updateTime() {
			var now = scope.endTime;
			if ( scope.endTime === null)	now = new Date();

				now = new Date(now - scope.startTime - 1 * 60 * 60 * 1000  )
            element.text(dateFilter(now, 'H') + ' ore ' + 
						 dateFilter(now, 'm') + ' min e ' + 
						 dateFilter(now, 's') + ' sec');
          }

	// Prima esecuzione
	  updateTime();
          timer = $interval(updateTime, 1000);

          // listen on DOM destroy (removal) event, and cancel the next UI update
          // to prevent updating time after the DOM element was removed.
          element.on('$destroy', function() {
            $interval.cancel(timer);
          });
        }
      }]);
