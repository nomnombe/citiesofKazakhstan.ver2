// === Единый скрипт для всех страниц сайта "Города Казахстана" ===
document.addEventListener('DOMContentLoaded', () => {

  /* ==============================
     🌍 1. Карта (страница karta.html)
     ============================== */
  if (typeof L !== 'undefined' && document.getElementById('map')) {
    const map = L.map('map').setView([51.1694, 71.4491], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Пример меток — можно добавить свои города
    const cities = [
      { name: 'Астана', coords: [51.1605, 71.4704] },
      { name: 'Алматы', coords: [43.2220, 76.8512] },
      { name: 'Шымкент', coords: [42.3167, 69.5950] },
    ];

    cities.forEach(city => {
      L.marker(city.coords).addTo(map).bindPopup(`<b>${city.name}</b>`);
    });
  }

  /* =======================================
     🖼️ 2. Слайдер фото (страница history.html)
     ======================================= */
  const slider = document.querySelector('.photo-slider');
  if (slider) {
    const images = slider.querySelectorAll('img');
    const prevBtn = slider.querySelector('#prevBtn');
    const nextBtn = slider.querySelector('#nextBtn');
    let index = 0;

    function showImage(i) {
      images.forEach((img, idx) => img.classList.toggle('active', idx === i));
    }

    nextBtn.addEventListener('click', () => {
      index = (index + 1) % images.length;
      showImage(index);
    });

    prevBtn.addEventListener('click', () => {
      index = (index - 1 + images.length) % images.length;
      showImage(index);
    });
  }

  /* ===========================================
     🔍 3. Поиск по городам (главная страница)
     =========================================== */
  const searchInput = document.getElementById('siteSearch');
  const searchBtn = document.getElementById('searchBtn');

  if (searchInput && searchBtn) {
    searchBtn.addEventListener('click', () => {
      const query = searchInput.value.trim();
      if (query) {
        alert(`Поиск города: ${query}`);
        // Здесь можно добавить переход к странице города
      } else {
        alert('Введите название города для поиска.');
      }
    });
  }

  /* ===========================================
     💬 4. Приветственное окно (если есть)
     =========================================== */
  const welcomeOverlay = document.getElementById('welcome-overlay');
  if (welcomeOverlay) {
    setTimeout(() => {
      welcomeOverlay.style.display = 'none';
    }, 2000);
  }
});




const questions = [
  {
    question: "Какой город является столицей Казахстана?",
    options: ["Алматы", "Астана", "Шымкент", "Караганда"],
    answer: "Астана"
  },
  {
    question: "Какой город называют «южной столицей»?",
    options: ["Павлодар", "Шымкент", "Алматы", "Актобе"],
    answer: "Алматы"
  },
  {
    question: "Какой город расположен у Каспийского моря?",
    options: ["Атырау", "Петропавловск", "Костанай", "Тараз"],
    answer: "Атырау"
  },
  {
    question: "Какой город находится ближе всего к России?",
    options: ["Актобе", "Петропавловск", "Жезказган", "Кызылорда"],
    answer: "Петропавловск"
  },
  {
    question: "В каком городе находится знаменитый Байтерек?",
    options: ["Астана", "Алматы", "Кокшетау", "Актау"],
    answer: "Астана"
  },
  {
    question: "Какой город известен своими минеральными источниками?",
    options: ["Сарыагаш", "Кокшетау", "Тараз", "Кызылорда"],
    answer: "Сарыагаш"
  },
  {
    question: "В каком городе расположен Кожевенный завод и Петропавловская крепость?",
    options: ["Актобе", "Петропавловск", "Костанай", "Павлодар"],
    answer: "Петропавловск"
  },
  {
    question: "Какой город раньше назывался Верный?",
    options: ["Алматы", "Талдыкорган", "Жезказган", "Астана"],
    answer: "Алматы"
  },
  {
    question: "Какой город находится у гор Заилийского Алатау?",
    options: ["Алматы", "Петропавловск", "Актобе", "Шымкент"],
    answer: "Алматы"
  },
  {
    question: "Какой город является крупнейшим портом на Каспийском море?",
    options: ["Актау", "Атырау", "Кызылорда", "Шымкент"],
    answer: "Актау"
  }
];

let currentIndex = 0;
let score = 0;

const questionBox = document.getElementById("question-box");
const answersBox = document.getElementById("answers-box");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");

function loadQuestion() {
  const current = questions[currentIndex];
  questionBox.textContent = current.question;
  answersBox.innerHTML = "";

  current.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.classList.add("answer-btn");
    btn.addEventListener("click", () => checkAnswer(btn, current.answer));
    answersBox.appendChild(btn);
  });
}

function checkAnswer(selectedBtn, correctAnswer) {
  const buttons = document.querySelectorAll(".answer-btn");
  buttons.forEach(b => (b.disabled = true));

  if (selectedBtn.textContent === correctAnswer) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("wrong");
    buttons.forEach(b => {
      if (b.textContent === correctAnswer) b.classList.add("correct");
    });
  }
}

nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  document.getElementById("quiz-box").classList.add("hidden");
  resultBox.classList.remove("hidden");
  resultBox.innerHTML = `
    🎉 Викторина окончена!<br>
    Ваш результат: <strong>${score}</strong> из <strong>${questions.length}</strong>.<br><br>
    <button id="restart-btn">Пройти снова</button>
  `;

  const restartBtn = document.getElementById("restart-btn");
  restartBtn.addEventListener("click", restartQuiz);
}

function restartQuiz() {
  currentIndex = 0;
  score = 0;
  document.getElementById("quiz-box").classList.remove("hidden");
  resultBox.classList.add("hidden");
  loadQuestion();
}

loadQuestion();



// 🔍 Поиск по городам Казахстана
function searchCities() {
  const input = document.getElementById('siteSearch');
  const filter = input.value.toLowerCase();
  const cards = document.querySelectorAll('.city-card');

  cards.forEach(card => {
    const cityName = card.textContent.toLowerCase();
    if (cityName.includes(filter)) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}

// Обработка клика по кнопке "Найти"
document.getElementById('searchBtn').addEventListener('click', searchCities);

// Также чтобы поиск работал при вводе текста (без нажатия кнопки)
document.getElementById('siteSearch').addEventListener('keyup', searchCities);

function openCity(page) {
    window.location.href = page; // открывает указанную страницу
}

