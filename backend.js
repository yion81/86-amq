// Audio files (replace with actual Made in Abyss OSTs)
const audioFiles = [
    { title: "Underground River", file: "miaost/Underground River.mp3", anime: "Made in Abyss" },
    { title: "The First Layer", file: "miaost/The First Layer.mp3", anime: "Made in Abyss" },
    { title: "Deep in Abyss", file: "miaost/Deep in Abyss.mp3", anime: "Made in Abyss" },
    { title: "Made in Abyss", file: "miaost/Made in Abyss.mp3", anime: "Made in Abyss" },
    { title: "Pathway", file: "miaost/Pathway.mp3", anime: "Made in Abyss" },
    { title: "Riko's Theme", file: "miaost/Riko's Theme.mp3", anime: "Made in Abyss" },
    { title: "Prushka Sequence", file: "miaost/Prushka Sequence.mp3", anime: "Made in Abyss: Dawn of the Deep Soul" },
    { title: "Tozo Hanoline", file: "miaost/Tozo Hanoline.mp3", anime: "Made in Abyss: Dawn of the Deep Soul" },
    { title: "Stingerhead Nest", file: "miaost/Stingerhead Nest.mp3", anime: "Made in Abyss: Dawn of the Deep Soul" },
    { title: "The Rumble of Scientific Triumph", file: "miaost/The Rumble of Scientific Triumph.mp3", anime: "Made in Abyss: Dawn of the Deep Soul" },
    { title: "Transcendance and Hanezeve", file: "miaost/Transcendance and Hanezeve.mp3", anime: "Made in Abyss: Dawn of the Deep Soul" },
    { title: "reBirth", file: "miaost/reBirth.mp3", anime: "Made in Abyss: Dawn of the Deep Soul" },
    { title: "Stairway to the Fifth", file: "miaost/Stairway to the Fifth.mp3", anime: "Made in Abyss: Dawn of the Deep Soul" },
    { title: "Forever Lost", file: "miaost/Forever Lost.mp3", anime: "Made in Abyss: Dawn of the Deep Soul" },
    { title: "Old Stories", file: "miaost/Old Stories.mp3", anime: "Made in Abyss: The Golden City of the Scorching Sun" },
    { title: "Gravity", file: "miaost/Gravity.mp3", anime: "Made in Abyss: The Golden City of the Scorching Sun" },
    { title: "VOH", file: "miaost/VOH.mp3", anime: "Made in Abyss: The Golden City of the Scorching Sun" },
    { title: "Nature Sequence 6th Layer", file: "miaost/Nature Sequence 6th layer.mp3", anime: "Made in Abyss: The Golden City of the Scorching Sun" },
    { title: "Tomorrow Land", file: "miaost/Tomorrow land.mp3", anime: "Made in Abyss: The Golden City of the Scorching Sun" },
    { title: "Vueko", file: "miaost/Vueko.mp3", anime: "Made in Abyss: The Golden City of the Scorching Sun" },
    { title: "Eyes of Irumyuui", file: "miaost/Eyes of Irumyuui.mp3", anime: "Made in Abyss: The Golden City of the Scorching Sun" },
    { title: "Katachi", file: "miaost/Katachi.mp3", anime: "Made in Abyss: The Golden City of the Scorching Sun" },
    { title: "Endless Embrace", file: "miaost/Endless Embrace.mp3", anime: "Made in Abyss: The Golden City of the Scorching Sun" },
    { title: "Faputa", file: "miaost/Faputa.mp3", anime: "Made in Abyss: The Golden City of the Scorching Sun" }
];

// Game state
let gameState = {
    currentTrack: 0,
    score: 0,
    maxScore: audioFiles.length * 2,
    shuffledTracks: [],
    animeAnswered: false,
    songAnswered: false,
    selectedAnime: null,
    songSkipped: false
};

// DOM elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const startBtn = document.getElementById('start-btn');
const playAgainBtn = document.getElementById('play-again-btn');
const endQuizBtn = document.getElementById('end-quiz-btn');
const audioElement = document.getElementById('audio-element');
const currentQuestionDisplay = document.getElementById('current-question');
const totalQuestionsDisplay = document.getElementById('total-questions');
const animeQuestion = document.getElementById('anime-question');
const songQuestion = document.getElementById('song-question');
const songInput = document.getElementById('song-input');
const skipSongBtn = document.getElementById('skip-song-btn');
const nextBtn = document.getElementById('next-btn');
const finalScoreDisplay = document.getElementById('final-score');
const maxScoreDisplay = document.getElementById('max-score');
const actualAnimeDisplay = document.getElementById('actual-anime');
const userAnimeAnswer = document.getElementById('user-anime-answer');
const actualSongDisplay = document.getElementById('actual-song');
const userSongAnswer = document.getElementById('user-song-answer');
const animeComparison = document.getElementById('anime-comparison');
const songComparison = document.getElementById('song-comparison');
const optionBoxes = document.querySelectorAll('.option-box');
const autocompleteList = document.getElementById('autocomplete-list');
const currentScoreDisplay = document.getElementById('current-score-display');
const currentScoreElement = document.getElementById('current-score');

// Custom audio player elements
const customPlayBtn = document.getElementById('custom-play-btn');
const playIcon = document.getElementById('play-icon');
const pauseIcon = document.getElementById('pause-icon');
const customProgressContainer = document.getElementById('custom-progress-container');
const customProgressBar = document.getElementById('custom-progress-bar');
const customVolumeSlider = document.getElementById('custom-volume-slider');

// Event listeners
startBtn.addEventListener('click', startGame);
playAgainBtn.addEventListener('click', resetGame);
nextBtn.addEventListener('click', nextQuestion);
skipSongBtn.addEventListener('click', skipSong);
endQuizBtn.addEventListener('click', endQuiz);

// Add click handlers for option boxes
optionBoxes.forEach(box => {
    box.addEventListener('click', handleAnimeSelection);
});

// Handle song input on Enter key
songInput.addEventListener('keyup', function(e) {
    if (e.key === 'Enter' && songInput.value.trim() !== '') {
        handleSongSubmit();
    } else {
        autocompleteSong(songInput.value);
    }
});

// Show all songs when input is focused
songInput.addEventListener('focus', function() {
    autocompleteSong('');
});

// Custom audio player events
customPlayBtn.addEventListener('click', togglePlay);
customProgressContainer.addEventListener('click', seek);
customVolumeSlider.addEventListener('input', setVolume);
audioElement.addEventListener('timeupdate', updateProgressBar);
audioElement.addEventListener('play', updatePlayButton);
audioElement.addEventListener('pause', updatePlayButton);
audioElement.addEventListener('ended', updatePlayButton);

// Start the game
function startGame() {
    // Shuffle tracks
    gameState.shuffledTracks = [...audioFiles];
    shuffleArray(gameState.shuffledTracks);
    
    // Reset game state
    gameState.currentTrack = 0;
    gameState.score = 0;
    gameState.animeAnswered = false;
    gameState.songAnswered = false;
    gameState.selectedAnime = null;
    gameState.songSkipped = false;
    
    // Update UI
    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    resultsScreen.classList.add('hidden');
    currentScoreDisplay.classList.remove('hidden');
    
    // Update score display
    currentScoreElement.textContent = gameState.score;
    
    currentQuestionDisplay.textContent = 1;
    totalQuestionsDisplay.textContent = audioFiles.length;
    
    // Load first track
    loadTrack();
}

// Reset the game
function resetGame() {
    resultsScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
    currentScoreDisplay.classList.add('hidden');
}

// End the quiz early
function endQuiz() {
    // Pause audio
    audioElement.pause();
    
    // Update UI
    quizScreen.classList.add('hidden');
    resultsScreen.classList.remove('hidden');
    finalScoreDisplay.textContent = gameState.score;
    maxScoreDisplay.textContent = gameState.maxScore;
}

// Shuffle array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Load current track
function loadTrack() {
    const track = gameState.shuffledTracks[gameState.currentTrack];
    
    // Reset UI for new question
    animeQuestion.classList.remove('hidden');
    songQuestion.classList.add('hidden');
    nextBtn.classList.add('hidden');
    songInput.value = '';
    animeComparison.classList.add('hidden');
    songComparison.classList.add('hidden');
    autocompleteList.innerHTML = '';
    
    // Reset option boxes
    optionBoxes.forEach(box => {
        box.classList.remove('selected');
    });
    
    gameState.animeAnswered = false;
    gameState.songAnswered = false;
    gameState.selectedAnime = null;
    gameState.songSkipped = false;
    
    // Update progress
    currentQuestionDisplay.textContent = gameState.currentTrack + 1;
    
    // Set actual track info (hidden until answered)
    actualAnimeDisplay.textContent = track.anime;
    actualSongDisplay.textContent = track.title;
    
    // Load audio
    audioElement.src = track.file;

    // initial vol
    audioElement.volume = 0.4;
    audioElement.play().catch(e => console.log("Auto-play prevented:", e));
}

// Handle anime selection
function handleAnimeSelection(e) {
    if (gameState.animeAnswered) return;
    
    const selectedBox = e.currentTarget;
    const selectedAnime = selectedBox.dataset.value;
    
    // Update selected state
    optionBoxes.forEach(box => {
        box.classList.remove('selected');
    });
    selectedBox.classList.add('selected');
    
    gameState.selectedAnime = selectedAnime;
    
    // Automatically proceed after selection
    setTimeout(() => {
        handleAnimeSubmit(selectedAnime);
    }, 0);
}

// Handle anime answer
function handleAnimeSubmit(selectedAnime) {
    const correctAnime = gameState.shuffledTracks[gameState.currentTrack].anime;
    
    // Update score if correct
    if (selectedAnime === correctAnime) {
        gameState.score += 1;
        currentScoreElement.textContent = gameState.score;
    }
    
    // Show answer comparison
    userAnimeAnswer.textContent = selectedAnime;
    animeComparison.classList.remove('hidden');
    
    gameState.animeAnswered = true;
    animeQuestion.classList.add('hidden');
    songQuestion.classList.remove('hidden');
    songInput.focus();
}

// Skip song question
function skipSong() {
    gameState.songSkipped = true;
    handleSongSubmit();
}

// Handle song submission
function handleSongSubmit() {
    let userAnswer = songInput.value.trim();
    
    if (gameState.songSkipped) {
        userAnswer = "I forgor 💀";
    } else if (!userAnswer) {
        return; // Don't proceed if empty and not skipped
    }
    
    const correctAnswer = gameState.shuffledTracks[gameState.currentTrack].title;
    
    // Update score if correct and not skipped
    if (!gameState.songSkipped && userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        gameState.score += 1;
        currentScoreElement.textContent = gameState.score;
    }
    
    // Show answer comparison
    userSongAnswer.textContent = userAnswer;
    songComparison.classList.remove('hidden');
    
    gameState.songAnswered = true;
    songQuestion.classList.add('hidden');
    nextBtn.classList.remove('hidden');
}

// Move to next question or end game
function nextQuestion() {
    gameState.currentTrack++;
    
    if (gameState.currentTrack < gameState.shuffledTracks.length) {
        loadTrack();
    } else {
        // Game over
        quizScreen.classList.add('hidden');
        resultsScreen.classList.remove('hidden');
        finalScoreDisplay.textContent = gameState.score;
        maxScoreDisplay.textContent = gameState.maxScore;
    }
}

// Autocomplete function for song titles
function autocompleteSong(input) {
    autocompleteList.innerHTML = '';
    
    const filteredTitles = input 
        ? audioFiles
            .map(track => track.title)
            .filter(title => title.toLowerCase().includes(input.toLowerCase()))
        : audioFiles.map(track => track.title); // Show all if no input
    
    filteredTitles.forEach(title => {
        const item = document.createElement('div');
        if (input) {
            const matchIndex = title.toLowerCase().indexOf(input.toLowerCase());
            if (matchIndex >= 0) {
                item.innerHTML = `<strong>${title.substr(0, matchIndex + input.length)}</strong>${title.substr(matchIndex + input.length)}`;
            } else {
                item.textContent = title;
            }
        } else {
            item.textContent = title;
        }
        item.addEventListener('click', function() {
            songInput.value = title;
            autocompleteList.innerHTML = '';
            // Auto-submit when clicking an autocomplete option
            handleSongSubmit();
        });
        autocompleteList.appendChild(item);
    });
}

// Custom audio player functions
function togglePlay() {
    if (audioElement.paused) {
        audioElement.play();
    } else {
        audioElement.pause();
    }
}

function updatePlayButton() {
    if (audioElement.paused) {
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
    } else {
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
    }
}

function updateProgressBar() {
    const progress = (audioElement.currentTime / audioElement.duration) * 100;
    customProgressBar.style.width = `${progress}%`;
}

function seek(e) {
    const rect = customProgressContainer.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    audioElement.currentTime = pos * audioElement.duration;
}

function setVolume() {
    audioElement.volume = customVolumeSlider.value;
}