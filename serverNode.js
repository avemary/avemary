let app = require('express')(),
http = require('http').Server(app),
io = require('socket.io')(http);

var i = 0,
    administrateur = true,
    nvoJoueur = true,
    equipes = [],
    joueurs = [],
    pointsdAcclamation = [],
    nbreJoueurs, typeJeu, joueursParEquipe, scoredAcclaclamation, socketActif;

io.sockets.on('connection', (socket) => {

//dès la connection, on vérifie le type du client
    socket.on('id', (identifiant) => {
        if (identifiant === "admin" & administrateur) {
            administrateur = false;
            admin = socket;
            socket.emit('connected');
            io.to(`${serverAngular}`).emit('adminconnected');
           
        
        } else if (identifiant === "JOUEUR " & nvoJoueur) {
            joueurs.push(socket);
            socket.i = i;
            socket.score = 0;
            socket.bouton = "blue";
            i += 1;
            socket.emit('index', i);
            io.to(`${admin.id}`).emit('newGamer', i);
            io.to(`${serverAngular.id}`).emit('newGamer', i);

        } else if (identifiant === "serverAngular") {
            serverAngular = socket;

        } else {
            socket.disconnect();
        }
    });

    //Si le client se déconnecte (à revoir)
    socket.on('disconnect', (socket) => {
        i -= 1;
        joueurs.splice(socket.i, 1); //supprimer le socket du joueur déconnecté 
        io.to(`${admin.id}`).emit('gamerleft', i);
        io.to(`${serverAngular.id}`).emit('gamerleft', i);
    });

    socket.on('whichGame', (quelJeu) => {
        jeu = quelJeu;
        if (jeu == "geh") {
            nvoJoueur = false;
            typeJeu = "equipe";
            joueursParEquipe = 4;
            nbreJoueurs = 8;
            scoredAcclaclamation = 100;
            pointsdAcclamation.push(40);
            pointsdAcclamation.push(30);
            io.to(`${serverAngular.id}`).emit('whichGame', quelJeu);
        }
    });


//format génie en herbe
    socket.on('teamsName', (nomEquipes) => {
        equipes = nomEquipes;
        io.to(`${serverAngular.id}`).emit('teamsName', nomEquipes);
    });

    socket.on('gamersInfo', (infoJoueurs) => {
        for (var k = 0; k < joueursParEquipe; k++) {
            joueurs[k].nom = infoJoueurs[k];
            joueurs[k].equipe = equipes[1];

            joueurs[]
            io.to(`${joueurs[k].id}`).emit('gamersName', infoJoueurs[k]);
            io.to(`${joueurs[k].id}`).emit('gamersName', infoJoueurs[k]);
        }
    });

//déroulement du jeu
    socket.on('buz', () => {
        let buz = true;
        for (var i = 0; i < nbreJoueurs; i++) {
            if (joueur.bouton === "vert" || socket.bouton === "rouge") {
                buz = false;
                break;
            }
        }
        if (buz) {
            socketActif = socket;
            socket.emit('buz');
            io.to(`${admin.id}`).emit('buz');
        }
    });

    socket.on('increment', (point) => {
        socketActif.score += point;

        io.to(`${socketActif.id}`).emit('increment', socketActif.score);
        io.to(`${serverAngular.id}`).emit('increment', );
    });

    socket.on('decrement', (point) => {
        socketActif.score -= point;
        io.to(`${socketActif.id}`).emit('decrement', socketActif.score);
        io.to(`${serverAngular.id}`).emit('increment', );
    });

    socket.on('blockGamer', () => {
        io.to(`${socketActif.id}`).emit('blockGamer', joueur);
    });

    socket.on('penalty', (point) => {
        socketActif.score -= point;
        socket.emit('penality', chiffre)
        ipc.send('penalty', chiffre, index)
    });

    socket.on('blockTeam', () => {
        joueurs.forEach(joueur => {
            if (joueur.equipe === equipe) {
                joueur.bouton = "rouge";
                io.to(`${joueur.id}`).emit('blockGamer', joueur);
            }
        });
    });

    socket.on('reset', () => {
        joueurs.forEach(joueur => {
           joueur.bouton = "bleu";
            io.to(`${joueur.id}`).emit('reset');
       })
    });

});