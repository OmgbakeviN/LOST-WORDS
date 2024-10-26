// script.js
const mots = [
    "abeille", "abricot", "aigle", "alouette", "ananas", "animal", "armoire", "assiette",
    "avocat", "banane", "banc", "bateau", "belette", "bison", "blé", "bonbon", "bougie",
    "brique", "brocoli", "bureau", "cabane", "cactus", "canard", "carotte", "cerise",
    "chaise", "chameau", "chat", "cheval", "chocolat", "citron", "clou", "cochon",
    "coq", "courgette", "crayon", "crocodile", "cuillère", "dauphin", "dessert", "dinosaure",
    "dinde", "éléphant", "escargot", "étoile", "feu", "fenetre", "fer", "flocon", "four",
    "fraise", "fromage", "fruit", "gâteau", "girafe", "glaçon", "globe", "gorille",
    "haricot", "hérisson", "hibou", "horloge", "iguane", "île", "jardin", "jouet",
    "kangourou", "kiwi", "lapin", "livre", "loup", "maison", "mangue", "melon", "mouette",
    "mouton", "navire", "noix", "oiseau", "orange", "ours", "pâtes", "pain", "panda",
    "papillon", "pastèque", "pêche", "peluche", "perroquet", "petit pois", "pignon",
    "piment", "pin", "poisson", "pomme", "poule", "poussin", "radis", "raisin", "renard",
    "rhinocéros", "riz", "robot", "rouleau", "salade", "sardine", "savon", "scie",
    "serpent", "sieste", "soleil", "soucoupe", "soupe", "table", "tambour", "tapis",
    "tigre", "tomate", "tortue", "train", "trompette", "trousse", "tuyau", "vache",
    "valise", "vanille", "vase", "vélo", "verre", "viande", "vis", "voiture", "volcan",
    "zèbre", "zoo", "abajour", "alarme", "balai", "brosse", "calculatrice", "caméra",
    "canne", "chapeau", "clé", "couteau", "échelle", "éponge", "fer à repasser", "flûte",
    "guitare", "lampe", "livre", "miroir", "ordinateur", "palette", "pinceau", "porte",
    "radio", "réfrigérateur", "rouleau", "savon", "sèche-cheveux", "serviette", "téléphone",
    "thermomètre", "tondeuse", "tournevis", "trousseau", "valise", "ventilateur", "verre",
    "visseuse", "boîte", "brosse", "carton", "ciseaux", "étiquette", "enveloppe", "feutre",
    "gomme", "papier", "pince", "règle", "stylo", "tableau", "trombone", "crayon", "marqueur",
    "scotch", "agrafe", "carnet", "dossier", "livre", "magazine", "note", "page", "rapport",
    "registre", "fichier", "document"
]; // Liste des mots à deviner
let mot = mots[Math.floor(Math.random() * mots.length)]; // Choix aléatoire d'un mot
let motCache = Array(mot.length).fill('_'); // Cache le mot sous forme de tirets
let vies = 10;
let lettresUtilisees = [];

// Sélection des éléments HTML
const motCacheEl = document.getElementById('mot-cache');
const penduEl = document.getElementById('pendu');
const messageEl = document.getElementById('message');
const lettreInput = document.getElementById('lettre');
const btnProposer = document.getElementById('btn-proposer');
const btnRejouer = document.getElementById('btn-rejouer');

// Affiche les lettres cachées sous forme de boîtes
function afficherMotCache() {
    motCacheEl.innerHTML = ''; // Vide l'élément pour le re-remplir
    motCache.forEach(lettre => {
        const lettreBox = document.createElement('div');
        lettreBox.className = 'lettre-box';
        lettreBox.textContent = lettre; // Affiche soit la lettre, soit "_"
        motCacheEl.appendChild(lettreBox);
    });
}

// Met à jour l'affichage du pendu (nombre d'erreurs)
function afficherPendu() {
    penduEl.textContent = `Erreurs : ${10 - vies}`;
}

// Vérifie si la lettre est dans le mot et met à jour les boîtes
function verifierLettre(lettre) {
    if (lettresUtilisees.includes(lettre)) {
        alert("Vous avez déjà proposé cette lettre.");
        return;
    }

    lettresUtilisees.push(lettre); // Ajoute la lettre aux lettres utilisées

    if (mot.includes(lettre)) {
        // Si la lettre est correcte, on l'affiche dans les bonnes positions
        for (let i = 0; i < mot.length; i++) {
            if (mot[i] === lettre) {
                motCache[i] = lettre;
            }
        }
    } else {
        // Si la lettre est incorrecte, on perd une vie
        vies--;
    }

    afficherMotCache();
    afficherPendu();

    // Si le joueur a gagné
    if (!motCache.includes('_')) {
        messageEl.textContent = "Félicitations ! Vous avez gagné 🎉";
        btnProposer.disabled = true; // Désactive le bouton
        btnRejouer.style.display = 'inline-block'; // Affiche le bouton "Rejouer"
    }

    // Si le joueur a perdu
    if (vies === 0) {
        messageEl.textContent = `Dommage ! Le mot était "${mot}". Vous avez perdu.`;
        btnProposer.disabled = true; // Désactive le bouton
        btnRejouer.style.display = 'inline-block'; // Affiche le bouton "Rejouer"
    }
}

// Gère la soumission de la lettre
btnProposer.addEventListener('click', function() {
    const lettre = lettreInput.value.toLowerCase();
    if (lettre.match(/[a-z]/) && lettre.length === 1) {
        verifierLettre(lettre);
    } else {
        alert("Veuillez entrer une lettre valide.");
    }
    lettreInput.value = ''; // Réinitialise l'entrée
});

// Initialisation
afficherMotCache();
afficherPendu();
