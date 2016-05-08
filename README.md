# sbjs
Old school game


Tratto da www.nerdammer.it (http://www.nerdammer.it/2016/02/13/amarcord-e-nuove-sfide/).

...  ricordo di un gioco il cui nome era noto a me come Strike & Ball, gioco che mi ha appassionato sia nella sua implementazione (ne avevo esteso le caratteristiche di base e realizzato una interfaccia molto accattivante per i pochi mezzi disponibili), sia nel suo utilizzo.

Grazie ad Internet (e Wikipedia), inesistente negli anni ’80, scopro che questo glorioso gioco aveva un padre illustre (e non si tratta dell’ovvio Mastermind che deve i suoi natali allo stesso padre).
Si tratta di Bulls and Cows un gioco semplice che può essere giocato tra amici anche semplicemente con carta e penna.
La cosa per me piú affascinante é che il gioco é da ritenersi all’origine del primo “videogioco” della storia: nel 1970 infatti J.M.Grochow al MIT scrisse in PL/1 su Multics (cavolo! il padre di Unix! … quasi una riunione di famiglia!) un programma dal nome moo (esplicativo, no?!) per giocare a Bulls and Cows.

Le regole di gioco (nella versione numerica, ossia quella da cui é derivata la versione del 1970) sono molto semplici.
Si tratta di indovinare in un numero finito di tentativi un numero segreto di 4 cifre; ad ogni tentativo l’avversario (nel nostro caso il computer) indicherà quante cifre sono state individuate nella posizione corretta con il simbolo X (Strike)  e quante invece sono state indicate giuste ma nella posizione errata con il simbolo O (Ball).

Si vince indovinando in numero segreto; si perde esaurendo i tentativi concessi (tipicamente 10).

Sembra facile, ma vi assicuro che consente di impegnare un po’ di “materia grigia”!

Nella versione originale un progamma al calcolatore impiega in media circa 5 tentativi per indovinare il numero segreto! Voi?

Ovviamente si può “alzare l’asticella” elevando il numero di cifre per il numero segreto.

Questa è la implementazione in AngularJS adatta per il Web (o magari standalone grazie a Node.js).


Buon divertimento.
