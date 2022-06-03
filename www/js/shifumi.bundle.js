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

/***/ "./www/js/controleur.js":
/*!******************************!*\
  !*** ./www/js/controleur.js ***!
  \******************************/
/*! exports provided: init */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony import */ var _modele_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modele.js */ "./www/js/modele.js");
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
    joueurEnCours: null, // Le joueur courant
    partieEnCours: null  // La partie en train d'être jouée
};

////////////////////////////////////////////////////////////////////////////////
// init : exécutée au démarrage de l'application (voir fichier index.js)
////////////////////////////////////////////////////////////////////////////////

function init() {
    // On duplique Header et Footer sur chaque page (sauf la première !)
    var $header=$('#shifumiHeader');
    var $footer=$('#shifumiFooter');
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
        $(document).on("pagebeforeshow", "#vueAccueil", function () {this.init();}.bind(this));
        $("#btnNouvellePartie").on("click", function(){this.nouvellePartie();}.bind(this));
        $("#btnPhoto").on("click", function(){this.prendrePhoto();}.bind(this));
        $("#nomJoueur").on("input", function(){this.chargeJoueur();}.bind(this));
    }

    static init() { // initialisation de la page
        $("#nomJoueur").val("");
        $("#imgPhoto").attr("src","");
    }

    static chargeJoueur() {
        var nom = $("#nomJoueur").val();
        var joueur = _modele_js__WEBPACK_IMPORTED_MODULE_0__["JoueurDAO"].loadJoueur(nom);
        if (joueur) {
            session.joueurEnCours = joueur;
            $("#imgPhoto").attr("src", joueur.photo);
        } else {
            session.joueurEnCours=new _modele_js__WEBPACK_IMPORTED_MODULE_0__["Joueur"](nom);
            $("#imgPhoto").attr("src", "");
        }
    }

    static nouvellePartie() {
        // on récupère de l'information de la vue en cours
        var nomJoueur = $("#nomJoueur").val();
        if (nomJoueur === "") {
            plugins.toast.showShortCenter("Saisir un nom de joueur");
        } else {
            // On utilise le modèle pour créer une nouvelle partie
            session.partieEnCours = new _modele_js__WEBPACK_IMPORTED_MODULE_0__["Shifumi"](session.joueurEnCours); // charge la partie du joueur depuis le localstorage
            // On "propage" le nom du joueur sur toutes les vues
            $('span[data-role="nomJoueur"]').each(function () {
                $(this).html(session.joueurEnCours.nom);
            });
            // On "propage" la photo du joueur sur toutes les vues
            $('img[data-role="photoJoueur"]').each(function () {
                $(this).attr("src",session.joueurEnCours.photo);
            });
            // Et on passe à une autre vue
            $.mobile.changePage("#vueJeu");
        }
    }

    static prendrePhoto() {
        _modele_js__WEBPACK_IMPORTED_MODULE_0__["CordovaAPI"].takePicture()
            .then ( imageData => {
                session.joueurEnCours.photo="data:image/jpeg;base64,"+imageData;
                $("#imgPhoto").attr("src",session.joueurEnCours.photo);
            })
            .catch( err => {
                session.joueurEnCours.photo="";
                $("#imgPhoto").attr("src","");
                plugins.toast.showShortCenter("Echec Photo : "+err.message);
            });
    }
}

////////////////////////////////////////////////////////////////////////////////
class VueJeuController {

    static setEvents() { // définition des "handlers" d'événements sur la page
        $(document).on("pagebeforeshow", "#vueJeu", function () {this.init();}.bind(this));
        $("#btnJouerCiseau").on("click",  function(){this.jouer(_modele_js__WEBPACK_IMPORTED_MODULE_0__["Shifumi"].CISEAU);}.bind(this));
        $("#btnJouerFeuille").on("click", function(){this.jouer(_modele_js__WEBPACK_IMPORTED_MODULE_0__["Shifumi"].FEUILLE);}.bind(this));
        $("#btnJouerPierre").on("click",  function(){this.jouer(_modele_js__WEBPACK_IMPORTED_MODULE_0__["Shifumi"].PIERRE);}.bind(this));
        $("#btnNouveauCoup").on("click",  function(){this.nouveauCoup();}.bind(this));
        $("#btnFinPartie").on("click",    function(){this.finPartie();}.bind(this));
    }

    static init() { // initialisation de la page
        // on active et on montre tous les boutons du joueur
        $("button[id^=btnJouer]").prop('disabled', false).show();
        // on cache toutes les réponses de la machine
        $("img[id^=machine]").hide();
        // on cache la div resultat
        $("#resultat").hide();
    }

    static jouer(coupJoueur) { // le joueur a choisi son coup
        // On interroge le modèle pour voir le résultat du nouveau coup
        var resultat = session.partieEnCours.nouveauCoup(coupJoueur);
        // Le score a changé => on sauvegarde la partie en cours
        _modele_js__WEBPACK_IMPORTED_MODULE_0__["JoueurDAO"].saveJoueur(session.partieEnCours.joueur);
        // Et on met à jour la vue :
        // 1. on désactive le bouton cliqué par le joueur et on cache les autres boutons
        switch (coupJoueur) {
            case _modele_js__WEBPACK_IMPORTED_MODULE_0__["Shifumi"].CISEAU :
                $("#btnJouerCiseau").prop('disabled', true);
                $("#btnJouerFeuille").hide();
                $("#btnJouerPierre").hide();
                break;
            case _modele_js__WEBPACK_IMPORTED_MODULE_0__["Shifumi"].FEUILLE :
                $("#btnJouerFeuille").prop('disabled', true);
                $("#btnJouerCiseau").hide();
                $("#btnJouerPierre").hide();
                break;
            case _modele_js__WEBPACK_IMPORTED_MODULE_0__["Shifumi"].PIERRE :
                $("#btnJouerPierre").prop('disabled', true);
                $("#btnJouerCiseau").hide();
                $("#btnJouerFeuille").hide();
        }
        // 2. on affiche le coup joué par la machine
        switch (resultat.mainMachine) {
            case _modele_js__WEBPACK_IMPORTED_MODULE_0__["Shifumi"].CISEAU :
                $("#machineCiseau").show();
                break;
            case _modele_js__WEBPACK_IMPORTED_MODULE_0__["Shifumi"].FEUILLE :
                $("#machineFeuille").show();
                break;
            case _modele_js__WEBPACK_IMPORTED_MODULE_0__["Shifumi"].PIERRE :
                $("#machinePierre").show();
        }
        // 3. on affiche le résultat
        var couleur = resultat.message === "Victoire" ? "green" : (resultat.message === "Défaite" ? "red" : "orange");
        $("#texteResultat").html(resultat.message).css("color", couleur);
        $("#resultat").show();
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
        $(document).on("pagebeforeshow", "#vueFin", function () {this.init();}.bind(this));
        $("#btnRetourJeu").on("click", function(){this.retourJeu();}.bind(this));
        $("#btnSupprimer").on("click", function(){this.supprimerJoueur();}.bind(this));
        $("#btnRetourAccueil").on("click", function(){this.retourAccueil();}.bind(this));
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
        _modele_js__WEBPACK_IMPORTED_MODULE_0__["JoueurDAO"].removeJoueur(session.partieEnCours.joueur.nom);
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
/* harmony import */ var _controleur_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controleur.js */ "./www/js/controleur.js");
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
        _controleur_js__WEBPACK_IMPORTED_MODULE_0__["init"]();
    }
};

app.initialize();


/***/ }),

/***/ "./www/js/modele.js":
/*!**************************!*\
  !*** ./www/js/modele.js ***!
  \**************************/
/*! exports provided: Picture, Player, TicTacToe, PlayersDao, PlayersUtils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Picture", function() { return Picture; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Player", function() { return Player; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TicTacToe", function() { return TicTacToe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayersDao", function() { return PlayersDao; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayersUtils", function() { return PlayersUtils; });
// Classe pour représenter une image
class Picture {
    
    constructor(data) {
        this.data = data;
    }

    // Renvoie l'image au format Base64 avec en-tête MIME
    getBase64() {
        return "data:image/jpeg;base64,"+this.data;
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
        this.board = [0,0,0,0,0,0,0,0,0]; 
        this.currentPlayer = Math.random() < 0.5 ?  player1 : player2; // Le premier joueur est choisi aléatoirement
    }

    // Changer de joueur courant
    switchCurrentPlayer(){
        if(this.currentPlayer === this.player1) this.currentPlayer = this.player2;
        else this.currentPlayer = this.player1;
    }
    
    // Le joueur courant joue en caseId
    play(caseId) {
      this.board[caseId]=this.currentPlayer.id;
    }

    // Renvoie vrai si le joueur courant a gagné (on vérifie "brut force" toutes les possibilités)
    isWin() { 
        const id = this.currentPlayer.id;
        return( this.board[0] == id && this.board[1] == id && this.board[2] == id ||
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
    isDrawn(){
        return this.board.find(element => element === 0) === undefined;
    }
}

// Classe pour gérer la persistance d'un tableau de joueurs
class PlayersDao {
  
    // Sauvegarde le tableau de joueurs dans le local storage
    static savePlayers(players){
        window.localStorage.setItem("players", JSON.stringify(players));
    }

    // Récupère le tableau de joueurs dans le local storage
    static getAllPlayers(){
        const stringPlayers = window.localStorage.getItem("players");
        // Si tableau non stocké, on renvoie un tableau vide
        if(stringPlayers === null)
            return new Array();
        else 
            return JSON.parse(stringPlayers);       
    }

}

// Classe pour manipuler un tableau de joueurs
class PlayersUtils {

    // Recherche un joueur par son nom dans un tableau de joueurs
    static findPlayerByNameInArray(players, playerName){
        return players.find(element => element.name == playerName);
    }
     
    // Met à jour ou ajoute un joueur dans le tableau de joueurs
    static addOrUpdatePlayerInArray(players, player) {
        const {id, ...partialPlayer} = player; // partialPlayer = player moins l'id qu'on ne veut pas enregistrer
        const playerIndex = players.findIndex(element => element.name == player.name);
        if (playerIndex != -1) {                       
            players[playerIndex] = partialPlayer; // Si le joueur existe déjà, on le met à jour
        } else { 
            players.push(partialPlayer); // Sinon on l'ajoute à la fin
        }  
    }
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vd3d3L2pzL2NvbnRyb2xldXIuanMiLCJ3ZWJwYWNrOi8vLy4vd3d3L2pzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3d3dy9qcy9tb2RlbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRXNDOztBQUV0QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLHdCQUF3QjtBQUN4QixxRUFBcUUsYUFBYTtBQUNsRix1REFBdUQsdUJBQXVCO0FBQzlFLDhDQUE4QyxxQkFBcUI7QUFDbkUsK0NBQStDLHFCQUFxQjtBQUNwRTs7QUFFQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQkFBcUIsb0RBQWdCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxzQ0FBc0MsaURBQWE7QUFDbkQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSx3Q0FBd0Msa0RBQWMsd0JBQXdCO0FBQzlFO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxRQUFRLHFEQUFpQjtBQUN6QjtBQUNBLDZEQUE2RDtBQUM3RDtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsd0JBQXdCO0FBQ3hCLGlFQUFpRSxhQUFhO0FBQzlFLHFEQUFxRCxXQUFXLGtEQUFjLFVBQVU7QUFDeEYscURBQXFELFdBQVcsa0RBQWMsV0FBVztBQUN6RixxREFBcUQsV0FBVyxrREFBYyxVQUFVO0FBQ3hGLHFEQUFxRCxvQkFBb0I7QUFDekUscURBQXFELGtCQUFrQjtBQUN2RTs7QUFFQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBLFFBQVEsb0RBQWdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixrREFBYztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixrREFBYztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixrREFBYztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsa0RBQWM7QUFDL0I7QUFDQTtBQUNBLGlCQUFpQixrREFBYztBQUMvQjtBQUNBO0FBQ0EsaUJBQWlCLGtEQUFjO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHdCQUF3QjtBQUN4QixpRUFBaUUsYUFBYTtBQUM5RSxrREFBa0Qsa0JBQWtCO0FBQ3BFLGtEQUFrRCx3QkFBd0I7QUFDMUUsc0RBQXNELHNCQUFzQjtBQUM1RTs7QUFFQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsUUFBUSxvREFBZ0I7QUFDeEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7Ozs7QUM3TUE7QUFBQTtBQUFBO0FBQzhDOztBQUU5QztBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsbURBQWU7QUFDdkI7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7OztBQ2xCQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNPOztBQUVQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDOztBQUVBOztBQUVBO0FBQ087O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ087O0FBRVA7QUFDQTtBQUNBO0FBQ0EseUM7QUFDQSxzRUFBc0U7QUFDdEU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDO0FBQ0E7O0FBRUE7O0FBRUE7QUFDTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxxQkFBcUIsVUFBVTtBQUM5QztBQUNBLGdDO0FBQ0EsaURBQWlEO0FBQ2pELFNBQVMsTztBQUNULHdDQUF3QztBQUN4QyxTO0FBQ0E7QUFDQSIsImZpbGUiOiJqcy9zaGlmdW1pLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vd3d3L2pzL2luZGV4LmpzXCIpO1xuIiwiLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIE1vZHVsZSBDb250cm9sZXVyIGNvbnRpZW50IDpcbi8vIC0gdW4gb2JqZXQgc2Vzc2lvbiBjb250ZW5hbnQgbGVzIGRvbm7DqWVzIG1vZMOpbGlzYW50IGwnw6l0YXQgZGUgbCdhcHBsaWNhdGlvblxuLy8gLSB1bmUgZm9uY3Rpb24gXCJpbml0XCIgcG91ciBpbml0aWFsaXNlciBsJ2FwcGxpY2F0aW9uXG4vLyAtIHVuZSBjbGFzc2UgXCJjb250cm9sbGVyXCIgYWJzdHJhaXRlIHBvdXIgY2hhcXVlIHBhZ2Vcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmltcG9ydCAqIGFzIG1vZGVsZSBmcm9tIFwiLi9tb2RlbGUuanNcIjsgLy8gbGUgY29udHLDtGxldXIgdXRpbGlzZSBsZSBtb2TDqGxlXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBTZXNzaW9uIDogdmFyaWFibGVzIHF1aSByZXByw6lzZW50ZW50IGwnw6l0YXQgZGUgbCdhcHBsaWNhdGlvblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxudmFyIHNlc3Npb24gPSB7XG4gICAgam91ZXVyRW5Db3VyczogbnVsbCwgLy8gTGUgam91ZXVyIGNvdXJhbnRcbiAgICBwYXJ0aWVFbkNvdXJzOiBudWxsICAvLyBMYSBwYXJ0aWUgZW4gdHJhaW4gZCfDqnRyZSBqb3XDqWVcbn07XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBpbml0IDogZXjDqWN1dMOpZSBhdSBkw6ltYXJyYWdlIGRlIGwnYXBwbGljYXRpb24gKHZvaXIgZmljaGllciBpbmRleC5qcylcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0KCkge1xuICAgIC8vIE9uIGR1cGxpcXVlIEhlYWRlciBldCBGb290ZXIgc3VyIGNoYXF1ZSBwYWdlIChzYXVmIGxhIHByZW1pw6hyZSAhKVxuICAgIHZhciAkaGVhZGVyPSQoJyNzaGlmdW1pSGVhZGVyJyk7XG4gICAgdmFyICRmb290ZXI9JCgnI3NoaWZ1bWlGb290ZXInKTtcbiAgICAkKCdkaXZbZGF0YS1yb2xlPVwicGFnZVwiXScpLmVhY2goZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgaWYgKGkpIHtcbiAgICAgICAgICAgIHZhciAkY29udGVudCA9ICQodGhpcykuY2hpbGRyZW4oXCI6Zmlyc3RcIik7XG4gICAgICAgICAgICAkaGVhZGVyLmNsb25lKCkuaW5zZXJ0QmVmb3JlKCRjb250ZW50KTtcbiAgICAgICAgICAgICRjb250ZW50LmFmdGVyKCRmb290ZXIuY2xvbmUoKSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBPbiBpbml0aWFsaXNlIGxlcyBwYWdlcyAoYXR0YWNoZXIgbGVzIFwiaGFuZGxlcnNcIiBkJ8OpdsOpbmVtZW50cyBwcm9wcmVzIMOgIGNoYXF1ZSBwYWdlKVxuICAgIFZ1ZUFjY3VlaWxDb250cm9sbGVyLnNldEV2ZW50cygpO1xuICAgIFZ1ZUpldUNvbnRyb2xsZXIuc2V0RXZlbnRzKCk7XG4gICAgVnVlRmluQ29udHJvbGxlci5zZXRFdmVudHMoKTtcbiAgICAvLyBPbiBuYXZpZ3VlIHZlcnMgbGEgcGFnZSBkJ2FjY3VlaWxcbiAgICAkLm1vYmlsZS5jaGFuZ2VQYWdlKFwiI3Z1ZUFjY3VlaWxcIik7XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBDb250cm9sZXVycyBkZSBwYWdlcyA6IDEgY29udHLDtGxldXIgcGFyIHBhZ2UsIHF1aSBwb3J0ZSBsZSBub20gZGUgbGEgcGFnZVxuLy8gIGV0IGNvbnRpZW50IGxlcyBcImhhbmRsZXJzXCIgZGVzIMOpdsOpbmVtZW50cyBhc3NvY2nDqXMgw6AgY2V0dGUgcGFnZVxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgVnVlQWNjdWVpbENvbnRyb2xsZXIge1xuXG4gICAgc3RhdGljIHNldEV2ZW50cygpIHsgLy8gZMOpZmluaXRpb24gZGVzIFwiaGFuZGxlcnNcIiBkJ8OpdsOpbmVtZW50cyBzdXIgbGEgcGFnZVxuICAgICAgICAkKGRvY3VtZW50KS5vbihcInBhZ2ViZWZvcmVzaG93XCIsIFwiI3Z1ZUFjY3VlaWxcIiwgZnVuY3Rpb24gKCkge3RoaXMuaW5pdCgpO30uYmluZCh0aGlzKSk7XG4gICAgICAgICQoXCIjYnRuTm91dmVsbGVQYXJ0aWVcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbigpe3RoaXMubm91dmVsbGVQYXJ0aWUoKTt9LmJpbmQodGhpcykpO1xuICAgICAgICAkKFwiI2J0blBob3RvXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXt0aGlzLnByZW5kcmVQaG90bygpO30uYmluZCh0aGlzKSk7XG4gICAgICAgICQoXCIjbm9tSm91ZXVyXCIpLm9uKFwiaW5wdXRcIiwgZnVuY3Rpb24oKXt0aGlzLmNoYXJnZUpvdWV1cigpO30uYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGluaXQoKSB7IC8vIGluaXRpYWxpc2F0aW9uIGRlIGxhIHBhZ2VcbiAgICAgICAgJChcIiNub21Kb3VldXJcIikudmFsKFwiXCIpO1xuICAgICAgICAkKFwiI2ltZ1Bob3RvXCIpLmF0dHIoXCJzcmNcIixcIlwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY2hhcmdlSm91ZXVyKCkge1xuICAgICAgICB2YXIgbm9tID0gJChcIiNub21Kb3VldXJcIikudmFsKCk7XG4gICAgICAgIHZhciBqb3VldXIgPSBtb2RlbGUuSm91ZXVyREFPLmxvYWRKb3VldXIobm9tKTtcbiAgICAgICAgaWYgKGpvdWV1cikge1xuICAgICAgICAgICAgc2Vzc2lvbi5qb3VldXJFbkNvdXJzID0gam91ZXVyO1xuICAgICAgICAgICAgJChcIiNpbWdQaG90b1wiKS5hdHRyKFwic3JjXCIsIGpvdWV1ci5waG90byk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZXNzaW9uLmpvdWV1ckVuQ291cnM9bmV3IG1vZGVsZS5Kb3VldXIobm9tKTtcbiAgICAgICAgICAgICQoXCIjaW1nUGhvdG9cIikuYXR0cihcInNyY1wiLCBcIlwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBub3V2ZWxsZVBhcnRpZSgpIHtcbiAgICAgICAgLy8gb24gcsOpY3Vww6hyZSBkZSBsJ2luZm9ybWF0aW9uIGRlIGxhIHZ1ZSBlbiBjb3Vyc1xuICAgICAgICB2YXIgbm9tSm91ZXVyID0gJChcIiNub21Kb3VldXJcIikudmFsKCk7XG4gICAgICAgIGlmIChub21Kb3VldXIgPT09IFwiXCIpIHtcbiAgICAgICAgICAgIHBsdWdpbnMudG9hc3Quc2hvd1Nob3J0Q2VudGVyKFwiU2Fpc2lyIHVuIG5vbSBkZSBqb3VldXJcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBPbiB1dGlsaXNlIGxlIG1vZMOobGUgcG91ciBjcsOpZXIgdW5lIG5vdXZlbGxlIHBhcnRpZVxuICAgICAgICAgICAgc2Vzc2lvbi5wYXJ0aWVFbkNvdXJzID0gbmV3IG1vZGVsZS5TaGlmdW1pKHNlc3Npb24uam91ZXVyRW5Db3Vycyk7IC8vIGNoYXJnZSBsYSBwYXJ0aWUgZHUgam91ZXVyIGRlcHVpcyBsZSBsb2NhbHN0b3JhZ2VcbiAgICAgICAgICAgIC8vIE9uIFwicHJvcGFnZVwiIGxlIG5vbSBkdSBqb3VldXIgc3VyIHRvdXRlcyBsZXMgdnVlc1xuICAgICAgICAgICAgJCgnc3BhbltkYXRhLXJvbGU9XCJub21Kb3VldXJcIl0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmh0bWwoc2Vzc2lvbi5qb3VldXJFbkNvdXJzLm5vbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIE9uIFwicHJvcGFnZVwiIGxhIHBob3RvIGR1IGpvdWV1ciBzdXIgdG91dGVzIGxlcyB2dWVzXG4gICAgICAgICAgICAkKCdpbWdbZGF0YS1yb2xlPVwicGhvdG9Kb3VldXJcIl0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoXCJzcmNcIixzZXNzaW9uLmpvdWV1ckVuQ291cnMucGhvdG8pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyBFdCBvbiBwYXNzZSDDoCB1bmUgYXV0cmUgdnVlXG4gICAgICAgICAgICAkLm1vYmlsZS5jaGFuZ2VQYWdlKFwiI3Z1ZUpldVwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBwcmVuZHJlUGhvdG8oKSB7XG4gICAgICAgIG1vZGVsZS5Db3Jkb3ZhQVBJLnRha2VQaWN0dXJlKClcbiAgICAgICAgICAgIC50aGVuICggaW1hZ2VEYXRhID0+IHtcbiAgICAgICAgICAgICAgICBzZXNzaW9uLmpvdWV1ckVuQ291cnMucGhvdG89XCJkYXRhOmltYWdlL2pwZWc7YmFzZTY0LFwiK2ltYWdlRGF0YTtcbiAgICAgICAgICAgICAgICAkKFwiI2ltZ1Bob3RvXCIpLmF0dHIoXCJzcmNcIixzZXNzaW9uLmpvdWV1ckVuQ291cnMucGhvdG8pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCggZXJyID0+IHtcbiAgICAgICAgICAgICAgICBzZXNzaW9uLmpvdWV1ckVuQ291cnMucGhvdG89XCJcIjtcbiAgICAgICAgICAgICAgICAkKFwiI2ltZ1Bob3RvXCIpLmF0dHIoXCJzcmNcIixcIlwiKTtcbiAgICAgICAgICAgICAgICBwbHVnaW5zLnRvYXN0LnNob3dTaG9ydENlbnRlcihcIkVjaGVjIFBob3RvIDogXCIrZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuY2xhc3MgVnVlSmV1Q29udHJvbGxlciB7XG5cbiAgICBzdGF0aWMgc2V0RXZlbnRzKCkgeyAvLyBkw6lmaW5pdGlvbiBkZXMgXCJoYW5kbGVyc1wiIGQnw6l2w6luZW1lbnRzIHN1ciBsYSBwYWdlXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKFwicGFnZWJlZm9yZXNob3dcIiwgXCIjdnVlSmV1XCIsIGZ1bmN0aW9uICgpIHt0aGlzLmluaXQoKTt9LmJpbmQodGhpcykpO1xuICAgICAgICAkKFwiI2J0bkpvdWVyQ2lzZWF1XCIpLm9uKFwiY2xpY2tcIiwgIGZ1bmN0aW9uKCl7dGhpcy5qb3Vlcihtb2RlbGUuU2hpZnVtaS5DSVNFQVUpO30uYmluZCh0aGlzKSk7XG4gICAgICAgICQoXCIjYnRuSm91ZXJGZXVpbGxlXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXt0aGlzLmpvdWVyKG1vZGVsZS5TaGlmdW1pLkZFVUlMTEUpO30uYmluZCh0aGlzKSk7XG4gICAgICAgICQoXCIjYnRuSm91ZXJQaWVycmVcIikub24oXCJjbGlja1wiLCAgZnVuY3Rpb24oKXt0aGlzLmpvdWVyKG1vZGVsZS5TaGlmdW1pLlBJRVJSRSk7fS5iaW5kKHRoaXMpKTtcbiAgICAgICAgJChcIiNidG5Ob3V2ZWF1Q291cFwiKS5vbihcImNsaWNrXCIsICBmdW5jdGlvbigpe3RoaXMubm91dmVhdUNvdXAoKTt9LmJpbmQodGhpcykpO1xuICAgICAgICAkKFwiI2J0bkZpblBhcnRpZVwiKS5vbihcImNsaWNrXCIsICAgIGZ1bmN0aW9uKCl7dGhpcy5maW5QYXJ0aWUoKTt9LmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHN0YXRpYyBpbml0KCkgeyAvLyBpbml0aWFsaXNhdGlvbiBkZSBsYSBwYWdlXG4gICAgICAgIC8vIG9uIGFjdGl2ZSBldCBvbiBtb250cmUgdG91cyBsZXMgYm91dG9ucyBkdSBqb3VldXJcbiAgICAgICAgJChcImJ1dHRvbltpZF49YnRuSm91ZXJdXCIpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpLnNob3coKTtcbiAgICAgICAgLy8gb24gY2FjaGUgdG91dGVzIGxlcyByw6lwb25zZXMgZGUgbGEgbWFjaGluZVxuICAgICAgICAkKFwiaW1nW2lkXj1tYWNoaW5lXVwiKS5oaWRlKCk7XG4gICAgICAgIC8vIG9uIGNhY2hlIGxhIGRpdiByZXN1bHRhdFxuICAgICAgICAkKFwiI3Jlc3VsdGF0XCIpLmhpZGUoKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgam91ZXIoY291cEpvdWV1cikgeyAvLyBsZSBqb3VldXIgYSBjaG9pc2kgc29uIGNvdXBcbiAgICAgICAgLy8gT24gaW50ZXJyb2dlIGxlIG1vZMOobGUgcG91ciB2b2lyIGxlIHLDqXN1bHRhdCBkdSBub3V2ZWF1IGNvdXBcbiAgICAgICAgdmFyIHJlc3VsdGF0ID0gc2Vzc2lvbi5wYXJ0aWVFbkNvdXJzLm5vdXZlYXVDb3VwKGNvdXBKb3VldXIpO1xuICAgICAgICAvLyBMZSBzY29yZSBhIGNoYW5nw6kgPT4gb24gc2F1dmVnYXJkZSBsYSBwYXJ0aWUgZW4gY291cnNcbiAgICAgICAgbW9kZWxlLkpvdWV1ckRBTy5zYXZlSm91ZXVyKHNlc3Npb24ucGFydGllRW5Db3Vycy5qb3VldXIpO1xuICAgICAgICAvLyBFdCBvbiBtZXQgw6Agam91ciBsYSB2dWUgOlxuICAgICAgICAvLyAxLiBvbiBkw6lzYWN0aXZlIGxlIGJvdXRvbiBjbGlxdcOpIHBhciBsZSBqb3VldXIgZXQgb24gY2FjaGUgbGVzIGF1dHJlcyBib3V0b25zXG4gICAgICAgIHN3aXRjaCAoY291cEpvdWV1cikge1xuICAgICAgICAgICAgY2FzZSBtb2RlbGUuU2hpZnVtaS5DSVNFQVUgOlxuICAgICAgICAgICAgICAgICQoXCIjYnRuSm91ZXJDaXNlYXVcIikucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAkKFwiI2J0bkpvdWVyRmV1aWxsZVwiKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgJChcIiNidG5Kb3VlclBpZXJyZVwiKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIG1vZGVsZS5TaGlmdW1pLkZFVUlMTEUgOlxuICAgICAgICAgICAgICAgICQoXCIjYnRuSm91ZXJGZXVpbGxlXCIpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgJChcIiNidG5Kb3VlckNpc2VhdVwiKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgJChcIiNidG5Kb3VlclBpZXJyZVwiKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIG1vZGVsZS5TaGlmdW1pLlBJRVJSRSA6XG4gICAgICAgICAgICAgICAgJChcIiNidG5Kb3VlclBpZXJyZVwiKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgICAgICAgICAgICQoXCIjYnRuSm91ZXJDaXNlYXVcIikuaGlkZSgpO1xuICAgICAgICAgICAgICAgICQoXCIjYnRuSm91ZXJGZXVpbGxlXCIpLmhpZGUoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyAyLiBvbiBhZmZpY2hlIGxlIGNvdXAgam91w6kgcGFyIGxhIG1hY2hpbmVcbiAgICAgICAgc3dpdGNoIChyZXN1bHRhdC5tYWluTWFjaGluZSkge1xuICAgICAgICAgICAgY2FzZSBtb2RlbGUuU2hpZnVtaS5DSVNFQVUgOlxuICAgICAgICAgICAgICAgICQoXCIjbWFjaGluZUNpc2VhdVwiKS5zaG93KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIG1vZGVsZS5TaGlmdW1pLkZFVUlMTEUgOlxuICAgICAgICAgICAgICAgICQoXCIjbWFjaGluZUZldWlsbGVcIikuc2hvdygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBtb2RlbGUuU2hpZnVtaS5QSUVSUkUgOlxuICAgICAgICAgICAgICAgICQoXCIjbWFjaGluZVBpZXJyZVwiKS5zaG93KCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gMy4gb24gYWZmaWNoZSBsZSByw6lzdWx0YXRcbiAgICAgICAgdmFyIGNvdWxldXIgPSByZXN1bHRhdC5tZXNzYWdlID09PSBcIlZpY3RvaXJlXCIgPyBcImdyZWVuXCIgOiAocmVzdWx0YXQubWVzc2FnZSA9PT0gXCJEw6lmYWl0ZVwiID8gXCJyZWRcIiA6IFwib3JhbmdlXCIpO1xuICAgICAgICAkKFwiI3RleHRlUmVzdWx0YXRcIikuaHRtbChyZXN1bHRhdC5tZXNzYWdlKS5jc3MoXCJjb2xvclwiLCBjb3VsZXVyKTtcbiAgICAgICAgJChcIiNyZXN1bHRhdFwiKS5zaG93KCk7XG4gICAgfVxuXG4gICAgc3RhdGljIG5vdXZlYXVDb3VwKCkge1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZmluUGFydGllKCkge1xuICAgICAgICAkLm1vYmlsZS5jaGFuZ2VQYWdlKFwiI3Z1ZUZpblwiKTtcbiAgICB9XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5jbGFzcyBWdWVGaW5Db250cm9sbGVyIHtcblxuICAgIHN0YXRpYyBzZXRFdmVudHMoKSB7IC8vIGTDqWZpbml0aW9uIGRlcyBcImhhbmRsZXJzXCIgZCfDqXbDqW5lbWVudHMgc3VyIGxhIHBhZ2VcbiAgICAgICAgJChkb2N1bWVudCkub24oXCJwYWdlYmVmb3Jlc2hvd1wiLCBcIiN2dWVGaW5cIiwgZnVuY3Rpb24gKCkge3RoaXMuaW5pdCgpO30uYmluZCh0aGlzKSk7XG4gICAgICAgICQoXCIjYnRuUmV0b3VySmV1XCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXt0aGlzLnJldG91ckpldSgpO30uYmluZCh0aGlzKSk7XG4gICAgICAgICQoXCIjYnRuU3VwcHJpbWVyXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXt0aGlzLnN1cHByaW1lckpvdWV1cigpO30uYmluZCh0aGlzKSk7XG4gICAgICAgICQoXCIjYnRuUmV0b3VyQWNjdWVpbFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7dGhpcy5yZXRvdXJBY2N1ZWlsKCk7fS5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaW5pdCgpIHsgLy8gaW5pdGlhbGlzYXRpb24gZGUgbGEgcGFnZVxuICAgICAgICAkKFwiI25iVmljdG9pcmVzXCIpLmh0bWwoc2Vzc2lvbi5wYXJ0aWVFbkNvdXJzLmpvdWV1ci52aWN0b2lyZXMpO1xuICAgICAgICAkKFwiI25iTnVsc1wiKS5odG1sKHNlc3Npb24ucGFydGllRW5Db3Vycy5qb3VldXIubnVscyk7XG4gICAgICAgICQoXCIjbmJEZWZhaXRlc1wiKS5odG1sKHNlc3Npb24ucGFydGllRW5Db3Vycy5qb3VldXIuZGVmYWl0ZXMpO1xuICAgIH1cblxuICAgIHN0YXRpYyByZXRvdXJKZXUoKSB7XG4gICAgICAgICQubW9iaWxlLmNoYW5nZVBhZ2UoXCIjdnVlSmV1XCIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBzdXBwcmltZXJKb3VldXIoKSB7XG4gICAgICAgIG1vZGVsZS5Kb3VldXJEQU8ucmVtb3ZlSm91ZXVyKHNlc3Npb24ucGFydGllRW5Db3Vycy5qb3VldXIubm9tKTtcbiAgICAgICAgdGhpcy5yZXRvdXJBY2N1ZWlsKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIHJldG91ckFjY3VlaWwoKSB7XG4gICAgICAgICQubW9iaWxlLmNoYW5nZVBhZ2UoXCIjdnVlQWNjdWVpbFwiKTtcbiAgICB9XG59IiwiLy8gb24gaW1wb3J0ZSB1bmlxdWVtZW50IGxlIG1vZHVsZSBjb250csO0bGV1clxuaW1wb3J0ICogYXMgY29udHJvbGV1ciBmcm9tIFwiLi9jb250cm9sZXVyLmpzXCI7XG5cbnZhciBhcHAgPSB7XG4gICAgLy8gQXBwbGljYXRpb24gQ29uc3RydWN0b3JcbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RldmljZXJlYWR5JywgdGhpcy5vbkRldmljZVJlYWR5LmJpbmQodGhpcyksIGZhbHNlKTtcbiAgICB9LFxuXG4gICAgLy8gZGV2aWNlcmVhZHkgRXZlbnQgSGFuZGxlclxuICAgIC8vXG4gICAgLy8gQmluZCBhbnkgY29yZG92YSBldmVudHMgaGVyZS4gQ29tbW9uIGV2ZW50cyBhcmU6XG4gICAgLy8gJ3BhdXNlJywgJ3Jlc3VtZScsIGV0Yy5cbiAgICBvbkRldmljZVJlYWR5OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnRyb2xldXIuaW5pdCgpO1xuICAgIH1cbn07XG5cbmFwcC5pbml0aWFsaXplKCk7XG4iLCIvLyBDbGFzc2UgcG91ciByZXByw6lzZW50ZXIgdW5lIGltYWdlXHJcbmV4cG9ydCBjbGFzcyBQaWN0dXJlIHtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IoZGF0YSkge1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmVudm9pZSBsJ2ltYWdlIGF1IGZvcm1hdCBCYXNlNjQgYXZlYyBlbi10w6p0ZSBNSU1FXHJcbiAgICBnZXRCYXNlNjQoKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiZGF0YTppbWFnZS9qcGVnO2Jhc2U2NCxcIit0aGlzLmRhdGE7XHJcbiAgICB9XHJcbiAgICAgIFxyXG59O1xyXG5cclxuLy8gQ2xhc3NlIHBvdXIgcmVwcsOpc2VudGVyIHVuIGpvdWV1clxyXG5leHBvcnQgY2xhc3MgUGxheWVyIHtcclxuICBcclxuICAgIGNvbnN0cnVjdG9yKGlkLCBuYW1lLCBwaWN0dXJlLCBuYldpbiA9IDAsIG5iTG9zcyA9IDAsIG5iRHJhd24gPSAwKSB7XHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5waWN0dXJlID0gcGljdHVyZTtcclxuICAgICAgICB0aGlzLm5iV2luID0gbmJXaW47XHJcbiAgICAgICAgdGhpcy5uYkxvc3MgPSBuYkxvc3M7XHJcbiAgICAgICAgdGhpcy5uYkRyYXduID0gbmJEcmF3bjtcclxuICAgIH1cclxufVxyXG5cclxuLy8gQ2xhc3NlIHBvdXIgcmVwcsOpc2VudGVyIHVuZSBwYXJ0aWUgZGUgVGljVGFjVG9lXHJcbmV4cG9ydCBjbGFzcyBUaWNUYWNUb2Uge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBsYXllcjEsIHBsYXllcjIpIHtcclxuICAgICAgICB0aGlzLnBsYXllcjEgPSBwbGF5ZXIxO1xyXG4gICAgICAgIHRoaXMucGxheWVyMiA9IHBsYXllcjI7XHJcbiAgICAgICAgdGhpcy5ib2FyZCA9IFswLDAsMCwwLDAsMCwwLDAsMF07IFxyXG4gICAgICAgIHRoaXMuY3VycmVudFBsYXllciA9IE1hdGgucmFuZG9tKCkgPCAwLjUgPyAgcGxheWVyMSA6IHBsYXllcjI7IC8vIExlIHByZW1pZXIgam91ZXVyIGVzdCBjaG9pc2kgYWzDqWF0b2lyZW1lbnRcclxuICAgIH1cclxuXHJcbiAgICAvLyBDaGFuZ2VyIGRlIGpvdWV1ciBjb3VyYW50XHJcbiAgICBzd2l0Y2hDdXJyZW50UGxheWVyKCl7XHJcbiAgICAgICAgaWYodGhpcy5jdXJyZW50UGxheWVyID09PSB0aGlzLnBsYXllcjEpIHRoaXMuY3VycmVudFBsYXllciA9IHRoaXMucGxheWVyMjtcclxuICAgICAgICBlbHNlIHRoaXMuY3VycmVudFBsYXllciA9IHRoaXMucGxheWVyMTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gTGUgam91ZXVyIGNvdXJhbnQgam91ZSBlbiBjYXNlSWRcclxuICAgIHBsYXkoY2FzZUlkKSB7XHJcbiAgICAgIHRoaXMuYm9hcmRbY2FzZUlkXT10aGlzLmN1cnJlbnRQbGF5ZXIuaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmVudm9pZSB2cmFpIHNpIGxlIGpvdWV1ciBjb3VyYW50IGEgZ2FnbsOpIChvbiB2w6lyaWZpZSBcImJydXQgZm9yY2VcIiB0b3V0ZXMgbGVzIHBvc3NpYmlsaXTDqXMpXHJcbiAgICBpc1dpbigpIHsgXHJcbiAgICAgICAgY29uc3QgaWQgPSB0aGlzLmN1cnJlbnRQbGF5ZXIuaWQ7XHJcbiAgICAgICAgcmV0dXJuKCB0aGlzLmJvYXJkWzBdID09IGlkICYmIHRoaXMuYm9hcmRbMV0gPT0gaWQgJiYgdGhpcy5ib2FyZFsyXSA9PSBpZCB8fFxyXG4gICAgICAgICAgICAgICAgdGhpcy5ib2FyZFszXSA9PSBpZCAmJiB0aGlzLmJvYXJkWzRdID09IGlkICYmIHRoaXMuYm9hcmRbNV0gPT0gaWQgfHxcclxuICAgICAgICAgICAgICAgIHRoaXMuYm9hcmRbNl0gPT0gaWQgJiYgdGhpcy5ib2FyZFs3XSA9PSBpZCAmJiB0aGlzLmJvYXJkWzhdID09IGlkIHx8IFxyXG4gICAgICAgICAgICAgICAgdGhpcy5ib2FyZFswXSA9PSBpZCAmJiB0aGlzLmJvYXJkWzNdID09IGlkICYmIHRoaXMuYm9hcmRbNl0gPT0gaWQgfHwgXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJvYXJkWzFdID09IGlkICYmIHRoaXMuYm9hcmRbNF0gPT0gaWQgJiYgdGhpcy5ib2FyZFs3XSA9PSBpZCB8fFxyXG4gICAgICAgICAgICAgICAgdGhpcy5ib2FyZFsyXSA9PSBpZCAmJiB0aGlzLmJvYXJkWzVdID09IGlkICYmIHRoaXMuYm9hcmRbOF0gPT0gaWQgfHwgXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJvYXJkWzBdID09IGlkICYmIHRoaXMuYm9hcmRbNF0gPT0gaWQgJiYgdGhpcy5ib2FyZFs4XSA9PSBpZCB8fCBcclxuICAgICAgICAgICAgICAgIHRoaXMuYm9hcmRbMl0gPT0gaWQgJiYgdGhpcy5ib2FyZFs0XSA9PSBpZCAmJiB0aGlzLmJvYXJkWzZdID09IGlkIFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmVudm9pZSB2cmFpIHMnaWwgeSBhIG1hdGNoIG51bCAoYXVjdW5lIGNhc2UpXHJcbiAgICBpc0RyYXduKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYm9hcmQuZmluZChlbGVtZW50ID0+IGVsZW1lbnQgPT09IDApID09PSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIENsYXNzZSBwb3VyIGfDqXJlciBsYSBwZXJzaXN0YW5jZSBkJ3VuIHRhYmxlYXUgZGUgam91ZXVyc1xyXG5leHBvcnQgY2xhc3MgUGxheWVyc0RhbyB7XHJcbiAgXHJcbiAgICAvLyBTYXV2ZWdhcmRlIGxlIHRhYmxlYXUgZGUgam91ZXVycyBkYW5zIGxlIGxvY2FsIHN0b3JhZ2VcclxuICAgIHN0YXRpYyBzYXZlUGxheWVycyhwbGF5ZXJzKXtcclxuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwbGF5ZXJzXCIsIEpTT04uc3RyaW5naWZ5KHBsYXllcnMpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSw6ljdXDDqHJlIGxlIHRhYmxlYXUgZGUgam91ZXVycyBkYW5zIGxlIGxvY2FsIHN0b3JhZ2VcclxuICAgIHN0YXRpYyBnZXRBbGxQbGF5ZXJzKCl7XHJcbiAgICAgICAgY29uc3Qgc3RyaW5nUGxheWVycyA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInBsYXllcnNcIik7XHJcbiAgICAgICAgLy8gU2kgdGFibGVhdSBub24gc3RvY2vDqSwgb24gcmVudm9pZSB1biB0YWJsZWF1IHZpZGVcclxuICAgICAgICBpZihzdHJpbmdQbGF5ZXJzID09PSBudWxsKVxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgZWxzZSBcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2Uoc3RyaW5nUGxheWVycyk7ICAgICAgIFxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuLy8gQ2xhc3NlIHBvdXIgbWFuaXB1bGVyIHVuIHRhYmxlYXUgZGUgam91ZXVyc1xyXG5leHBvcnQgY2xhc3MgUGxheWVyc1V0aWxzIHtcclxuXHJcbiAgICAvLyBSZWNoZXJjaGUgdW4gam91ZXVyIHBhciBzb24gbm9tIGRhbnMgdW4gdGFibGVhdSBkZSBqb3VldXJzXHJcbiAgICBzdGF0aWMgZmluZFBsYXllckJ5TmFtZUluQXJyYXkocGxheWVycywgcGxheWVyTmFtZSl7XHJcbiAgICAgICAgcmV0dXJuIHBsYXllcnMuZmluZChlbGVtZW50ID0+IGVsZW1lbnQubmFtZSA9PSBwbGF5ZXJOYW1lKTtcclxuICAgIH1cclxuICAgICBcclxuICAgIC8vIE1ldCDDoCBqb3VyIG91IGFqb3V0ZSB1biBqb3VldXIgZGFucyBsZSB0YWJsZWF1IGRlIGpvdWV1cnNcclxuICAgIHN0YXRpYyBhZGRPclVwZGF0ZVBsYXllckluQXJyYXkocGxheWVycywgcGxheWVyKSB7XHJcbiAgICAgICAgY29uc3Qge2lkLCAuLi5wYXJ0aWFsUGxheWVyfSA9IHBsYXllcjsgLy8gcGFydGlhbFBsYXllciA9IHBsYXllciBtb2lucyBsJ2lkIHF1J29uIG5lIHZldXQgcGFzIGVucmVnaXN0cmVyXHJcbiAgICAgICAgY29uc3QgcGxheWVySW5kZXggPSBwbGF5ZXJzLmZpbmRJbmRleChlbGVtZW50ID0+IGVsZW1lbnQubmFtZSA9PSBwbGF5ZXIubmFtZSk7XHJcbiAgICAgICAgaWYgKHBsYXllckluZGV4ICE9IC0xKSB7ICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgcGxheWVyc1twbGF5ZXJJbmRleF0gPSBwYXJ0aWFsUGxheWVyOyAvLyBTaSBsZSBqb3VldXIgZXhpc3RlIGTDqWrDoCwgb24gbGUgbWV0IMOgIGpvdXJcclxuICAgICAgICB9IGVsc2UgeyBcclxuICAgICAgICAgICAgcGxheWVycy5wdXNoKHBhcnRpYWxQbGF5ZXIpOyAvLyBTaW5vbiBvbiBsJ2Fqb3V0ZSDDoCBsYSBmaW5cclxuICAgICAgICB9ICBcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9