document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        nav.classList.toggle('active');
    });
    
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-theme');
        
        const icon = themeToggle.querySelector('i');
        if (body.classList.contains('dark-theme')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
        
        const theme = body.classList.contains('dark-theme') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
    });
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        const icon = themeToggle.querySelector('i');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
    
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', function() {
            accordionItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            item.classList.toggle('active');
        });
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                nav.classList.remove('active');
            }
        });
    });
    
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelector(`nav ul li a[href="#${sectionId}"]`).classList.add('active');
            } else {
                document.querySelector(`nav ul li a[href="#${sectionId}"]`).classList.remove('active');
            }
        });
    });
});
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchResultsSection = document.getElementById('search-results');
const resultsContainer = document.getElementById('results-container');


const searchDatabase = [
    {
        title: "Управление пакетами в Linux",
        content: "Команды для установки, обновления и удаления пакетов в различных дистрибутивах Linux.",
        category: "Linux",
        link: "#linux"
    },
    {
        title: "Управление пользователями в Linux",
        content: "Создание, изменение и удаление пользователей и групп в Linux системах.",
        category: "Linux",
        link: "#linux"
    },
    {
        title: "PowerShell команды",
        content: "Основные команды PowerShell для администрирования Windows систем.",
        category: "Windows",
        link: "#windows"
    },
    {
        title: "Управление службами Windows",
        content: "Команды для управления службами в Windows Server и рабочих станциях.",
        category: "Windows",
        link: "#windows"
    },
    {
        title: "Диагностика сети",
        content: "Инструменты и команды для диагностики сетевых проблем в различных операционных системах.",
        category: "Сети",
        link: "#network"
    },
    {
        title: "Настройка брандмауэра",
        content: "Команды для настройки брандмауэра в Linux (iptables, firewalld) и Windows.",
        category: "Сети",
        link: "#network"
    },
    {
        title: "JavaScript сниппеты",
        content: "Полезные фрагменты кода JavaScript для веб-разработки.",
        category: "Программирование",
        link: "#dev"
    },
    {
        title: "Python - работа с данными",
        content: "Примеры работы с JSON, CSV и другими форматами данных в Python.",
        category: "Программирование",
        link: "#dev"
    },
    {
        title: "MySQL / MariaDB",
        content: "Основные SQL запросы и команды для работы с MySQL и MariaDB.",
        category: "Базы данных",
        link: "#databases"
    },
    {
        title: "MongoDB",
        content: "Команды для работы с документоориентированной базой данных MongoDB.",
        category: "Базы данных",
        link: "#databases"
    },
    {
        title: "AWS CLI",
        content: "Команды AWS CLI для управления облачными ресурсами Amazon Web Services.",
        category: "Облачные технологии",
        link: "#cloud"
    },
    {
        title: "Docker и Kubernetes",
        content: "Основные команды для работы с контейнерами Docker и оркестрации Kubernetes.",
        category: "Облачные технологии",
        link: "#cloud"
    }
];


function performSearch(query) {
   
    resultsContainer.innerHTML = '';
    
    if (!query.trim()) {
        searchResultsSection.style.display = 'none';
        return;
    }
    
    const normalizedQuery = query.toLowerCase();
    
    const results = searchDatabase.filter(item => 
        item.title.toLowerCase().includes(normalizedQuery) || 
        item.content.toLowerCase().includes(normalizedQuery) ||
        item.category.toLowerCase().includes(normalizedQuery)
    );
    
    if (results.length > 0) {
        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            
            resultItem.innerHTML = `
                <h3>${result.title}</h3>
                <p>${result.content}</p>
                <span class="result-category">${result.category}</span>
                <div>
                    <a href="${result.link}" class="result-link">Перейти к разделу <i class="fas fa-arrow-right"></i></a>
                </div>
            `;
            
            resultsContainer.appendChild(resultItem);
        });
    } else {
        const noResults = document.createElement('div');
        noResults.className = 'no-results';
        
        noResults.innerHTML = `
            <i class="fas fa-search"></i>
            <p>По запросу "${query}" ничего не найдено</p>
            <p>Попробуйте изменить поисковый запрос или просмотреть категории ниже</p>
        `;
        
        resultsContainer.appendChild(noResults);
    }
    
    searchResultsSection.style.display = 'block';
    
    searchResultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

searchButton.addEventListener('click', function() {
    performSearch(searchInput.value);
});

searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        performSearch(searchInput.value);
    }
});