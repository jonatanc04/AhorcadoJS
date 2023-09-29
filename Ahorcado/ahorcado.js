var comp;
var easy = ["MASA", "COME", "AZUL"];
var medium = ["LLAVE", "CAMISA", "CASCO"];
var hard = ["ORDENADOR", "AURICULAR", "MASTODONTE"];
var datos = [];

let add = "";
let show = "Introduce una nueva palabra o STOP para volver al menú.";

// -------------------------- JUEGO --------------------------

showMenu();

// ------------------------ FUNCIONES ------------------------

// Esta función se encarga de enseñar el menú del juego

function showMenu() {

    console.log("¡Bienvenido al juego del ahorcado!");
    console.log("¿Quieres jugar o quieres introducir palabras?");
    console.log("Pulsa ENTER para jugar y ESPACIO para añadir palabras");
    menuAction();

}

// Esta función sirve para seleccionar las opciones del menú

function menuAction() {

    document.addEventListener("keydown", function(event) {
        if(event.key === "Enter") {

            game();

        } else if (event.key === " ") {

            addWords();

        }

    });

}

// Esta función contiene el juego del ahorcado en si

function game() {

    console.clear();

    let letters = new Array();
    let wordToPlay;
    let occultWord;
    let letter;
    let lives = 6;
    let win = false;

    let playerName = prompt("Introduce tu nombre de jugador: ");
    let selDiff = selectDifficult();

    switch (selDiff) {
        case 'F':
            wordToPlay = giveWord(easy);
            break;
        case 'M':
            wordToPlay = giveWord(medium);
            break;
        case 'D':
            wordToPlay = giveWord(hard);
            break;
    }

    occultWord = occult(wordToPlay);
    let init = '';
    let er = '';

    while (init != 'GO') {

        init = prompt (er + "Introduce GO para comenzar a jugar").toUpperCase();
        er = 'Error. '

    }

    const inicio = performance.now();

    while (!win && lives > 0) {

        letter = introLetter (playerName, occultWord, lives, letters);

        if (letterIt (wordToPlay, letter)) {

            occultWord = notOccult(occultWord, wordToPlay, letter);

        } else {

            lives--;
            
        }

        letters.push(letter);

        if (occultWord == wordToPlay) {
            win = true;
        }

    }

    const final = performance.now();
    const tiempoEjecucion = (final - inicio)/1000;
    let aux = playerName + ' ' + selDiff + ' ' + wordToPlay + ' ' + tiempoEjecucion;

    if (win) {
        datos.push(aux);
        finalJuego(datos);
    } else {
        console.log('Has perdido\n\n');
        showMenu();
    }

}

/*

Esta función muestra el final del juego solamente si has ganado

*/

function finalJuego (datos) {

    let bye = '';
    let aux = '';

    for (let i = 0; i < datos.length; i++) {
        aux += datos[i] + '\n';
    }

    do {

        bye = prompt('Clasificación de tiempos\n\n' + aux + '\n\nIntroduce BYE para volver al menú principal').toUpperCase();

    } while (bye != 'BYE');

    showMenu();

}

/* 

Esta función se encarga mostrar en pantalla los datos del juego y 
de comprobar que se introduzca una letra

*/

function introLetter (playerName, oc, lives, letters) {

    let add = '';
    let txt = 'Introduce una letra: ';
    let letter = '';

    do {

        letter = prompt('Nombre del jugador: ' + playerName + '\n' + '\n' + 
        showGame(oc, lives) + '\n' + '\n' + add + txt).toUpperCase();

        add = '¡Error al introducir la letra!';

    } while (!compLetter(letter, letters));

    return letter;

}

// Esta función sustituye los * por la letra acertada

function notOccult(occ, word, lett) {

    let aux = '';

    for (let i = 0; i < word.length; i++) {

        if (/^[A-ZÑ]+$/.test(occ.charAt(i))) {
            aux += occ.charAt(i);
        } else if (word.charAt(i) === lett) {
            aux += lett;
        } else {
            aux += '*';
        }

    }

    return aux;

}

// Esta función comprueba que la letra esté dentro de la palabra

function letterIt (word, lett) {

    let i = 0;
    let hit = false;

    while (!hit && i < word.length) {

        if (word.charAt(i) == lett) {
            hit = true;
        }

        i++;

    }

    return hit;

}

/*

Esta función sirve para comprobar que el valor introducido es una letra
o si esta ya se ha introducido anteriormente por teclado

*/

function compLetter (lett, arr) {

    if (!arr.includes(lett)) {

        if (/^[A-ZÑ]+$/.test(lett)) {
            return true;
        } else {
            return false;
        }

    } else {
        return false;
    }

}

// Esta función se encarga de ocultar la palabra con la que vamos a jugar

function occult (word) {

    let aux = '';

    for (let i = 0; i < word.length; i++) {
        aux += '*';
    }

    return aux;

}

//Esta función irá mostrando como vamos en el juego

function showGame (occult, lives) {

    let show = '';

    for (let i = 0; i < occult.length; i++) {
        show += occult.charAt(i) + ' ';
    }

    return 'Vidas resantes: ' + lives + '\n' + show;

}

// Esta función sirve para seleccionar la dificultad del juego

function selectDifficult() {

    let diff;
    let add = '';
    let txt = 'Selecciona la dificultad:\n\nF - Fácil\nM - Media\nD - Difícil';

    do {

        diff = prompt(add + txt,'').toUpperCase();
        add = '¡Error en la selección! ';

    } while (!comprobeDiff(diff));

    return diff;

}

/* 

Esta sirve de apoyo a la anterior función, para comprobar que la dificultad introducida 
sea correcta

*/

function comprobeDiff(diff) {

    if (diff === 'F' || diff === 'M' || diff === 'D') {
        return true;
    } else {
        return false;
    }

}

/*

Dentro de esta función tenemos el apartado de añadir palabras a los diferentes vectores
del juego, uno para dificultad fácil, otro para dificultad media y otro para la difícil.

*/

function addWords() {

    console.clear();
    let word = "";
    
    do {

        word = prompt(add + show).toUpperCase();
        
        if (word != "STOP") {
            
            while (isIn(word) == 1) {
                word = prompt("¡Esa palabra es incorrecta, introduce otra!").toUpperCase();
            }

        }

        putInSelectedDiff(word);
        add = "¡Palabra introducida con éxito! ";

    } while (word != "STOP");

    console.clear();
    showMenu();

}

// Esta función se encarga que introducir la palabra en la categoría a la que esta pertenezca.

function putInSelectedDiff (word) {

    let len = word.length;

    if (len <= 4) {
        easy.push(word);
    } else if (len >= 5 && len <= 7) {
        medium.push(word);
    } else {
        hard.push(word);
    }
}

// Esta función es para filtrar la comprobación de la palabra dependiendo su categoría.

function isIn (word) {

    let len = word.length;

    if (len <= 4) {
        return comprobe(word, easy);
    } else if (len >= 5 && len <= 7) {
        return comprobe(word, medium);
    } else {
        return comprobe(word, hard);
    }

}

/* 

Esta función comprueba que la palabra que le mandes no contenga carácteres diferentes a
letras mayúsculas, que la palabra no se encuentre en el array que le mandes y que, a su 
vez, no sea STOP.

*/

function comprobe(word, arr) {

    let i = 0;
    let arrLen = arr.length;
    comp = 0;

    if (word == "STOP") {
        comp = 1;
    }

    if (/^[A-ZÑ]+$/.test(word)) {
        comp = 0;
    } else {
        comp = 1;
    }

    while (comp != 1 && i < arrLen) {

        if (word == arr[i]) {
            comp = 1;
        }

        i++;

    }
    
    return comp;

}

// Esta función devuelve una palabra aleatoria del vector que le pases

function giveWord(arr) {

    let all = arr.length;
    let i = Math.floor(Math.random() * all);

    return arr[i];

}