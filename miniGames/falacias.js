// --- BASE DE DATOS DE PREGUNTAS (FALACIAS) ---
const questionsDB = [
    {
        text: '"Si no entregas el trabajo hoy, nunca serás profesional."',
        options: ['Ad Hominem', 'Pendiente Resbaladiza', 'Generalización'],
        correct: 1, // Índice de la opción correcta
        explanation: 'Es una pendiente resbaladiza porque asume que un evento lleva inevitablemente a consecuencias extremas.'
    },
    {
        text: '"Todos los políticos son corruptos, por lo tanto, este político también lo es."',
        options: ['Ad Hominem', 'Generalización Apresurada', 'Falsa Analogía'],
        correct: 1,
        explanation: 'Generaliza a partir de casos particulares sin evidencia suficiente.'
    },
    {
        text: '"No puedes criticar mi argumento porque eres un ignorante."',
        options: ['Ad Hominem', 'Pendiente Resbaladiza', 'Apelación a la Autoridad'],
        correct: 0,
        explanation: 'Ataca a la persona en lugar de refutar el argumento.'
    },
    {
        text: '"Si estudias mucho, aprobarás. Aprobaste, entonces estudiaste mucho."',
        options: ['Negación del Antecedente', 'Afirmación del Consecuente', 'Modus Ponens'],
        correct: 1,
        explanation: 'Falacia formal: la conclusión no sigue necesariamente de las premisas.'
    },
    {
        text: '"La mayoría de la gente piensa que el cambio climático es real, así que debe ser cierto."',
        options: ['Apelación a la Mayoría', 'Ad Hominem', 'Falsa Causa'],
        correct: 0,
        explanation: 'Argumenta que algo es cierto solo porque muchos lo creen.'
    },
    {
        text: '"Si no comes verduras, te enfermarás. No te enfermaste, entonces comiste verduras."',
        options: ['Negación del Consecuente', 'Afirmación del Antecedente', 'Modus Tollens'],
        correct: 0,
        explanation: 'Falacia formal: la negación del consecuente implica la negación del antecedente.'
    },
    {
        text: '"Ese científico es un charlatán, así que su teoría es falsa."',
        options: ['Ad Hominem', 'Pendiente Resbaladiza', 'Apelación a la Emoción'],
        correct: 0,
        explanation: 'Ataca al mensajero en lugar del mensaje.'
    },
    {
        text: '"Una vez vi a un perro ladrar, por eso todos los perros ladran."',
        options: ['Generalización Apresurada', 'Falsa Analogía', 'Apelación a la Tradición'],
        correct: 0,
        explanation: 'Concluye una generalización a partir de un solo caso.'
    },
    {
        text: '"Si no votas por mí, el país se irá al caos."',
        options: ['Apelación a la Emoción', 'Pendiente Resbaladiza', 'Ad Hominem'],
        correct: 1,
        explanation: 'Asume una cadena de eventos inevitables sin evidencia.'
    },
    {
        text: '"Los gatos son como los perros porque ambos son mascotas."',
        options: ['Falsa Analogía', 'Generalización', 'Apelación a la Autoridad'],
        correct: 0,
        explanation: 'Compara cosas que no son realmente similares.'
    },
    {
        text: '"Si no hay humo, no hay fuego. Hay fuego, entonces hay humo."',
        options: ['Afirmación del Consecuente', 'Negación del Antecedente', 'Modus Ponens'],
        correct: 1,
        explanation: 'Falacia formal: invierte la implicación correctamente.'
    },
    {
        text: '"Mi abuelo siempre lo hizo así, por eso es correcto."',
        options: ['Apelación a la Tradición', 'Ad Hominem', 'Falsa Causa'],
        correct: 0,
        explanation: 'Argumenta que algo es válido solo porque es tradicional.'
    },
    {
        text: '"Ese producto es caro, así que debe ser bueno."',
        options: ['Apelación a la Emoción', 'Falsa Causa', 'Generalización'],
        correct: 1,
        explanation: 'Asume que la causa es el precio sin evidencia.'
    },
    {
        text: '"Todos los estudiantes de esta universidad son inteligentes, vi a uno que lo es."',
        options: ['Generalización Apresurada', 'Ad Hominem', 'Pendiente Resbaladiza'],
        correct: 0,
        explanation: 'Generaliza a partir de evidencia insuficiente.'
    },
    {
        text: '"Si no comes carne, eres débil. Comes carne, entonces eres fuerte."',
        options: ['Afirmación del Consecuente', 'Negación del Antecedente', 'Modus Tollens'],
        correct: 0,
        explanation: 'Falacia formal: la conclusión no se deduce válidamente.'
    },
    {
        text: '"No confíes en él, es de un país extranjero."',
        options: ['Ad Hominem', 'Apelación a la Emoción', 'Falsa Analogía'],
        correct: 0,
        explanation: 'Ataca la nacionalidad en lugar del argumento.'
    },
    {
        text: '"El equipo ganó porque usaron camisetas rojas, que dan suerte."',
        options: ['Falsa Causa', 'Pendiente Resbaladiza', 'Apelación a la Mayoría'],
        correct: 0,
        explanation: 'Atribuye la causa a algo irrelevante.'
    },
    {
        text: '"Si estudias, aprobarás. No aprobaste, entonces no estudiaste."',
        options: ['Modus Tollens', 'Afirmación del Antecedente', 'Negación del Consecuente'],
        correct: 0,
        explanation: 'Esta es una inferencia válida, no una falacia.'
    },
    {
        text: '"Todos los ricos son felices, por eso quiero ser rico."',
        options: ['Generalización Apresurada', 'Apelación a la Emoción', 'Falsa Analogía'],
        correct: 0,
        explanation: 'Asume una generalización sin base suficiente.'
    },
    {
        text: '"Ese político miente, así que su política es mala."',
        options: ['Ad Hominem', 'Pendiente Resbaladiza', 'Apelación a la Autoridad'],
        correct: 0,
        explanation: 'Ataca al político en lugar de evaluar la política.'
    }
];

// --- VARIABLES DE ESTADO ---
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timerInterval;
const totalTimePerQuestion = 15;

// --- REFERENCIAS AL DOM (CON VALIDACIÓN) ---
const questionText = document.getElementById('question-text');
const questionCounter = document.getElementById('question-counter');
const scoreDisplay = document.getElementById('score-display');
const timerFill = document.getElementById('timer-fill');
const timeText = document.getElementById('time-text');
const feedbackOverlay = document.getElementById('feedback-overlay');
const resultsScreen = document.getElementById('results-screen');
const answersGrid = document.getElementById('answers-grid');

// Validar elementos críticos
const domElementsExist = !!(questionText && questionCounter && scoreDisplay && timerFill && timeText && answersGrid);
if (!domElementsExist) {
    console.error('✗ Error: Faltan elementos HTML necesarios para el juego');
}

// --- INICIO DEL JUEGO ---
function initGame() {
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
}

// --- CARGAR PREGUNTA ---
function loadQuestion() {
    if (currentQuestionIndex >= questionsDB.length) {
        endGame();
        return;
    }

    clearInterval(timerInterval);
    timeLeft = totalTimePerQuestion;
    updateTimerUI();
    startTimer();

    const currentQ = questionsDB[currentQuestionIndex];
    if (questionText) questionText.innerText = currentQ.text;
    if (questionCounter) questionCounter.innerText = `${currentQuestionIndex + 1} / ${questionsDB.length}`;
    
    // Generar botones dinámicamente
    answersGrid.innerHTML = '';
    currentQ.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'btn-answer';
        button.innerText = option;
        button.onclick = () => selectAnswer(index);
        answersGrid.appendChild(button);
    });
    
    if (feedbackOverlay) {
        feedbackOverlay.classList.remove('visible', 'feedback-correct', 'feedback-wrong');
    }
}

// --- TEMPORIZADOR ---
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerUI();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleTimeOut();
        }
    }, 1000);
}

function updateTimerUI() {
    timeText.innerText = `${timeLeft}s`;
    const percentage = (timeLeft / totalTimePerQuestion) * 100;
    timerFill.style.width = `${percentage}%`;
    
    // Cambiar color si queda poco tiempo
    if (timeLeft <= 5) {
        timerFill.style.background = '#ff0000';
    } else {
        timerFill.style.background = '#E50914';
    }
}

// --- MANEJO DE RESPUESTAS ---
function selectAnswer(userChoice) {
    clearInterval(timerInterval); // Pausar tiempo

    const currentQ = questionsDB[currentQuestionIndex];
    const isCorrect = (userChoice === currentQ.correct);

    if (isCorrect) {
        score += 100 + (timeLeft * 10); // Bonificación por tiempo
        showFeedback(true, "¡CORRECTO!");
    } else {
        showFeedback(false, "INCORRECTO");
    }

    scoreDisplay.innerText = score;
}

function handleTimeOut() {
    showFeedback(false, "TIEMPO AGOTADO");
}

function showFeedback(isSuccess, message) {
    if (!feedbackOverlay) return;

    const icon = document.getElementById('feedback-icon');
    const text = document.getElementById('feedback-text');
    
    if (icon && text) {
        icon.innerText = isSuccess ? '✅' : '❌';
        text.innerText = message;
    }
    
    feedbackOverlay.className = isSuccess ? 'feedback-correct' : 'feedback-wrong';
    feedbackOverlay.classList.add('visible');

    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 1500);
}

// --- FIN DEL JUEGO ---
function endGame() {
    if (resultsScreen) resultsScreen.classList.add('visible');
    
    const finalScore = document.getElementById('final-score');
    if (finalScore) finalScore.innerText = score;
    
    const msg = document.getElementById('final-message');
    if (msg) {
        if (score >= 1500) msg.innerText = "¡ERES UN MAESTRO DE LAS FALACIAS!";
        else if (score >= 1000) msg.innerText = "EXCELENTE TRABAJO";
        else msg.innerText = "NECESITAS PRACTICAR MÁS";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (domElementsExist) {
        console.log('✓ Juego de falacias inicializado correctamente');
        initGame();
    } else {
        console.error('✗ No se pudo iniciar el juego por falta de elementos HTML');
    }
});