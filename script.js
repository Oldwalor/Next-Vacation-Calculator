let vacancesPerso = JSON.parse(localStorage.getItem("vacancesPerso")) || [];

document.getElementById("resetVacances").addEventListener("click", function () {
    localStorage.removeItem("vacancesPerso");
    vacancesPerso = [];
    mettreAJourCompteur();
});

const vacances = [
    { nom: "Vacances du 1er mars", date: new Date("2025-02-22T00:00:00") },
    { nom: "Vacances de Pâques", date: new Date("2025-04-12T00:00:00") },
    { nom: "Vacances d'été", date: new Date("2025-07-05T00:00:00") },
];

document.getElementById("ajouterVacance").addEventListener("click", function () {
    const nomVac = document.getElementById("nomVacance").value.trim();
    const dateVac = document.getElementById("dateVacance").value;

    if (!nomVac || !dateVac) {
        alert("Veuillez remplir tous les champs !");
        return;
    }

    vacancesPerso.push({ nom: nomVac, date: new Date(dateVac + "T00:00:00") });
    vacancesPerso.sort((a, b) => a.date - b.date);

    localStorage.setItem("vacancesPerso", JSON.stringify(vacancesPerso));

    document.getElementById("nomVacance").value = "";
    document.getElementById("dateVacance").value = "";

    mettreAJourCompteur();
});

function obtenirVacancesActuelles() {
    return vacancesPerso.length > 0 ? vacancesPerso : vacances;
}

function mettreAJourCompteur() {
    const maintenant = new Date();
    const listeVacances = obtenirVacancesActuelles();

    for (let vac of listeVacances) {
        let dateVac = new Date(vac.date);

        if (dateVac >= maintenant) {
            let diff = dateVac - maintenant;
            let jours = Math.floor(diff / (1000 * 60 * 60 * 24));
            let heures = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            let secondes = Math.floor((diff % (1000 * 60)) / 1000);

            document.getElementById("vacance").textContent = `${vac.nom}`;
            document.getElementById("compteur").textContent = jours === 0
                ? `C'est aujourd'hui !`
                : `Encore ${jours}j ${heures}h ${minutes}m ${secondes}s !`;

            return;
        }
    }

    document.getElementById("compteur").textContent = "Plus de vacances pour toi !";
}

mettreAJourCompteur();
setInterval(mettreAJourCompteur, 1000);






const toggleButton = document.getElementById("toggleMode");
let isNightMode = true;

function toggleMode() {
    isNightMode = !isNightMode;
    updateMode();
}

function updateMode() {
    if (isNightMode) {
        document.body.style.backgroundColor = "#333";
        document.body.style.color = "#fff";
        toggleButton.innerHTML = "🌞";
    } else {
        document.body.style.backgroundColor = "white";
        document.body.style.color = "#000";
        toggleButton.innerHTML = "🌙";
    }
}

updateMode();

toggleButton.addEventListener("click", toggleMode);




function lancerConfettis() {
    const emojiConfettis = ["🎉", "🎊", "✨", "💥", "🎈", "🌟"];

    for (let i = 0; i < 150; i++) { 
        let confetti = document.createElement("div");
        confetti.textContent = emojiConfettis[Math.floor(Math.random() * emojiConfettis.length)];
        confetti.style.position = "fixed";
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.top = `${-Math.random() * 50}vh`; 
        confetti.style.fontSize = `${Math.random() * 20 + 10}px`; 
        confetti.style.zIndex = "9999";
        confetti.style.pointerEvents = "none";

        document.body.appendChild(confetti);

        let animation = confetti.animate(
            [
                { transform: `translateY(0) rotate(${Math.random() * 360}deg)` }, 
                { transform: `translateY(100vh) rotate(${Math.random() * 360}deg)` }, 
            ],
            {
                duration: Math.random() * 2000 + 3000,
                easing: "ease-out",
                iterations: 1,
            }
        );

        animation.onfinish = () => confetti.remove();
    }
}


if (document.getElementById("compteur").textContent === "C'est aujourd'hui !") {
    lancerConfettis();
}
