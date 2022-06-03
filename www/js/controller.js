////////////////////////////////////////////////////////////////////////////////
// Module Controleur contient :
// - un objet session contenant les données modélisant l'état de l'application
// - une fonction "init" pour initialiser l'application
// - une classe "controller" abstraite pour chaque page
////////////////////////////////////////////////////////////////////////////////

import * as model from "./model.js"; // le contrôleur utilise le modèle

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

export function init() {
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
        var allPlayers = model.PlayersDAO.getAllPlayers();
        var joueur = model.PlayersUtils.findPlayerByNameInArray(allPlayers, nom);
        if (joueur) {
            session.currentPlayer = joueur;
            $("#imgPhoto1").attr("src", joueur.picture);
        } else {
            session.currentPlayer = new model.Player(nom);
            $("#imgPhoto1").attr("src", "");

            session.players.push(session.currentPlayer);
        }
    }

    static chargeJoueur2() {
        var nom = $("#nomJoueur2").val();
        var allPlayers = model.PlayersDAO.getAllPlayers();
        var joueur = model.PlayersUtils.findPlayerByNameInArray(allPlayers, nom);
        if (joueur) {
            session.currentPlayer = joueur;
            $("#imgPhoto2").attr("src", joueur.picture);
        } else {
            session.currentPlayer = new model.Player(nom);
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
            session.partieEnCours = new model.TicTacToe(player1, player2); // charge la partie du joueur depuis le localstorage
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
        model.CordovaAPI.takePicture()
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
        model.CordovaAPI.takePicture()
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
        `${}` 

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
        model.PlayersDAO.removeJoueur(session.partieEnCours.joueur.nom);
        this.retourAccueil();
    }

    static retourAccueil() {
        $.mobile.changePage("#vueAccueil");
    }
}