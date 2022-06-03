/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./www/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./www/js/controller.js":
/*!******************************!*\
  !*** ./www/js/controller.js ***!
  \******************************/
/*! exports provided: init */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony import */ var _model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model.js */ "./www/js/model.js");
////////////////////////////////////////////////////////////////////////////////
// Module Controleur contient :
// - un objet session contenant les données modélisant l'état de l'application
// - une fonction "init" pour initialiser l'application
// - une classe "controller" abstraite pour chaque page
////////////////////////////////////////////////////////////////////////////////

 // le contrôleur utilise le modèle

////////////////////////////////////////////////////////////////////////////////
// Session : variables qui représentent l'état de l'application
////////////////////////////////////////////////////////////////////////////////

var session = {
    players: [], // Les joueurs
    currentPlayer: null, // Le joueur courant
    partieEnCours: null  // La partie en train d'être jouée
};

////////////////////////////////////////////////////////////////////////////////
// init : exécutée au démarrage de l'application (voir fichier index.js)
////////////////////////////////////////////////////////////////////////////////

function init() {
    // On duplique Header et Footer sur chaque page (sauf la première !)
    var $header = $('#tictactoeHeader');
    var $footer = $('#tictactoeFooter');
    $('div[data-role="page"]').each(function (i) {
        if (i) {
            var $content = $(this).children(":first");
            $header.clone().insertBefore($content);
            $content.after($footer.clone());
        }
    });
    // On initialise les pages (attacher les "handlers" d'événements propres à chaque page)
    VueAccueilController.setEvents();
    VueJeuController.setEvents();
    VueFinController.setEvents();
    // On navigue vers la page d'accueil
    $.mobile.changePage("#vueAccueil");
}

////////////////////////////////////////////////////////////////////////////////
// Controleurs de pages : 1 contrôleur par page, qui porte le nom de la page
//  et contient les "handlers" des événements associés à cette page
////////////////////////////////////////////////////////////////////////////////

class VueAccueilController {

    static setEvents() { // définition des "handlers" d'événements sur la page
        $(document).on("pagebeforeshow", "#vueAccueil", function () { this.init(); }.bind(this));
        $("#btnNouvellePartie").on("click", function () { this.nouvellePartie(); }.bind(this));

        $("#nomJoueur1").on("input", function () { this.chargeJoueur1(); }.bind(this));
        $("#nomJoueur2").on("input", function () { this.chargeJoueur2(); }.bind(this));

        $("#btnPhoto1").on("click", function () { this.prendrePhoto1(); }.bind(this));
        $("#btnPhoto2").on("click", function () { this.prendrePhoto2(); }.bind(this));
    }

    static init() { // initialisation de la page
        $("#nomJoueur").val("");
        $("#imgPhoto").attr("src", "");
    }

    static chargeJoueur1() {
        var nom = $("#nomJoueur1").val();
        var allPlayers = _model_js__WEBPACK_IMPORTED_MODULE_0__["PlayersDAO"].getAllPlayers();
        var joueur = _model_js__WEBPACK_IMPORTED_MODULE_0__["PlayersUtils"].findPlayerByNameInArray(allPlayers, nom);
        if (joueur) {
            session.currentPlayer = joueur;
            $("#imgPhoto1").attr("src", joueur.picture);
        } else {
            session.currentPlayer = new _model_js__WEBPACK_IMPORTED_MODULE_0__["Player"](nom);
            $("#imgPhoto1").attr("src", "");

            session.players.push(session.currentPlayer);
        }
    }

    static chargeJoueur2() {
        var nom = $("#nomJoueur2").val();
        var allPlayers = _model_js__WEBPACK_IMPORTED_MODULE_0__["PlayersDAO"].getAllPlayers();
        var joueur = _model_js__WEBPACK_IMPORTED_MODULE_0__["PlayersUtils"].findPlayerByNameInArray(allPlayers, nom);
        if (joueur) {
            session.currentPlayer = joueur;
            $("#imgPhoto2").attr("src", joueur.picture);
        } else {
            session.currentPlayer = new _model_js__WEBPACK_IMPORTED_MODULE_0__["Player"](nom);
            $("#imgPhoto2").attr("src", "");

            session.players.push(session.currentPlayer);
        }
    }

    static nouvellePartie() {
        // on récupère de l'information de la vue en cours
        var nomJoueur1 = $("#nomJoueur1").val();
        var nomJoueur2 = $("#nomJoueur2").val();
        if (nomJoueur1 === "" || nomJoueur2 === "") {
            plugins.toast.showShortCenter("Saisir un nom de joueur");
        } else {

            var player1 = session.players[0];
            var player2 = session.players[1];
            // On utilise le modèle pour créer une nouvelle partie
            session.partieEnCours = new _model_js__WEBPACK_IMPORTED_MODULE_0__["TicTacToe"](player1, player2); // charge la partie du joueur depuis le localstorage
            // On "propage" le nom du joueur1 sur toutes les vues
            $('span[data-role="nomJoueur1"]').each(function () {
                $(this).html(player1.name);
            });
            // On "propage" la picture du joueur sur toutes les vues
            $('img[data-role="pictureJoueur1"]').each(function () {
                $(this).attr("src", player1.picture);
            });

            // On "propage" le nom du joueur2 sur toutes les vues
            $('span[data-role="nomJoueur2"]').each(function () {
                $(this).html(player2.name);
            });
            // On "propage" la picture du joueur sur toutes les vues
            $('img[data-role="pictureJoueur2"]').each(function () {
                $(this).attr("src", player2.picture);
            });
            // Et on passe à une autre vue
            $.mobile.changePage("#vueJeu");
        }
    }

    static prendrePhoto1() {
        _model_js__WEBPACK_IMPORTED_MODULE_0__["CordovaAPI"].takePicture()
            .then(imageData => {
                session.currentPlayer.picture = "data:image/jpeg;base64," + imageData;
                $("#imgPhoto1").attr("src", session.currentPlayer.picture);
            })
            .catch(err => {
                session.currentPlayer.picture = "";
                $("#imgPhoto1").attr("src", "");
                plugins.toast.showShortCenter("Echec Photo : " + err.message);
            });
    }

    static prendrePhoto2() {
        _model_js__WEBPACK_IMPORTED_MODULE_0__["CordovaAPI"].takePicture()
            .then(imageData => {
                session.currentPlayer.picture = "data:image/jpeg;base64," + imageData;
                $("#imgPhoto2").attr("src", session.currentPlayer.picture);
            })
            .catch(err => {
                session.currentPlayer.picture = "";
                $("#imgPhoto2").attr("src", "");
                plugins.toast.showShortCenter("Echec Photo : " + err.message);
            });
    }
}

////////////////////////////////////////////////////////////////////////////////
class VueJeuController {

    static setEvents() { // définition des "handlers" d'événements sur la page
        $(document).on("pagebeforeshow", "#vueJeu", function () { this.init(); }.bind(this));
        $(".cell").on("click", function () { this.play(event.target.id); }.bind(this));

        $("#btnFinPartie").on("click", function () { this.finPartie(); }.bind(this));
    }

    static init() { // initialisation de la page
        // on active et on montre tous les boutons du joueur
        $("button[id^=btnJouer]").prop('disabled', false).show();
        // on cache toutes les réponses de la machine
        $("img[id^=machine]").hide();
        // on cache la div resultat
        $("#resultat").hide();
    }

    static play(playedId) { // le joueur a choisi son coup
        // On interroge le modèle pour voir le résultat du nouveau coup
        this.nouveauCoup(playedId);
        // Et on met à jour la vue :
        // 1. on désactive le bouton cliqué par le joueur et on cache les autres boutons
        $(`#${playedId}`).prop('disabled', true);
        $(`#${playedId}`).append(`<img src="${session.currentPlayer.picture}" alt="${session.currentPlayer.name}" class="img-circle" style="width: 100px; height:100px;" />`);

        // 2. on regarde si la partie est finie
        if (session.partieEnCours.isWin()) {
            console.log("win");
            // model.PlayersDAO.saveJoueur(session.partieEnCours.joueur);
        }
        else if (session.partieEnCours.isDrawn()) {
            console.log("draw");
            // model.PlayersDAO.saveJoueur(session.partieEnCours.joueur);
        }
        else { console.log("continue"); }

        // 2. on change de joueur
        session.partieEnCours.switchCurrentPlayer();
        session.currentPlayer = session.partieEnCours.currentPlayer;
        
        // 3. on prépare un nouveau coup
        this.nouveauCoup();
    }

    static nouveauCoup() {
        this.init();
    }

    static finPartie() {
        $.mobile.changePage("#vueFin");
    }
}

////////////////////////////////////////////////////////////////////////////////
class VueFinController {

    static setEvents() { // définition des "handlers" d'événements sur la page
        $(document).on("pagebeforeshow", "#vueFin", function () { this.init(); }.bind(this));
        $("#btnRetourJeu").on("click", function () { this.retourJeu(); }.bind(this));
        $("#btnSupprimer").on("click", function () { this.supprimerJoueur(); }.bind(this));
        $("#btnRetourAccueil").on("click", function () { this.retourAccueil(); }.bind(this));
    }

    static init() { // initialisation de la page
        $("#nbVictoires").html(session.partieEnCours.joueur.victoires);
        $("#nbNuls").html(session.partieEnCours.joueur.nuls);
        $("#nbDefaites").html(session.partieEnCours.joueur.defaites);
    }

    static retourJeu() {
        $.mobile.changePage("#vueJeu");
    }

    static supprimerJoueur() {
        _model_js__WEBPACK_IMPORTED_MODULE_0__["PlayersDAO"].removeJoueur(session.partieEnCours.joueur.nom);
        this.retourAccueil();
    }

    static retourAccueil() {
        $.mobile.changePage("#vueAccueil");
    }
}

/***/ }),

/***/ "./www/js/index.js":
/*!*************************!*\
  !*** ./www/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _controller_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controller.js */ "./www/js/controller.js");
// on importe uniquement le module contrôleur


var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        _controller_js__WEBPACK_IMPORTED_MODULE_0__["init"]();
    }
};

app.initialize();


/***/ }),

/***/ "./www/js/model.js":
/*!*************************!*\
  !*** ./www/js/model.js ***!
  \*************************/
/*! exports provided: Picture, Player, TicTacToe, PlayersDAO, PlayersUtils, CordovaAPI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Picture", function() { return Picture; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Player", function() { return Player; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TicTacToe", function() { return TicTacToe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayersDAO", function() { return PlayersDAO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayersUtils", function() { return PlayersUtils; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CordovaAPI", function() { return CordovaAPI; });
// Classe pour représenter une image
class Picture {

    constructor(data) {
        this.data = data;
    }

    // Renvoie l'image au format Base64 avec en-tête MIME
    getBase64() {
        return "data:image/jpeg;base64," + this.data;
    }

};

// Classe pour représenter un joueur
class Player {

    constructor(id, name, picture, nbWin = 0, nbLoss = 0, nbDrawn = 0) {
        this.id = id;
        this.name = name;
        this.picture = picture;
        this.nbWin = nbWin;
        this.nbLoss = nbLoss;
        this.nbDrawn = nbDrawn;
    }
}

// Classe pour représenter une partie de TicTacToe
class TicTacToe {

    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.currentPlayer = Math.random() < 0.5 ? player1 : player2; // Le premier joueur est choisi aléatoirement
    }

    // Changer de joueur courant
    switchCurrentPlayer() {
        if (this.currentPlayer === this.player1) this.currentPlayer = this.player2;
        else this.currentPlayer = this.player1;
    }

    // Le joueur courant joue en caseId
    play(caseId) {
        this.board[caseId] = this.currentPlayer.id;
    }

    // Renvoie vrai si le joueur courant a gagné (on vérifie "brut force" toutes les possibilités)
    isWin() {
        const id = this.currentPlayer.id;
        return (this.board[0] == id && this.board[1] == id && this.board[2] == id ||
            this.board[3] == id && this.board[4] == id && this.board[5] == id ||
            this.board[6] == id && this.board[7] == id && this.board[8] == id ||
            this.board[0] == id && this.board[3] == id && this.board[6] == id ||
            this.board[1] == id && this.board[4] == id && this.board[7] == id ||
            this.board[2] == id && this.board[5] == id && this.board[8] == id ||
            this.board[0] == id && this.board[4] == id && this.board[8] == id ||
            this.board[2] == id && this.board[4] == id && this.board[6] == id
        );
    }

    // Renvoie vrai s'il y a match nul (aucune case)
    isDrawn() {
        return this.board.find(element => element === 0) === undefined;
    }
}

// Classe pour gérer la persistance d'un tableau de joueurs
class PlayersDAO {

    // Sauvegarde le tableau de joueurs dans le local storage
    static savePlayers(players) {
        window.localStorage.setItem("players", JSON.stringify(players));
    }

    // Récupère le tableau de joueurs dans le local storage
    static getAllPlayers() {
        const stringPlayers = window.localStorage.getItem("players");
        // Si tableau non stocké, on renvoie un tableau vide
        if (stringPlayers === null)
            return new Array();
        else
            return JSON.parse(stringPlayers);
    }

}

// Classe pour manipuler un tableau de joueurs
class PlayersUtils {

    // Recherche un joueur par son nom dans un tableau de joueurs
    static findPlayerByNameInArray(players, playerName) {
        return players.find(element => element.name == playerName);
    }

    // Met à jour ou ajoute un joueur dans le tableau de joueurs
    static addOrUpdatePlayerInArray(players, player) {
        const { id, ...partialPlayer } = player; // partialPlayer = player moins l'id qu'on ne veut pas enregistrer
        const playerIndex = players.findIndex(element => element.name == player.name);
        if (playerIndex != -1) {
            players[playerIndex] = partialPlayer; // Si le joueur existe déjà, on le met à jour
        } else {
            players.push(partialPlayer); // Sinon on l'ajoute à la fin
        }
    }
}

// La classe CordovaAPI est un service permettant d'uiliser l'API de cordova sous forme de promesses
class CordovaAPI {
    static takePicture() {
        return new Promise((resolve, reject) => {
            navigator.camera.getPicture(
                imageData => resolve(imageData),
                err => reject(err),
                {   // qualité encodage 50%, format base64 (et JPEG par défaut)
                    quality: 50,
                    destinationType: navigator.camera.DestinationType.DATA_URL,
                    encodingType: navigator.camera.EncodingType.JPEG,
                    mediaType: navigator.camera.MediaType.PICTURE,
                    correctOrientation: true,
                    sourceType: navigator.camera.PictureSourceType.CAMERA,
                    cameraDirection: navigator.camera.Direction.FRONT
                }
            );
        }
        );
    }
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vd3d3L2pzL2NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vd3d3L2pzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3d3dy9qcy9tb2RlbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFb0M7O0FBRXBDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFF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O0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSx1QkFBdUIsVUFBVTtBQUNoRDtBQUNBO0FBQ0EsaURBQWlEO0FBQ2pELFNBQVM7QUFDVCx3Q0FBd0M7QUFDeEM7QUFDQTtBQUNBOztBQUVBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImpzL3RpY3RhY3RvZS5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3d3dy9qcy9pbmRleC5qc1wiKTtcbiIsIi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBNb2R1bGUgQ29udHJvbGV1ciBjb250aWVudCA6XG4vLyAtIHVuIG9iamV0IHNlc3Npb24gY29udGVuYW50IGxlcyBkb25uw6llcyBtb2TDqWxpc2FudCBsJ8OpdGF0IGRlIGwnYXBwbGljYXRpb25cbi8vIC0gdW5lIGZvbmN0aW9uIFwiaW5pdFwiIHBvdXIgaW5pdGlhbGlzZXIgbCdhcHBsaWNhdGlvblxuLy8gLSB1bmUgY2xhc3NlIFwiY29udHJvbGxlclwiIGFic3RyYWl0ZSBwb3VyIGNoYXF1ZSBwYWdlXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5pbXBvcnQgKiBhcyBtb2RlbCBmcm9tIFwiLi9tb2RlbC5qc1wiOyAvLyBsZSBjb250csO0bGV1ciB1dGlsaXNlIGxlIG1vZMOobGVcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFNlc3Npb24gOiB2YXJpYWJsZXMgcXVpIHJlcHLDqXNlbnRlbnQgbCfDqXRhdCBkZSBsJ2FwcGxpY2F0aW9uXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG52YXIgc2Vzc2lvbiA9IHtcbiAgICBwbGF5ZXJzOiBbXSwgLy8gTGVzIGpvdWV1cnNcbiAgICBjdXJyZW50UGxheWVyOiBudWxsLCAvLyBMZSBqb3VldXIgY291cmFudFxuICAgIHBhcnRpZUVuQ291cnM6IG51bGwgIC8vIExhIHBhcnRpZSBlbiB0cmFpbiBkJ8OqdHJlIGpvdcOpZVxufTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIGluaXQgOiBleMOpY3V0w6llIGF1IGTDqW1hcnJhZ2UgZGUgbCdhcHBsaWNhdGlvbiAodm9pciBmaWNoaWVyIGluZGV4LmpzKVxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgLy8gT24gZHVwbGlxdWUgSGVhZGVyIGV0IEZvb3RlciBzdXIgY2hhcXVlIHBhZ2UgKHNhdWYgbGEgcHJlbWnDqHJlICEpXG4gICAgdmFyICRoZWFkZXIgPSAkKCcjdGljdGFjdG9lSGVhZGVyJyk7XG4gICAgdmFyICRmb290ZXIgPSAkKCcjdGljdGFjdG9lRm9vdGVyJyk7XG4gICAgJCgnZGl2W2RhdGEtcm9sZT1cInBhZ2VcIl0nKS5lYWNoKGZ1bmN0aW9uIChpKSB7XG4gICAgICAgIGlmIChpKSB7XG4gICAgICAgICAgICB2YXIgJGNvbnRlbnQgPSAkKHRoaXMpLmNoaWxkcmVuKFwiOmZpcnN0XCIpO1xuICAgICAgICAgICAgJGhlYWRlci5jbG9uZSgpLmluc2VydEJlZm9yZSgkY29udGVudCk7XG4gICAgICAgICAgICAkY29udGVudC5hZnRlcigkZm9vdGVyLmNsb25lKCkpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gT24gaW5pdGlhbGlzZSBsZXMgcGFnZXMgKGF0dGFjaGVyIGxlcyBcImhhbmRsZXJzXCIgZCfDqXbDqW5lbWVudHMgcHJvcHJlcyDDoCBjaGFxdWUgcGFnZSlcbiAgICBWdWVBY2N1ZWlsQ29udHJvbGxlci5zZXRFdmVudHMoKTtcbiAgICBWdWVKZXVDb250cm9sbGVyLnNldEV2ZW50cygpO1xuICAgIFZ1ZUZpbkNvbnRyb2xsZXIuc2V0RXZlbnRzKCk7XG4gICAgLy8gT24gbmF2aWd1ZSB2ZXJzIGxhIHBhZ2UgZCdhY2N1ZWlsXG4gICAgJC5tb2JpbGUuY2hhbmdlUGFnZShcIiN2dWVBY2N1ZWlsXCIpO1xufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gQ29udHJvbGV1cnMgZGUgcGFnZXMgOiAxIGNvbnRyw7RsZXVyIHBhciBwYWdlLCBxdWkgcG9ydGUgbGUgbm9tIGRlIGxhIHBhZ2Vcbi8vICBldCBjb250aWVudCBsZXMgXCJoYW5kbGVyc1wiIGRlcyDDqXbDqW5lbWVudHMgYXNzb2Npw6lzIMOgIGNldHRlIHBhZ2Vcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmNsYXNzIFZ1ZUFjY3VlaWxDb250cm9sbGVyIHtcblxuICAgIHN0YXRpYyBzZXRFdmVudHMoKSB7IC8vIGTDqWZpbml0aW9uIGRlcyBcImhhbmRsZXJzXCIgZCfDqXbDqW5lbWVudHMgc3VyIGxhIHBhZ2VcbiAgICAgICAgJChkb2N1bWVudCkub24oXCJwYWdlYmVmb3Jlc2hvd1wiLCBcIiN2dWVBY2N1ZWlsXCIsIGZ1bmN0aW9uICgpIHsgdGhpcy5pbml0KCk7IH0uYmluZCh0aGlzKSk7XG4gICAgICAgICQoXCIjYnRuTm91dmVsbGVQYXJ0aWVcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7IHRoaXMubm91dmVsbGVQYXJ0aWUoKTsgfS5iaW5kKHRoaXMpKTtcblxuICAgICAgICAkKFwiI25vbUpvdWV1cjFcIikub24oXCJpbnB1dFwiLCBmdW5jdGlvbiAoKSB7IHRoaXMuY2hhcmdlSm91ZXVyMSgpOyB9LmJpbmQodGhpcykpO1xuICAgICAgICAkKFwiI25vbUpvdWV1cjJcIikub24oXCJpbnB1dFwiLCBmdW5jdGlvbiAoKSB7IHRoaXMuY2hhcmdlSm91ZXVyMigpOyB9LmJpbmQodGhpcykpO1xuXG4gICAgICAgICQoXCIjYnRuUGhvdG8xXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkgeyB0aGlzLnByZW5kcmVQaG90bzEoKTsgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgJChcIiNidG5QaG90bzJcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7IHRoaXMucHJlbmRyZVBob3RvMigpOyB9LmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHN0YXRpYyBpbml0KCkgeyAvLyBpbml0aWFsaXNhdGlvbiBkZSBsYSBwYWdlXG4gICAgICAgICQoXCIjbm9tSm91ZXVyXCIpLnZhbChcIlwiKTtcbiAgICAgICAgJChcIiNpbWdQaG90b1wiKS5hdHRyKFwic3JjXCIsIFwiXCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBjaGFyZ2VKb3VldXIxKCkge1xuICAgICAgICB2YXIgbm9tID0gJChcIiNub21Kb3VldXIxXCIpLnZhbCgpO1xuICAgICAgICB2YXIgYWxsUGxheWVycyA9IG1vZGVsLlBsYXllcnNEQU8uZ2V0QWxsUGxheWVycygpO1xuICAgICAgICB2YXIgam91ZXVyID0gbW9kZWwuUGxheWVyc1V0aWxzLmZpbmRQbGF5ZXJCeU5hbWVJbkFycmF5KGFsbFBsYXllcnMsIG5vbSk7XG4gICAgICAgIGlmIChqb3VldXIpIHtcbiAgICAgICAgICAgIHNlc3Npb24uY3VycmVudFBsYXllciA9IGpvdWV1cjtcbiAgICAgICAgICAgICQoXCIjaW1nUGhvdG8xXCIpLmF0dHIoXCJzcmNcIiwgam91ZXVyLnBpY3R1cmUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2Vzc2lvbi5jdXJyZW50UGxheWVyID0gbmV3IG1vZGVsLlBsYXllcihub20pO1xuICAgICAgICAgICAgJChcIiNpbWdQaG90bzFcIikuYXR0cihcInNyY1wiLCBcIlwiKTtcblxuICAgICAgICAgICAgc2Vzc2lvbi5wbGF5ZXJzLnB1c2goc2Vzc2lvbi5jdXJyZW50UGxheWVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBjaGFyZ2VKb3VldXIyKCkge1xuICAgICAgICB2YXIgbm9tID0gJChcIiNub21Kb3VldXIyXCIpLnZhbCgpO1xuICAgICAgICB2YXIgYWxsUGxheWVycyA9IG1vZGVsLlBsYXllcnNEQU8uZ2V0QWxsUGxheWVycygpO1xuICAgICAgICB2YXIgam91ZXVyID0gbW9kZWwuUGxheWVyc1V0aWxzLmZpbmRQbGF5ZXJCeU5hbWVJbkFycmF5KGFsbFBsYXllcnMsIG5vbSk7XG4gICAgICAgIGlmIChqb3VldXIpIHtcbiAgICAgICAgICAgIHNlc3Npb24uY3VycmVudFBsYXllciA9IGpvdWV1cjtcbiAgICAgICAgICAgICQoXCIjaW1nUGhvdG8yXCIpLmF0dHIoXCJzcmNcIiwgam91ZXVyLnBpY3R1cmUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2Vzc2lvbi5jdXJyZW50UGxheWVyID0gbmV3IG1vZGVsLlBsYXllcihub20pO1xuICAgICAgICAgICAgJChcIiNpbWdQaG90bzJcIikuYXR0cihcInNyY1wiLCBcIlwiKTtcblxuICAgICAgICAgICAgc2Vzc2lvbi5wbGF5ZXJzLnB1c2goc2Vzc2lvbi5jdXJyZW50UGxheWVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBub3V2ZWxsZVBhcnRpZSgpIHtcbiAgICAgICAgLy8gb24gcsOpY3Vww6hyZSBkZSBsJ2luZm9ybWF0aW9uIGRlIGxhIHZ1ZSBlbiBjb3Vyc1xuICAgICAgICB2YXIgbm9tSm91ZXVyMSA9ICQoXCIjbm9tSm91ZXVyMVwiKS52YWwoKTtcbiAgICAgICAgdmFyIG5vbUpvdWV1cjIgPSAkKFwiI25vbUpvdWV1cjJcIikudmFsKCk7XG4gICAgICAgIGlmIChub21Kb3VldXIxID09PSBcIlwiIHx8IG5vbUpvdWV1cjIgPT09IFwiXCIpIHtcbiAgICAgICAgICAgIHBsdWdpbnMudG9hc3Quc2hvd1Nob3J0Q2VudGVyKFwiU2Fpc2lyIHVuIG5vbSBkZSBqb3VldXJcIik7XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHZhciBwbGF5ZXIxID0gc2Vzc2lvbi5wbGF5ZXJzWzBdO1xuICAgICAgICAgICAgdmFyIHBsYXllcjIgPSBzZXNzaW9uLnBsYXllcnNbMV07XG4gICAgICAgICAgICAvLyBPbiB1dGlsaXNlIGxlIG1vZMOobGUgcG91ciBjcsOpZXIgdW5lIG5vdXZlbGxlIHBhcnRpZVxuICAgICAgICAgICAgc2Vzc2lvbi5wYXJ0aWVFbkNvdXJzID0gbmV3IG1vZGVsLlRpY1RhY1RvZShwbGF5ZXIxLCBwbGF5ZXIyKTsgLy8gY2hhcmdlIGxhIHBhcnRpZSBkdSBqb3VldXIgZGVwdWlzIGxlIGxvY2Fsc3RvcmFnZVxuICAgICAgICAgICAgLy8gT24gXCJwcm9wYWdlXCIgbGUgbm9tIGR1IGpvdWV1cjEgc3VyIHRvdXRlcyBsZXMgdnVlc1xuICAgICAgICAgICAgJCgnc3BhbltkYXRhLXJvbGU9XCJub21Kb3VldXIxXCJdJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5odG1sKHBsYXllcjEubmFtZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIE9uIFwicHJvcGFnZVwiIGxhIHBpY3R1cmUgZHUgam91ZXVyIHN1ciB0b3V0ZXMgbGVzIHZ1ZXNcbiAgICAgICAgICAgICQoJ2ltZ1tkYXRhLXJvbGU9XCJwaWN0dXJlSm91ZXVyMVwiXScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICQodGhpcykuYXR0cihcInNyY1wiLCBwbGF5ZXIxLnBpY3R1cmUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIE9uIFwicHJvcGFnZVwiIGxlIG5vbSBkdSBqb3VldXIyIHN1ciB0b3V0ZXMgbGVzIHZ1ZXNcbiAgICAgICAgICAgICQoJ3NwYW5bZGF0YS1yb2xlPVwibm9tSm91ZXVyMlwiXScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICQodGhpcykuaHRtbChwbGF5ZXIyLm5hbWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyBPbiBcInByb3BhZ2VcIiBsYSBwaWN0dXJlIGR1IGpvdWV1ciBzdXIgdG91dGVzIGxlcyB2dWVzXG4gICAgICAgICAgICAkKCdpbWdbZGF0YS1yb2xlPVwicGljdHVyZUpvdWV1cjJcIl0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoXCJzcmNcIiwgcGxheWVyMi5waWN0dXJlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gRXQgb24gcGFzc2Ugw6AgdW5lIGF1dHJlIHZ1ZVxuICAgICAgICAgICAgJC5tb2JpbGUuY2hhbmdlUGFnZShcIiN2dWVKZXVcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgcHJlbmRyZVBob3RvMSgpIHtcbiAgICAgICAgbW9kZWwuQ29yZG92YUFQSS50YWtlUGljdHVyZSgpXG4gICAgICAgICAgICAudGhlbihpbWFnZURhdGEgPT4ge1xuICAgICAgICAgICAgICAgIHNlc3Npb24uY3VycmVudFBsYXllci5waWN0dXJlID0gXCJkYXRhOmltYWdlL2pwZWc7YmFzZTY0LFwiICsgaW1hZ2VEYXRhO1xuICAgICAgICAgICAgICAgICQoXCIjaW1nUGhvdG8xXCIpLmF0dHIoXCJzcmNcIiwgc2Vzc2lvbi5jdXJyZW50UGxheWVyLnBpY3R1cmUpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIHNlc3Npb24uY3VycmVudFBsYXllci5waWN0dXJlID0gXCJcIjtcbiAgICAgICAgICAgICAgICAkKFwiI2ltZ1Bob3RvMVwiKS5hdHRyKFwic3JjXCIsIFwiXCIpO1xuICAgICAgICAgICAgICAgIHBsdWdpbnMudG9hc3Quc2hvd1Nob3J0Q2VudGVyKFwiRWNoZWMgUGhvdG8gOiBcIiArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXRpYyBwcmVuZHJlUGhvdG8yKCkge1xuICAgICAgICBtb2RlbC5Db3Jkb3ZhQVBJLnRha2VQaWN0dXJlKClcbiAgICAgICAgICAgIC50aGVuKGltYWdlRGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgc2Vzc2lvbi5jdXJyZW50UGxheWVyLnBpY3R1cmUgPSBcImRhdGE6aW1hZ2UvanBlZztiYXNlNjQsXCIgKyBpbWFnZURhdGE7XG4gICAgICAgICAgICAgICAgJChcIiNpbWdQaG90bzJcIikuYXR0cihcInNyY1wiLCBzZXNzaW9uLmN1cnJlbnRQbGF5ZXIucGljdHVyZSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgc2Vzc2lvbi5jdXJyZW50UGxheWVyLnBpY3R1cmUgPSBcIlwiO1xuICAgICAgICAgICAgICAgICQoXCIjaW1nUGhvdG8yXCIpLmF0dHIoXCJzcmNcIiwgXCJcIik7XG4gICAgICAgICAgICAgICAgcGx1Z2lucy50b2FzdC5zaG93U2hvcnRDZW50ZXIoXCJFY2hlYyBQaG90byA6IFwiICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuY2xhc3MgVnVlSmV1Q29udHJvbGxlciB7XG5cbiAgICBzdGF0aWMgc2V0RXZlbnRzKCkgeyAvLyBkw6lmaW5pdGlvbiBkZXMgXCJoYW5kbGVyc1wiIGQnw6l2w6luZW1lbnRzIHN1ciBsYSBwYWdlXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKFwicGFnZWJlZm9yZXNob3dcIiwgXCIjdnVlSmV1XCIsIGZ1bmN0aW9uICgpIHsgdGhpcy5pbml0KCk7IH0uYmluZCh0aGlzKSk7XG4gICAgICAgICQoXCIuY2VsbFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHsgdGhpcy5wbGF5KGV2ZW50LnRhcmdldC5pZCk7IH0uYmluZCh0aGlzKSk7XG5cbiAgICAgICAgJChcIiNidG5GaW5QYXJ0aWVcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7IHRoaXMuZmluUGFydGllKCk7IH0uYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGluaXQoKSB7IC8vIGluaXRpYWxpc2F0aW9uIGRlIGxhIHBhZ2VcbiAgICAgICAgLy8gb24gYWN0aXZlIGV0IG9uIG1vbnRyZSB0b3VzIGxlcyBib3V0b25zIGR1IGpvdWV1clxuICAgICAgICAkKFwiYnV0dG9uW2lkXj1idG5Kb3Vlcl1cIikucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSkuc2hvdygpO1xuICAgICAgICAvLyBvbiBjYWNoZSB0b3V0ZXMgbGVzIHLDqXBvbnNlcyBkZSBsYSBtYWNoaW5lXG4gICAgICAgICQoXCJpbWdbaWRePW1hY2hpbmVdXCIpLmhpZGUoKTtcbiAgICAgICAgLy8gb24gY2FjaGUgbGEgZGl2IHJlc3VsdGF0XG4gICAgICAgICQoXCIjcmVzdWx0YXRcIikuaGlkZSgpO1xuICAgIH1cblxuICAgIHN0YXRpYyBwbGF5KHBsYXllZElkKSB7IC8vIGxlIGpvdWV1ciBhIGNob2lzaSBzb24gY291cFxuICAgICAgICAvLyBPbiBpbnRlcnJvZ2UgbGUgbW9kw6hsZSBwb3VyIHZvaXIgbGUgcsOpc3VsdGF0IGR1IG5vdXZlYXUgY291cFxuICAgICAgICB0aGlzLm5vdXZlYXVDb3VwKHBsYXllZElkKTtcbiAgICAgICAgLy8gRXQgb24gbWV0IMOgIGpvdXIgbGEgdnVlIDpcbiAgICAgICAgLy8gMS4gb24gZMOpc2FjdGl2ZSBsZSBib3V0b24gY2xpcXXDqSBwYXIgbGUgam91ZXVyIGV0IG9uIGNhY2hlIGxlcyBhdXRyZXMgYm91dG9uc1xuICAgICAgICAkKGAjJHtwbGF5ZWRJZH1gKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgICAkKGAjJHtwbGF5ZWRJZH1gKS5hcHBlbmQoYDxpbWcgc3JjPVwiJHtzZXNzaW9uLmN1cnJlbnRQbGF5ZXIucGljdHVyZX1cIiBhbHQ9XCIke3Nlc3Npb24uY3VycmVudFBsYXllci5uYW1lfVwiIGNsYXNzPVwiaW1nLWNpcmNsZVwiIHN0eWxlPVwid2lkdGg6IDEwMHB4OyBoZWlnaHQ6MTAwcHg7XCIgLz5gKTtcblxuICAgICAgICAvLyAyLiBvbiByZWdhcmRlIHNpIGxhIHBhcnRpZSBlc3QgZmluaWVcbiAgICAgICAgaWYgKHNlc3Npb24ucGFydGllRW5Db3Vycy5pc1dpbigpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIndpblwiKTtcbiAgICAgICAgICAgIC8vIG1vZGVsLlBsYXllcnNEQU8uc2F2ZUpvdWV1cihzZXNzaW9uLnBhcnRpZUVuQ291cnMuam91ZXVyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzZXNzaW9uLnBhcnRpZUVuQ291cnMuaXNEcmF3bigpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImRyYXdcIik7XG4gICAgICAgICAgICAvLyBtb2RlbC5QbGF5ZXJzREFPLnNhdmVKb3VldXIoc2Vzc2lvbi5wYXJ0aWVFbkNvdXJzLmpvdWV1cik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7IGNvbnNvbGUubG9nKFwiY29udGludWVcIik7IH1cblxuICAgICAgICAvLyAyLiBvbiBjaGFuZ2UgZGUgam91ZXVyXG4gICAgICAgIHNlc3Npb24ucGFydGllRW5Db3Vycy5zd2l0Y2hDdXJyZW50UGxheWVyKCk7XG4gICAgICAgIHNlc3Npb24uY3VycmVudFBsYXllciA9IHNlc3Npb24ucGFydGllRW5Db3Vycy5jdXJyZW50UGxheWVyO1xuICAgICAgICBcbiAgICAgICAgLy8gMy4gb24gcHLDqXBhcmUgdW4gbm91dmVhdSBjb3VwXG4gICAgICAgIHRoaXMubm91dmVhdUNvdXAoKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbm91dmVhdUNvdXAoKSB7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cblxuICAgIHN0YXRpYyBmaW5QYXJ0aWUoKSB7XG4gICAgICAgICQubW9iaWxlLmNoYW5nZVBhZ2UoXCIjdnVlRmluXCIpO1xuICAgIH1cbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmNsYXNzIFZ1ZUZpbkNvbnRyb2xsZXIge1xuXG4gICAgc3RhdGljIHNldEV2ZW50cygpIHsgLy8gZMOpZmluaXRpb24gZGVzIFwiaGFuZGxlcnNcIiBkJ8OpdsOpbmVtZW50cyBzdXIgbGEgcGFnZVxuICAgICAgICAkKGRvY3VtZW50KS5vbihcInBhZ2ViZWZvcmVzaG93XCIsIFwiI3Z1ZUZpblwiLCBmdW5jdGlvbiAoKSB7IHRoaXMuaW5pdCgpOyB9LmJpbmQodGhpcykpO1xuICAgICAgICAkKFwiI2J0blJldG91ckpldVwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHsgdGhpcy5yZXRvdXJKZXUoKTsgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgJChcIiNidG5TdXBwcmltZXJcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7IHRoaXMuc3VwcHJpbWVySm91ZXVyKCk7IH0uYmluZCh0aGlzKSk7XG4gICAgICAgICQoXCIjYnRuUmV0b3VyQWNjdWVpbFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHsgdGhpcy5yZXRvdXJBY2N1ZWlsKCk7IH0uYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGluaXQoKSB7IC8vIGluaXRpYWxpc2F0aW9uIGRlIGxhIHBhZ2VcbiAgICAgICAgJChcIiNuYlZpY3RvaXJlc1wiKS5odG1sKHNlc3Npb24ucGFydGllRW5Db3Vycy5qb3VldXIudmljdG9pcmVzKTtcbiAgICAgICAgJChcIiNuYk51bHNcIikuaHRtbChzZXNzaW9uLnBhcnRpZUVuQ291cnMuam91ZXVyLm51bHMpO1xuICAgICAgICAkKFwiI25iRGVmYWl0ZXNcIikuaHRtbChzZXNzaW9uLnBhcnRpZUVuQ291cnMuam91ZXVyLmRlZmFpdGVzKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgcmV0b3VySmV1KCkge1xuICAgICAgICAkLm1vYmlsZS5jaGFuZ2VQYWdlKFwiI3Z1ZUpldVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc3VwcHJpbWVySm91ZXVyKCkge1xuICAgICAgICBtb2RlbC5QbGF5ZXJzREFPLnJlbW92ZUpvdWV1cihzZXNzaW9uLnBhcnRpZUVuQ291cnMuam91ZXVyLm5vbSk7XG4gICAgICAgIHRoaXMucmV0b3VyQWNjdWVpbCgpO1xuICAgIH1cblxuICAgIHN0YXRpYyByZXRvdXJBY2N1ZWlsKCkge1xuICAgICAgICAkLm1vYmlsZS5jaGFuZ2VQYWdlKFwiI3Z1ZUFjY3VlaWxcIik7XG4gICAgfVxufSIsIi8vIG9uIGltcG9ydGUgdW5pcXVlbWVudCBsZSBtb2R1bGUgY29udHLDtGxldXJcbmltcG9ydCAqIGFzIGNvbnRyb2xsZXIgZnJvbSBcIi4vY29udHJvbGxlci5qc1wiO1xuXG52YXIgYXBwID0ge1xuICAgIC8vIEFwcGxpY2F0aW9uIENvbnN0cnVjdG9yXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkZXZpY2VyZWFkeScsIHRoaXMub25EZXZpY2VSZWFkeS5iaW5kKHRoaXMpLCBmYWxzZSk7XG4gICAgfSxcblxuICAgIC8vIGRldmljZXJlYWR5IEV2ZW50IEhhbmRsZXJcbiAgICAvL1xuICAgIC8vIEJpbmQgYW55IGNvcmRvdmEgZXZlbnRzIGhlcmUuIENvbW1vbiBldmVudHMgYXJlOlxuICAgIC8vICdwYXVzZScsICdyZXN1bWUnLCBldGMuXG4gICAgb25EZXZpY2VSZWFkeTogZnVuY3Rpb24gKCkge1xuICAgICAgICBjb250cm9sbGVyLmluaXQoKTtcbiAgICB9XG59O1xuXG5hcHAuaW5pdGlhbGl6ZSgpO1xuIiwiLy8gQ2xhc3NlIHBvdXIgcmVwcsOpc2VudGVyIHVuZSBpbWFnZVxyXG5leHBvcnQgY2xhc3MgUGljdHVyZSB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZGF0YSkge1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmVudm9pZSBsJ2ltYWdlIGF1IGZvcm1hdCBCYXNlNjQgYXZlYyBlbi10w6p0ZSBNSU1FXHJcbiAgICBnZXRCYXNlNjQoKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiZGF0YTppbWFnZS9qcGVnO2Jhc2U2NCxcIiArIHRoaXMuZGF0YTtcclxuICAgIH1cclxuXHJcbn07XHJcblxyXG4vLyBDbGFzc2UgcG91ciByZXByw6lzZW50ZXIgdW4gam91ZXVyXHJcbmV4cG9ydCBjbGFzcyBQbGF5ZXIge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGlkLCBuYW1lLCBwaWN0dXJlLCBuYldpbiA9IDAsIG5iTG9zcyA9IDAsIG5iRHJhd24gPSAwKSB7XHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5waWN0dXJlID0gcGljdHVyZTtcclxuICAgICAgICB0aGlzLm5iV2luID0gbmJXaW47XHJcbiAgICAgICAgdGhpcy5uYkxvc3MgPSBuYkxvc3M7XHJcbiAgICAgICAgdGhpcy5uYkRyYXduID0gbmJEcmF3bjtcclxuICAgIH1cclxufVxyXG5cclxuLy8gQ2xhc3NlIHBvdXIgcmVwcsOpc2VudGVyIHVuZSBwYXJ0aWUgZGUgVGljVGFjVG9lXHJcbmV4cG9ydCBjbGFzcyBUaWNUYWNUb2Uge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBsYXllcjEsIHBsYXllcjIpIHtcclxuICAgICAgICB0aGlzLnBsYXllcjEgPSBwbGF5ZXIxO1xyXG4gICAgICAgIHRoaXMucGxheWVyMiA9IHBsYXllcjI7XHJcbiAgICAgICAgdGhpcy5ib2FyZCA9IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRQbGF5ZXIgPSBNYXRoLnJhbmRvbSgpIDwgMC41ID8gcGxheWVyMSA6IHBsYXllcjI7IC8vIExlIHByZW1pZXIgam91ZXVyIGVzdCBjaG9pc2kgYWzDqWF0b2lyZW1lbnRcclxuICAgIH1cclxuXHJcbiAgICAvLyBDaGFuZ2VyIGRlIGpvdWV1ciBjb3VyYW50XHJcbiAgICBzd2l0Y2hDdXJyZW50UGxheWVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRQbGF5ZXIgPT09IHRoaXMucGxheWVyMSkgdGhpcy5jdXJyZW50UGxheWVyID0gdGhpcy5wbGF5ZXIyO1xyXG4gICAgICAgIGVsc2UgdGhpcy5jdXJyZW50UGxheWVyID0gdGhpcy5wbGF5ZXIxO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIExlIGpvdWV1ciBjb3VyYW50IGpvdWUgZW4gY2FzZUlkXHJcbiAgICBwbGF5KGNhc2VJZCkge1xyXG4gICAgICAgIHRoaXMuYm9hcmRbY2FzZUlkXSA9IHRoaXMuY3VycmVudFBsYXllci5pZDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZW52b2llIHZyYWkgc2kgbGUgam91ZXVyIGNvdXJhbnQgYSBnYWduw6kgKG9uIHbDqXJpZmllIFwiYnJ1dCBmb3JjZVwiIHRvdXRlcyBsZXMgcG9zc2liaWxpdMOpcylcclxuICAgIGlzV2luKCkge1xyXG4gICAgICAgIGNvbnN0IGlkID0gdGhpcy5jdXJyZW50UGxheWVyLmlkO1xyXG4gICAgICAgIHJldHVybiAodGhpcy5ib2FyZFswXSA9PSBpZCAmJiB0aGlzLmJvYXJkWzFdID09IGlkICYmIHRoaXMuYm9hcmRbMl0gPT0gaWQgfHxcclxuICAgICAgICAgICAgdGhpcy5ib2FyZFszXSA9PSBpZCAmJiB0aGlzLmJvYXJkWzRdID09IGlkICYmIHRoaXMuYm9hcmRbNV0gPT0gaWQgfHxcclxuICAgICAgICAgICAgdGhpcy5ib2FyZFs2XSA9PSBpZCAmJiB0aGlzLmJvYXJkWzddID09IGlkICYmIHRoaXMuYm9hcmRbOF0gPT0gaWQgfHxcclxuICAgICAgICAgICAgdGhpcy5ib2FyZFswXSA9PSBpZCAmJiB0aGlzLmJvYXJkWzNdID09IGlkICYmIHRoaXMuYm9hcmRbNl0gPT0gaWQgfHxcclxuICAgICAgICAgICAgdGhpcy5ib2FyZFsxXSA9PSBpZCAmJiB0aGlzLmJvYXJkWzRdID09IGlkICYmIHRoaXMuYm9hcmRbN10gPT0gaWQgfHxcclxuICAgICAgICAgICAgdGhpcy5ib2FyZFsyXSA9PSBpZCAmJiB0aGlzLmJvYXJkWzVdID09IGlkICYmIHRoaXMuYm9hcmRbOF0gPT0gaWQgfHxcclxuICAgICAgICAgICAgdGhpcy5ib2FyZFswXSA9PSBpZCAmJiB0aGlzLmJvYXJkWzRdID09IGlkICYmIHRoaXMuYm9hcmRbOF0gPT0gaWQgfHxcclxuICAgICAgICAgICAgdGhpcy5ib2FyZFsyXSA9PSBpZCAmJiB0aGlzLmJvYXJkWzRdID09IGlkICYmIHRoaXMuYm9hcmRbNl0gPT0gaWRcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlbnZvaWUgdnJhaSBzJ2lsIHkgYSBtYXRjaCBudWwgKGF1Y3VuZSBjYXNlKVxyXG4gICAgaXNEcmF3bigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5ib2FyZC5maW5kKGVsZW1lbnQgPT4gZWxlbWVudCA9PT0gMCkgPT09IHVuZGVmaW5lZDtcclxuICAgIH1cclxufVxyXG5cclxuLy8gQ2xhc3NlIHBvdXIgZ8OpcmVyIGxhIHBlcnNpc3RhbmNlIGQndW4gdGFibGVhdSBkZSBqb3VldXJzXHJcbmV4cG9ydCBjbGFzcyBQbGF5ZXJzREFPIHtcclxuXHJcbiAgICAvLyBTYXV2ZWdhcmRlIGxlIHRhYmxlYXUgZGUgam91ZXVycyBkYW5zIGxlIGxvY2FsIHN0b3JhZ2VcclxuICAgIHN0YXRpYyBzYXZlUGxheWVycyhwbGF5ZXJzKSB7XHJcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicGxheWVyc1wiLCBKU09OLnN0cmluZ2lmeShwbGF5ZXJzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUsOpY3Vww6hyZSBsZSB0YWJsZWF1IGRlIGpvdWV1cnMgZGFucyBsZSBsb2NhbCBzdG9yYWdlXHJcbiAgICBzdGF0aWMgZ2V0QWxsUGxheWVycygpIHtcclxuICAgICAgICBjb25zdCBzdHJpbmdQbGF5ZXJzID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicGxheWVyc1wiKTtcclxuICAgICAgICAvLyBTaSB0YWJsZWF1IG5vbiBzdG9ja8OpLCBvbiByZW52b2llIHVuIHRhYmxlYXUgdmlkZVxyXG4gICAgICAgIGlmIChzdHJpbmdQbGF5ZXJzID09PSBudWxsKVxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShzdHJpbmdQbGF5ZXJzKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbi8vIENsYXNzZSBwb3VyIG1hbmlwdWxlciB1biB0YWJsZWF1IGRlIGpvdWV1cnNcclxuZXhwb3J0IGNsYXNzIFBsYXllcnNVdGlscyB7XHJcblxyXG4gICAgLy8gUmVjaGVyY2hlIHVuIGpvdWV1ciBwYXIgc29uIG5vbSBkYW5zIHVuIHRhYmxlYXUgZGUgam91ZXVyc1xyXG4gICAgc3RhdGljIGZpbmRQbGF5ZXJCeU5hbWVJbkFycmF5KHBsYXllcnMsIHBsYXllck5hbWUpIHtcclxuICAgICAgICByZXR1cm4gcGxheWVycy5maW5kKGVsZW1lbnQgPT4gZWxlbWVudC5uYW1lID09IHBsYXllck5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE1ldCDDoCBqb3VyIG91IGFqb3V0ZSB1biBqb3VldXIgZGFucyBsZSB0YWJsZWF1IGRlIGpvdWV1cnNcclxuICAgIHN0YXRpYyBhZGRPclVwZGF0ZVBsYXllckluQXJyYXkocGxheWVycywgcGxheWVyKSB7XHJcbiAgICAgICAgY29uc3QgeyBpZCwgLi4ucGFydGlhbFBsYXllciB9ID0gcGxheWVyOyAvLyBwYXJ0aWFsUGxheWVyID0gcGxheWVyIG1vaW5zIGwnaWQgcXUnb24gbmUgdmV1dCBwYXMgZW5yZWdpc3RyZXJcclxuICAgICAgICBjb25zdCBwbGF5ZXJJbmRleCA9IHBsYXllcnMuZmluZEluZGV4KGVsZW1lbnQgPT4gZWxlbWVudC5uYW1lID09IHBsYXllci5uYW1lKTtcclxuICAgICAgICBpZiAocGxheWVySW5kZXggIT0gLTEpIHtcclxuICAgICAgICAgICAgcGxheWVyc1twbGF5ZXJJbmRleF0gPSBwYXJ0aWFsUGxheWVyOyAvLyBTaSBsZSBqb3VldXIgZXhpc3RlIGTDqWrDoCwgb24gbGUgbWV0IMOgIGpvdXJcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwbGF5ZXJzLnB1c2gocGFydGlhbFBsYXllcik7IC8vIFNpbm9uIG9uIGwnYWpvdXRlIMOgIGxhIGZpblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLy8gTGEgY2xhc3NlIENvcmRvdmFBUEkgZXN0IHVuIHNlcnZpY2UgcGVybWV0dGFudCBkJ3VpbGlzZXIgbCdBUEkgZGUgY29yZG92YSBzb3VzIGZvcm1lIGRlIHByb21lc3Nlc1xyXG5leHBvcnQgY2xhc3MgQ29yZG92YUFQSSB7XHJcbiAgICBzdGF0aWMgdGFrZVBpY3R1cmUoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgbmF2aWdhdG9yLmNhbWVyYS5nZXRQaWN0dXJlKFxyXG4gICAgICAgICAgICAgICAgaW1hZ2VEYXRhID0+IHJlc29sdmUoaW1hZ2VEYXRhKSxcclxuICAgICAgICAgICAgICAgIGVyciA9PiByZWplY3QoZXJyKSxcclxuICAgICAgICAgICAgICAgIHsgICAvLyBxdWFsaXTDqSBlbmNvZGFnZSA1MCUsIGZvcm1hdCBiYXNlNjQgKGV0IEpQRUcgcGFyIGTDqWZhdXQpXHJcbiAgICAgICAgICAgICAgICAgICAgcXVhbGl0eTogNTAsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzdGluYXRpb25UeXBlOiBuYXZpZ2F0b3IuY2FtZXJhLkRlc3RpbmF0aW9uVHlwZS5EQVRBX1VSTCxcclxuICAgICAgICAgICAgICAgICAgICBlbmNvZGluZ1R5cGU6IG5hdmlnYXRvci5jYW1lcmEuRW5jb2RpbmdUeXBlLkpQRUcsXHJcbiAgICAgICAgICAgICAgICAgICAgbWVkaWFUeXBlOiBuYXZpZ2F0b3IuY2FtZXJhLk1lZGlhVHlwZS5QSUNUVVJFLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvcnJlY3RPcmllbnRhdGlvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzb3VyY2VUeXBlOiBuYXZpZ2F0b3IuY2FtZXJhLlBpY3R1cmVTb3VyY2VUeXBlLkNBTUVSQSxcclxuICAgICAgICAgICAgICAgICAgICBjYW1lcmFEaXJlY3Rpb246IG5hdmlnYXRvci5jYW1lcmEuRGlyZWN0aW9uLkZST05UXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==