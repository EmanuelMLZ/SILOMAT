/* ===========================================================
   BASE DE DATOS DE PREGUNTAS (NIVEL 1 - FUNDAMENTOS)
   Fuente: Clase 2.pdf y Guía 1 de Ejercicios
   =========================================================== */
const questionsDB = [
    {
        text: "¿El objeto de estudio de la lógica es el contenido del pensamiento?",
        isTrue: false,
        explanation: "Falso. La lógica estudia la FORMA o estructura del pensamiento, no su contenido."
    },
    {
        text: "¿Aristóteles es considerado el padre de la lógica formal?",
        isTrue: true,
        explanation: "Verdadero. Aristóteles sistematizó los primeros estudios de lógica en el siglo IV a.C."
    },
    {
        text: "¿La validez de un razonamiento depende de que sus premisas sean verdaderas?",
        isTrue: false,
        explanation: "Falso. Un razonamiento puede ser válido en su estructura aunque sus premisas sean falsas (Validez ≠ Verdad)."
    },
    {
        text: "¿Una falacia es un razonamiento lógicamente incorrecto pero persuasivo?",
        isTrue: true,
        explanation: "Verdadero. Las falacias son errores de razonamiento que parecen válidos psicológicamente."
    },
    {
        text: "¿El razonamiento inductivo va de lo general a lo particular?",
        isTrue: false,
        explanation: "Falso. El inductivo va de casos particulares a una conclusión general. El deductivo va de general a particular."
    },
    {
        text: "¿El juicio es la afirmación o negación de algo sobre un concepto?",
        isTrue: true,
        explanation: "Verdadero. Es uno de los factores del pensamiento donde se establece una relación entre sujeto y predicado."
    },
    {
        text: "¿La falacia Ad Hominem ataca a la persona en lugar del argumento?",
        isTrue: true,
        explanation: "Verdadero. Consiste en desacreditar al oponente por sus características personales en vez de refutar sus ideas."
    },
    {
        text: "¿Gottlob Frege y George Boole revolucionaron la lógica en el siglo XIX?",
        isTrue: true,
        explanation: "Verdadero. Introdujeron la lógica simbólica y matemática moderna."
    },
    {
        text: "¿Si un razonamiento tiene conclusión verdadera, es automáticamente válido?",
        isTrue: false,
        explanation: "Falso. Se puede llegar a una conclusión verdadera por suerte o error, sin seguir una estructura válida."
    },
    {
        text: "¿La Lógica Material se preocupa por la verdad real de las premisas?",
        isTrue: true,
        explanation: "Verdadero. A diferencia de la lógica formal, la material analiza si el contenido coincide con la realidad."
    },
    {
        text: "¿'Todos los planetas tienen vida' es una premisa materialmente verdadera?",
        isTrue: false,
        explanation: "Falso. Según la realidad científica actual, no todos los planetas tienen vida confirmada."
    },
    {
        text: "¿El lenguaje es uno de los factores fundamentales del pensamiento?",
        isTrue: true,
        explanation: "Verdadero. El lenguaje permite expresar y estructurar los razonamientos lógicos."
    },
    {
        text: "¿Un silogismo consta siempre de tres premisas y ninguna conclusión?",
        isTrue: false,
        explanation: "Falso. Un silogismo clásico tiene dos premisas y una conclusión."
    },
    {
        text: "¿La generalización apresurada es una falacia formal?",
        isTrue: false,
        explanation: "Falso. Es una falacia INFORMAL, un error en el contenido al generalizar con pocos datos."
    },
    {
        text: "¿La lógica nos ayuda a evitar sesgos cognitivos?",
        isTrue: true,
        explanation: "Verdadero. El pensamiento lógico estructurado reduce la influencia de emociones y errores de juicio."
    }
];

// ==========================================
// VARIABLES DE ESTADO
// ==========================================
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timerInterval;
let isPaused = false; // Para detener el timer durante el feedback
const totalTimePerQuestion = 10;

// Elementos del DOM
const ui = {
    questionText: document.getElementById('question-text'),
    counter: document.getElementById('question-counter'),
    score: document.getElementById('score-display'),
    timerFill: document.getElementById('timer-fill'),
    timerText: document.getElementById('time-text'),
    overlay: document.getElementById('feedback-overlay'),
    fbTitle: document.getElementById('feedback-title'),
    fbExplanation: document.getElementById('feedback-explanation'),
    fbIconBox: document.getElementById('feedback-icon-box'),
    resultsScreen: document.getElementById('results-screen'),
    finalScore: document.getElementById('final-score'),
    finalMsg: document.getElementById('final-message')
};

// ==========================================
// MOTOR DEL JUEGO
// ==========================================

function initGame() {
    currentQuestionIndex = 0;
    score = 0;
    // Mezclar preguntas aleatoriamente cada vez que se juega (Shuffle)
    questionsDB.sort(() => Math.random() - 0.5);
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestionIndex >= questionsDB.length) {
        endGame();
        return;
    }

    isPaused = false;
    ui.overlay.classList.remove('visible'); // Ocultar feedback
    
    // Resetear Timer
    clearInterval(timerInterval);
    timeLeft = totalTimePerQuestion;
    updateTimerUI();
    startTimer();

    // Cargar textos
    const currentQ = questionsDB[currentQuestionIndex];
    ui.questionText.innerText = currentQ.text;
    ui.counter.innerText = `${String(currentQuestionIndex + 1).padStart(2, '0')} / ${questionsDB.length}`;
}

function startTimer() {
    timerInterval = setInterval(() => {
        if (!isPaused) {
            timeLeft -= 0.1; // Decremento suave para la barra
            if (timeLeft < 0) timeLeft = 0;
            updateTimerUI();

            if (timeLeft <= 0) {
                handleTimeOut();
            }
        }
    }, 100);
}

function updateTimerUI() {
    // Texto redondeado
    ui.timerText.innerText = `${Math.ceil(timeLeft)}s`;
    
    // Barra de progreso
    const percentage = (timeLeft / totalTimePerQuestion) * 100;
    ui.timerFill.style.width = `${percentage}%`;
    
    // Color de alerta
    if (timeLeft <= 3) {
        ui.timerFill.style.background = '#ff0000';
    } else {
        ui.timerFill.style.background = 'linear-gradient(90deg, #E50914, #ff4b55)';
    }
}

// ==========================================
// MANEJO DE RESPUESTAS
// ==========================================

function selectAnswer(userChoice) {
    if (isPaused) return; // Evitar doble click
    isPaused = true;
    clearInterval(timerInterval);

    const currentQ = questionsDB[currentQuestionIndex];
    const isCorrect = (userChoice === currentQ.isTrue);

    if (isCorrect) {
        // Cálculo de puntaje: Base 100 + (Tiempo restante * 10)
        const timeBonus = Math.floor(timeLeft * 10);
        score += 100 + timeBonus;
        ui.score.innerText = score;
        showFeedback(true, currentQ.explanation);
    } else {
        showFeedback(false, currentQ.explanation);
    }
}

function handleTimeOut() {
    isPaused = true;
    clearInterval(timerInterval);
    const currentQ = questionsDB[currentQuestionIndex];
    showFeedback(false, `¡Tiempo agotado! ${currentQ.explanation}`);
}

// ==========================================
// FEEDBACK SYSTEM (Overlay)
// ==========================================

function showFeedback(success, explanationText) {
    ui.overlay.className = success ? 'is-correct' : 'is-wrong';
    ui.overlay.classList.add('visible');

    ui.fbTitle.innerText = success ? "¡CORRECTO!" : "INCORRECTO";
    ui.fbExplanation.innerText = explanationText;

    // Inyectar SVG dinámico (Minimalista)
    if (success) {
        ui.fbIconBox.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>`;
    } else {
        ui.fbIconBox.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>`;
    }
}

// Función llamada por el botón "CONTINUAR" del overlay
function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

// Aseguramos que la función sea global para el botón HTML
window.nextQuestion = nextQuestion;
window.selectAnswer = selectAnswer;

// ==========================================
// FIN DEL JUEGO
// ==========================================

function endGame() {
    ui.resultsScreen.classList.add('visible');
    ui.finalScore.innerText = score;
    
    // Mensaje personalizado
    const maxScore = questionsDB.length * 200; // Aprox
    const percentage = score / maxScore;

    if (percentage > 0.8) ui.finalMsg.innerText = "¡ERES UN GENIO LÓGICO! 🧠";
    else if (percentage > 0.5) ui.finalMsg.innerText = "BUEN TRABAJO, PERO PUEDES MEJORAR.";
    else ui.finalMsg.innerText = "NECESITAS REPASAR LOS FUNDAMENTOS.";
}

// Iniciar al cargar
document.addEventListener('DOMContentLoaded', initGame);