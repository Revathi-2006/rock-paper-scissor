// ======= Game Variables =======
let player1Score = 0;
let player2Score = 0;
let timeLeft = 60;
let gameMode = 'pc'; // 'pc' = Player vs Computer, '2p' = Player1 vs Player2
let timer;
let soundOn = true;

// ======= Audio Files =======
const clickSound = new Audio('sounds/click.mp3');
const winSound = new Audio('sounds/win.mp3');
const loseSound = new Audio('sounds/lose.mp3');
const drawSound = new Audio('sounds/draw.mp3');

// ======= DOM Elements =======
const choices = document.querySelectorAll('.choice');
const score1 = document.getElementById('score1');
const score2 = document.getElementById('score2');
const resultDiv = document.querySelector('.result');
const timeDisplay = document.getElementById('time');

// ======= Sound Toggle =======
const toggleSoundBtn = document.getElementById('toggle-sound');
toggleSoundBtn.addEventListener('click', () => {
    soundOn = !soundOn;
    toggleSoundBtn.textContent = soundOn ? 'Sound On' : 'Sound Off';
});

// ======= Mode Selection =======
document.getElementById('mode-pc').addEventListener('click', () => { resetGame(); gameMode = 'pc'; });
document.getElementById('mode-2p').addEventListener('click', () => { resetGame(); gameMode = '2p'; });

// ======= Player Choices =======
choices.forEach(choice => choice.addEventListener('click', () => {
    if (soundOn) clickSound.play();
    const playerChoice = choice.dataset.choice;
    let computerChoice = '';

    if (gameMode === 'pc') {
        const options = ['rock', 'paper', 'scissors'];
        computerChoice = options[Math.floor(Math.random() * 3)];
        determineWinner(playerChoice, computerChoice);
    } else {
        // Player 2 input
        const player2Choice = prompt('Player 2, enter rock, paper, or scissors:').toLowerCase();
        if (!['rock', 'paper', 'scissors'].includes(player2Choice)) return alert('Invalid choice!');
        determineWinner(playerChoice, player2Choice);
    }
}));

// ======= Determine Winner =======
function determineWinner(p1, p2) {
    if (p1 === p2) {
        resultDiv.textContent = `Draw! Both chose ${p1}`;
        if (soundOn) drawSound.play();
    } else if (
        (p1 === 'rock' && p2 === 'scissors') ||
        (p1 === 'paper' && p2 === 'rock') ||
        (p1 === 'scissors' && p2 === 'paper')
    ) {
        resultDiv.textContent = `Player 1 wins! ${p1} beats ${p2}`;
        player1Score++;
        score1.textContent = player1Score;
        if (soundOn) winSound.play();
    } else {
        resultDiv.textContent = `Player 2 wins! ${p2} beats ${p1}`;
        player2Score++;
        score2.textContent = player2Score;
        if (soundOn) loseSound.play();
    }
}

// ======= Timer =======
function startTimer() {
    clearInterval(timer);
    timeLeft = 60;
    timeDisplay.textContent = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            showFinalResult();
        }
    }, 1000);
}

// ======= Show Final Result =======
function showFinalResult() {
    let finalMsg = '';
    if (player1Score > player2Score) finalMsg = 'Player 1 Wins the Game!';
    else if (player2Score > player1Score) finalMsg = 'Player 2 / Computer Wins the Game!';
    else finalMsg = 'Game Draw!';
    resultDiv.textContent = finalMsg;
}

// ======= Reset Game =======
function resetGame() {
    player1Score = 0;
    player2Score = 0;
    score1.textContent = '0';
    score2.textContent = '0';
    resultDiv.textContent = '';
    startTimer();
}

// ======= Start Timer on Load =======
startTimer();

// ======= Menu Toggle =======
const menuToggle = document.getElementById('menu-toggle');
const menuItems = document.getElementById('menu-items');
menuToggle.addEventListener('click', () => {
    menuItems.classList.toggle('active');
});

// ======= How to Play Modal =======
const howToPlayBtn = document.getElementById('how-to-play');
const instructions = document.getElementById('instructions');
const closeInstructions = document.getElementById('close-instructions');

howToPlayBtn.addEventListener('click', e => { 
    e.preventDefault(); 
    instructions.classList.remove('hidden'); 
});
closeInstructions.addEventListener('click', () => { instructions.classList.add('hidden'); });

// ======= Profile Modal =======
const profileBtn = document.getElementById('profile');
const profileModal = document.getElementById('profile-modal');
const closeProfile = document.getElementById('close-profile');

profileBtn.addEventListener('click', e => { 
    e.preventDefault(); 
    profileModal.classList.remove('hidden'); 
});
closeProfile.addEventListener('click', () => { profileModal.classList.add('hidden'); });

// ======= Resources Modal =======
const resourcesLink = document.getElementById('resources-link');
const resourcesModal = document.getElementById('resources-modal');
const closeResources = document.getElementById('close-resources');

resourcesLink.addEventListener('click', e => { 
    e.preventDefault(); 
    resourcesModal.classList.remove('hidden'); 
});
closeResources.addEventListener('click', () => { resourcesModal.classList.add('hidden'); });

// ======= Neon Particle Background =======
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let W = canvas.width = window.innerWidth;
let H = canvas.height = window.innerHeight;
let particles = [];

window.addEventListener('resize', () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
});

for (let i = 0; i < 100; i++) {
    particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 3 + 1,
        dx: (Math.random() - 0.5) * 2,
        dy: (Math.random() - 0.5) * 2
    });
}

function animateParticles() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,255,255,0.7)';
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > W) p.dx *= -1;
        if (p.y < 0 || p.y > H) p.dy *= -1;
    });
    requestAnimationFrame(animateParticles);
}

animateParticles();
