// Classe pour représenter une image
export class Picture {

    constructor(data) {
        this.data = data;
    }

    // Renvoie l'image au format Base64 avec en-tête MIME
    getBase64() {
        return "data:image/jpeg;base64," + this.data;
    }

};

// Classe pour représenter un joueur
export class Player {

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
export class TicTacToe {

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
export class PlayersDAO {

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
export class PlayersUtils {

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
export class CordovaAPI {
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
