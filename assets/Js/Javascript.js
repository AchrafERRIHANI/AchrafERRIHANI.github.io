//Une alerte au lancement de la page qui demande a l'utilisateur est il pret pour jouer.
alert('Est tu prêt pour jouer ce jeu?')
//const
const container = document.getElementById("alphabetButtons");
var answerDisplay = document.getElementById("hold");
var answer = "";
var hint = "";
var life = 10;
var wordDisplay = [];
var winningCheck = "";
const containerHint = document.getElementById("clue");
const buttonHint = document.getElementById("hint");
const buttonReset = document.getElementById("reset");
const livesDisplay = document.getElementById("mylives");
var myStickman = document.getElementById("stickman");
var context = myStickman.getContext("2d");

//generate alphabet button
function generateButton() {
  var buttonsHTML = "abcdefghijklmnopqrstuvwxyz"
    .split("")
    .map(
      (letter) =>
        `<button
         class = "alphabetButtonJS" 
         id="${letter}"
         >
        ${letter}
        </button>`
    )
    .join("");

  return buttonsHTML;
}

function handleClick(event) {
  const isButton = event.target.nodeName === "BUTTON";
  if (isButton) {
    //console.dir(event.target.id);
    //console.log(isButton);
    const buttonId = document.getElementById(event.target.id);
    buttonId.classList.add("selected");
  }
  return;
}

//indices, Mots et les questions pour le jeu.
const question = [
  "La catégorie choisie est celle des équipes des équipes nationale africaine",
  "La catégorie choisie est celle des Légumes ",
  "La catégorie choisie est pays"
];

const categories = [
  [
    "maroc",
    "egypte",
    "senegal",
    "nigeria",
    "tunisie",
  ],
  ["lentilles", "pois-chiches", "haricots-noirs", "haricots-rouges", "pois"],
  ["amerique", "canada", "algerie", "france", "espagne"]
];

const hints = [
  [
    "Ils ont participé à plusieurs Coupes du Monde de la FIFA.",
    "Surnom de l'équipe : Les Pharaons.",
    "Ont connus des succès notables sur la scène internationale, y compris des participations remarquables en Coupe du Monde.",
    "Ont remporté plusieurs fois la Coupe d'Afrique des Nations (CAN) et ont participé à plusieurs Coupes du Monde de la FIFA.",
    "nt remporté la Coupe d'Afrique des Nations (CAN) et ont été une équipe régulière en phase finale de la Coupe du Monde.",
 
  ],
  [
    "Disponibles dans diverses couleurs telles que le vert, le brun, le rouge et le noir. Elles sont riches en protéines, en fibres et en divers nutriments essentiels.",
    "Rondes et beige au goût noiseté. Ils sont un ingrédient clé dans des plats tels que le houmous et sont une bonne source de protéines et de fibres alimentaires.",
    "Ils sont de petites légumineuses sombres souvent utilisées dans la cuisine latino-américaine. Ils sont une bonne source de protéines, de fibres et de diverses vitamines et minéraux.",
    "Ils sont couramment utilisés dans le chili et d'autres plats copieux et constituent une bonne source de protéines, de fibres et de divers nutriments.",
    "Des légumineuses vertes ou jaunes qui se présentent sous forme de gousses."
  ],
  [
    "Il est composé de 50 États.",
    "C'est le deuxième plus grand pays du monde en termes de superficie.",
    "Il a obtenu son indépendance de la France en 1962.",
    "Le pays le plus connu pour la Fashion Week",
    "C'est un pays d'Europe du Sud"
  ]
];

//set question,answer and hint

function setAnswer() {
  const categoryOrder = Math.floor(Math.random() * categories.length);
  const chosenCategory = categories[categoryOrder];
  const wordOrder = Math.floor(Math.random() * chosenCategory.length);
  const chosenWord = chosenCategory[wordOrder];

  const categoryNameJS = document.getElementById("categoryName");
  categoryNameJS.innerHTML = question[categoryOrder];

  //console.log(chosenCategory);
  //console.log(chosenWord);
  answer = chosenWord;
  hint = hints[categoryOrder][wordOrder];
  answerDisplay.innerHTML = generateAnswerDisplay(chosenWord);
}

function generateAnswerDisplay(word) {
  var wordArray = word.split("");
  //console.log(wordArray);
  for (var i = 0; i < answer.length; i++) {
    if (wordArray[i] !== "-") {
      wordDisplay.push("_");
    } else {
      wordDisplay.push("-");
    }
  }
  return wordDisplay.join(" ");
}

function showHint() {
  containerHint.innerHTML = `Indice - ${hint}`;
}

buttonHint.addEventListener("click", showHint);
//setting initial condition
function init() {
  answer = "";
  hint = "";
  life = 10;
  wordDisplay = [];
  winningCheck = "";
  context.clearRect(0, 0, 400, 400);
  canvas();
  containerHint.innerHTML = `homme pendu -`;
  livesDisplay.innerHTML = `Il te reste ${life} essais!`;
  setAnswer();
  container.innerHTML = generateButton();
  container.addEventListener("click", handleClick);
  console.log(answer);
  //console.log(hint);
}

window.onload = init();

//reset (play again)
buttonReset.addEventListener("click", init);

//guess click
function guess(event) {
  const guessWord = event.target.id;
  const answerArray = answer.split("");
  var counter = 0;
  if (answer === winningCheck) {
    livesDisplay.innerHTML = `vous gagnez`;
    return;
  } else {
    if (life > 0) {
      for (var j = 0; j < answer.length; j++) {
        if (guessWord === answerArray[j]) {
          wordDisplay[j] = guessWord;
          console.log(guessWord);
          answerDisplay.innerHTML = wordDisplay.join(" ");
          winningCheck = wordDisplay.join("");
          //console.log(winningCheck)
          counter += 1;
        }
      }
      if (counter === 0) {
        life -= 1;
        counter = 0;
        animate();
      } else {
        counter = 0;
      }
      if (life > 1) {
        livesDisplay.innerHTML = `Il te reste ${life} essais!`;
      } else if (life === 1) {
        livesDisplay.innerHTML = `Il te reste ${life} essais!`;
      } else {
        livesDisplay.innerHTML = `Fin de la partie, vous avez perdu`;
      }
    } else {
      return;
    }
    console.log(wordDisplay);
    //console.log(counter);
    //console.log(life);
    if (answer === winningCheck) {
      livesDisplay.innerHTML = `vous gagnez`;
      return;
    }
  }
}

container.addEventListener("click", guess);

// Hangman
function animate() {
  drawArray[life]();
  //console.log(drawArray[life]);
}

function canvas() {
  myStickman = document.getElementById("stickman");
  context = myStickman.getContext("2d");
  context.beginPath();
  context.strokeStyle = "black";
  context.lineWidth = 2;
}

function head() {
  myStickman = document.getElementById("stickman");
  context = myStickman.getContext("2d");
  context.beginPath();
  context.arc(60, 25, 10, 0, Math.PI * 2, true);
  context.stroke();
}

function draw($pathFromx, $pathFromy, $pathTox, $pathToy) {
  context.moveTo($pathFromx, $pathFromy);
  context.lineTo($pathTox, $pathToy);
  context.stroke();
}

function frame1() {
  draw(0, 150, 150, 150);
}

function frame2() {
  draw(10, 0, 10, 600);
}

function frame3() {
  draw(0, 5, 70, 5);
}

function frame4() {
  draw(60, 5, 60, 15);
}

function torso() {
  draw(60, 36, 60, 70);
}

function rightArm() {
  draw(60, 46, 100, 50);
}

function leftArm() {
  draw(60, 46, 20, 50);
}

function rightLeg() {
  draw(60, 70, 100, 100);
}

function leftLeg() {
  draw(60, 70, 20, 100);
}

var drawArray = [
  rightLeg,
  leftLeg,
  rightArm,
  leftArm,
  torso,
  head,
  frame4,
  frame3,
  frame2,
  frame1
];

// function pour que l'utilisateur puisse ajouter des mots dans le jeu
// avec un tableau de tout les mots qui sont deja disponible dans le jeu
var motsPendu = [
 "maroc",
  "egypte",
  "senegal",
  "nigeria",
  "tunisie",
  "amerique", "canada", "algerie", "france", "espagne",
  "lentilles", "pois-chiches", "haricots-noirs", "haricots-rouges", "pois"
];

function ajouterNouveauMot() {
    var nouveauMot = prompt("Entrez le nouveau mot pour le jeu du pendu:");
    if (nouveauMot) {
        ajouterMotAuPendu(nouveauMot);
    }
}
// si le mots est deja dans la liste il sera impossible de le rajouter, sinon le mot sera ajouter avec succes 
function ajouterMotAuPendu(nouveauMot) {
    if (!motsPendu.includes(nouveauMot)) {
        motsPendu.push(nouveauMot);
        console.log("Mot ajouté avec succès au jeu du pendu!");
    } else {
        console.log("Le mot est déjà dans la liste.");
    }
}

