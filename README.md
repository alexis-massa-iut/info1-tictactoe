﻿=========================================================================
                     Installation version ES6
=========================================================================

0. Installer webpack (pour pouvoir utiliser module ES6) https://www.npmjs.com/package/cordova-plugin-webpack
------------------------------------------------------------------------------------------------------------
npm install -D webpack@4 webpack-cli@3 webpack-dev-server@3


1. Créer et configurer le projet
-----------------------------------------------
cordova create DemoShifumi
cd DemoShifumi
cordova platform add browser
cordova platform add android@9
cordova plugin add cordova-plugin-splashscreen
cordova plugin add cordova-plugin-x-toast
cordova plugin add cordova-plugin-camera
cordova plugin add cordova-plugin-webpack

2. Copier le code de l'application
------------------------------------------------------------------------
A la racine du projet (répertoire DemoShifumi) :
- Remplacer le fichier config.xml existant par celui fourni dans le ZIP
- Remplacer le répertoire www existant par celui fourni dans le ZIP
- Copier le répertoire res fourni dans le ZIP
- copier le fichier webpack.congif.js

3. Lancer !
-----------
cordova run browser
ou
cordova run android