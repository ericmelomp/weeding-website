// Data do casamento: 10 de Abril de 2027
const weddingDate = new Date('2027-04-10T00:00:00');

// Elementos do DOM
const yearsElement = document.getElementById('years');
const monthsElement = document.getElementById('months');
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

// Função para calcular diferença de tempo de forma precisa
function calculateTimeDifference(targetDate) {
    const now = new Date();
    
    // Se a data já passou, retornar zeros
    if (now >= targetDate) {
        return {
            years: 0,
            months: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        };
    }

    // Calcular anos
    let years = targetDate.getFullYear() - now.getFullYear();
    
    // Criar uma data ajustada para calcular meses e dias
    let tempDate = new Date(now);
    tempDate.setFullYear(tempDate.getFullYear() + years);
    
    // Se após adicionar os anos ainda passou da data alvo, reduzir um ano
    if (tempDate > targetDate) {
        years--;
        tempDate = new Date(now);
        tempDate.setFullYear(tempDate.getFullYear() + years);
    }
    
    // Calcular meses
    let months = targetDate.getMonth() - tempDate.getMonth();
    tempDate.setMonth(tempDate.getMonth() + months);
    
    // Se após adicionar os meses ainda passou da data alvo, reduzir um mês
    if (tempDate > targetDate) {
        months--;
        tempDate.setMonth(tempDate.getMonth() - 1);
    }
    
    // Calcular a diferença total em milissegundos
    const totalDifference = targetDate - tempDate;
    
    // Calcular dias completos
    let days = Math.floor(totalDifference / (1000 * 60 * 60 * 24));
    
    // Calcular horas restantes (garantindo que seja < 24)
    const remainingAfterDays = totalDifference - (days * 1000 * 60 * 60 * 24);
    let hours = Math.floor(remainingAfterDays / (1000 * 60 * 60));
    
    // Se horas >= 24, converter em dias (não deveria acontecer, mas garantimos)
    if (hours >= 24) {
        const extraDays = Math.floor(hours / 24);
        days += extraDays;
        hours = hours % 24;
    }
    
    // Garantir que horas está entre 0 e 23
    hours = Math.max(0, Math.min(23, hours));
    
    // Calcular minutos e segundos restantes
    const remainingAfterHours = remainingAfterDays - (hours * 1000 * 60 * 60);
    const minutes = Math.floor(remainingAfterHours / (1000 * 60));
    const seconds = Math.floor((remainingAfterHours % (1000 * 60)) / 1000);

    return {
        years: Math.max(0, years),
        months: Math.max(0, months),
        days: Math.max(0, days),
        hours: hours,
        minutes: Math.max(0, minutes),
        seconds: Math.max(0, seconds)
    };
}

// Função para atualizar o contador
function updateCountdown() {
    const timeLeft = calculateTimeDifference(weddingDate);

    // Função para adicionar animação de flash quando o valor muda
    function updateWithFlash(element, newValue, oldValue, isLarge = false) {
        const formattedValue = isLarge ? newValue.toString() : newValue.toString().padStart(2, '0');
        const oldFormattedValue = oldValue ? oldValue.toString() : '0';
        
        if (formattedValue !== oldFormattedValue) {
            element.classList.add('flash');
            element.textContent = formattedValue;
            setTimeout(() => {
                element.classList.remove('flash');
            }, 500);
        } else {
            element.textContent = formattedValue;
        }
    }

    // Atualizar elementos com animação
    const oldYears = yearsElement.textContent;
    const oldMonths = monthsElement.textContent;
    const oldDays = daysElement.textContent;
    const oldHours = hoursElement.textContent;
    const oldMinutes = minutesElement.textContent;
    const oldSeconds = secondsElement.textContent;

    updateWithFlash(yearsElement, timeLeft.years, oldYears, true);
    updateWithFlash(monthsElement, timeLeft.months, oldMonths);
    updateWithFlash(daysElement, timeLeft.days, oldDays, true);
    updateWithFlash(hoursElement, timeLeft.hours, oldHours);
    updateWithFlash(minutesElement, timeLeft.minutes, oldMinutes);
    updateWithFlash(secondsElement, timeLeft.seconds, oldSeconds);
}

// Atualizar imediatamente
updateCountdown();

// Atualizar a cada segundo
setInterval(updateCountdown, 1000);

// Animação de entrada ao scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Função de animação de escrita (Typewriter Effect)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            const char = text.charAt(i);
            // Se for o caractere &, adiciona com classe gold
            if (char === '&') {
                element.innerHTML += '<span class="gold">&</span>';
            } else if (char === ' ') {
                // Manter espaços
                element.innerHTML += ' ';
            } else {
                element.innerHTML += char;
            }
            i++;
            setTimeout(type, speed);
        } else {
            // Quando terminar, fazer o cursor desaparecer suavemente
            setTimeout(() => {
                const cursor = document.querySelector('.cursor');
                if (cursor) {
                    cursor.style.opacity = '0';
                    cursor.style.transition = 'opacity 0.5s ease-out';
                    setTimeout(() => {
                        cursor.style.display = 'none';
                    }, 500);
                }
            }, 500);
        }
    }
    
    type();
}

// Observar elementos das seções
document.addEventListener('DOMContentLoaded', () => {
    // Garantir que o logo seja exibido corretamente
    const logoBrasao = document.querySelector('.logo-brasao');
    if (logoBrasao) {
        logoBrasao.style.display = 'block';
        logoBrasao.style.visibility = 'visible';
        // Verificar se a imagem carregou
        logoBrasao.onerror = function() {
            console.error('Erro ao carregar o logo: assets/logobrasao.png');
            this.style.display = 'none';
        };
        logoBrasao.onload = function() {
            console.log('Logo carregado com sucesso!');
            this.style.display = 'block';
        };
    }
    
    // Iniciar animação de escrita
    const typewriterText = document.querySelector('.typewriter-text');
    if (typewriterText) {
        // Aguardar um pouco para começar a animação (após o fade-in do logo)
        setTimeout(() => {
            typeWriter(typewriterText, 'Suzana & Eric', 150);
        }, 800);
    }

    const sections = document.querySelectorAll('.gallery-section, .countdown-section, .photo-section, .about-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(section);
    });
    
    // Tratamento de erro para fotos da galeria
    const galleryPhotos = document.querySelectorAll('.gallery-photo');
    galleryPhotos.forEach(photo => {
        photo.onerror = function() {
            // Se a foto não carregar, ocultar o frame
            this.parentElement.style.display = 'none';
        };
    });
    
    // Verificar se a imagem de background foi carregada
    const photoSection = document.querySelector('.photo-section');
    if (photoSection) {
        const img = new Image();
        img.onload = function() {
            console.log('Imagem de background carregada com sucesso!');
        };
        img.onerror = function() {
            console.error('Erro ao carregar a imagem de background: assets/noivos_preto_branco.png');
        };
        img.src = 'assets/noivos_preto_branco.png';
    }
    
    // Inicializar carousel para mobile
    initPhotoCarousel();

    // Smooth scroll para o scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            document.getElementById('timer').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
        
        // Tornar o scroll indicator clicável
        scrollIndicator.style.cursor = 'pointer';
    }
});

// Efeito parallax suave no hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Prevenir scroll horizontal
window.addEventListener('resize', () => {
    document.body.style.overflowX = 'hidden';
});

// Função para inicializar o carousel de fotos (mobile)
function initPhotoCarousel() {
    const photoFrames = document.querySelectorAll('.photo-carousel .photo-frame');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const carousel = document.querySelector('.photo-carousel');
    
    if (photoFrames.length === 0) return;
    
    // Só inicializar carousel em mobile (width <= 768px)
    function checkMobile() {
        return window.innerWidth <= 768;
    }
    
    // Estado do carousel
    let currentSlide = 0;
    const totalSlides = photoFrames.length;
    let isTransitioning = false;
    
    // Se não for mobile, mostrar todas as fotos e sair
    if (!checkMobile()) {
        photoFrames.forEach(frame => {
            frame.classList.add('active');
            frame.style.opacity = '1';
            frame.style.position = 'relative';
            frame.style.transform = '';
        });
        return;
    }
    
    // Função para atualizar o carousel
    function updateCarousel(direction = 0) {
        // Remover active de todas
        photoFrames.forEach((frame, index) => {
            frame.classList.remove('active');
            if (index !== currentSlide) {
                frame.style.opacity = '0';
                frame.style.transform = 'translateX(-50%) translateX(0)';
                frame.style.pointerEvents = 'none';
                frame.style.zIndex = '1';
            }
        });
        
        // Ativar foto atual
        const activeFrame = photoFrames[currentSlide];
        activeFrame.classList.add('active');
        activeFrame.style.pointerEvents = 'auto';
        activeFrame.style.zIndex = '2';
        
        // Atualizar dots
        dots.forEach((dot, index) => {
            dot.classList.remove('active');
            if (index === currentSlide) {
                dot.classList.add('active');
            }
        });
        
        // Animação
        if (direction !== 0) {
            activeFrame.style.transition = 'none';
            activeFrame.style.opacity = '0';
            activeFrame.style.transform = direction > 0 
                ? 'translateX(-50%) translateX(60px)' 
                : 'translateX(-50%) translateX(-60px)';
            
            // Forçar renderização
            void activeFrame.offsetHeight;
            
            // Animar entrada
            requestAnimationFrame(() => {
                activeFrame.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                activeFrame.style.opacity = '1';
                activeFrame.style.transform = 'translateX(-50%) translateX(0)';
            });
        } else {
            // Primeira carga
            activeFrame.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            activeFrame.style.opacity = '1';
            activeFrame.style.transform = 'translateX(-50%) translateX(0)';
        }
    }
    
    // Navegação - próxima
    function goNext() {
        if (isTransitioning || !checkMobile()) return;
        
        isTransitioning = true;
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel(1);
        
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }
    
    // Navegação - anterior
    function goPrev() {
        if (isTransitioning || !checkMobile()) return;
        
        isTransitioning = true;
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel(-1);
        
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }
    
    // Event listeners - usar método mais confiável
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            goNext();
        }, { once: false, passive: false });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            goPrev();
        }, { once: false, passive: false });
    }
    
    // Dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (currentSlide !== index && !isTransitioning && checkMobile()) {
                isTransitioning = true;
                const direction = index > currentSlide ? 1 : -1;
                currentSlide = index;
                updateCarousel(direction);
                setTimeout(() => {
                    isTransitioning = false;
                }, 500);
            }
        });
    });
    
    // Swipe
    let touchStartX = 0;
    let touchEndX = 0;
    
    if (carousel) {
        carousel.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        carousel.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            const threshold = 50;
            
            if (Math.abs(diff) > threshold && !isTransitioning && checkMobile()) {
                if (diff > 0) {
                    goNext();
                } else {
                    goPrev();
                }
            }
        }, { passive: true });
    }
    
    // Auto-play para mobile (trocar a cada 3 segundos)
    let autoPlayInterval = null;
    
    function startAutoPlay() {
        if (!checkMobile()) return;
        if (autoPlayInterval) return; // Já está rodando
        
        autoPlayInterval = setInterval(function() {
            if (!isTransitioning && checkMobile()) {
                goNext();
            }
        }, 3000); // 3 segundos
    }
    
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }
    
    // Pausar auto-play quando o usuário interagir
    if (carousel) {
        carousel.addEventListener('touchstart', function() {
            stopAutoPlay();
            // Reiniciar após 5 segundos de inatividade
            setTimeout(function() {
                if (checkMobile()) {
                    startAutoPlay();
                }
            }, 5000);
        }, { passive: true });
    }
    
    // Inicializar
    updateCarousel(0);
    
    // Iniciar auto-play em mobile
    if (checkMobile()) {
        startAutoPlay();
    }
    
    // Resize handler
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            if (checkMobile()) {
                currentSlide = 0;
                updateCarousel(0);
                startAutoPlay(); // Reiniciar auto-play em mobile
            } else {
                stopAutoPlay(); // Parar auto-play em desktop
                photoFrames.forEach((frame) => {
                    frame.classList.add('active');
                    frame.style.opacity = '1';
                    frame.style.position = 'relative';
                    frame.style.transform = '';
                });
            }
        }, 250);
    });
}