// ========================================
// TYPING ANIMATION
// ========================================
function initTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const fullText = heroTitle.textContent.trim();
    const speed = 200; // Velocidade de digitação em ms por caractere (mais lenta)
    let charIndex = 0;
    
    // Limpa o texto inicial
    heroTitle.textContent = '';
    
    function typeChar() {
        if (charIndex < fullText.length) {
            // Adiciona o próximo caractere
            heroTitle.textContent += fullText[charIndex];
            
            charIndex++;
            
            // Continua digitando
            setTimeout(typeChar, speed);
        }
    }
    
    // Inicia a animação após um pequeno delay
    setTimeout(typeChar, 300);
}

// ========================================
// COUNTDOWN
// ========================================
function initCountdown() {
    const targetDate = new Date('2027-04-10T16:00:00');
    const yearsEl = document.getElementById('years');
    const monthsEl = document.getElementById('months');
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    if (!yearsEl || !monthsEl || !daysEl || !hoursEl || !minutesEl || !secondsEl) return;
    
    function updateCountdown() {
        const now = new Date();
        const distance = targetDate - now;
        
        if (distance < 0) {
            yearsEl.textContent = '0';
            monthsEl.textContent = '0';
            daysEl.textContent = '0';
            hoursEl.textContent = '0';
            minutesEl.textContent = '0';
            secondsEl.textContent = '0';
            return;
        }
        
        // Calcula anos
        let years = targetDate.getFullYear() - now.getFullYear();
        let months = targetDate.getMonth() - now.getMonth();
        let days = targetDate.getDate() - now.getDate();
        let hours = targetDate.getHours() - now.getHours();
        let mins = targetDate.getMinutes() - now.getMinutes();
        let secs = targetDate.getSeconds() - now.getSeconds();
        
        // Ajusta segundos
        if (secs < 0) {
            secs += 60;
            mins--;
        }
        
        // Ajusta minutos
        if (mins < 0) {
            mins += 60;
            hours--;
        }
        
        // Ajusta horas
        if (hours < 0) {
            hours += 24;
            days--;
        }
        
        // Ajusta dias
        if (days < 0) {
            const lastMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
            days += lastMonth.getDate();
            months--;
        }
        
        // Ajusta meses
        if (months < 0) {
            months += 12;
            years--;
        }
        
        // Se ainda não chegou no ano
        if (years < 0) {
            years = 0;
            months = 0;
            days = 0;
            hours = 0;
            mins = 0;
            secs = 0;
        }
        
        yearsEl.textContent = years;
        monthsEl.textContent = months;
        daysEl.textContent = days;
        hoursEl.textContent = hours;
        minutesEl.textContent = mins;
        secondsEl.textContent = secs;
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000); // Atualiza a cada segundo
}

// ========================================
// SMOOTH SCROLL
// ========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Fecha menu mobile se estiver aberto
                const nav = document.getElementById('nav');
                if (nav && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                }
            }
        });
    });
}

// ========================================
// MOBILE MENU
// ========================================
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    
    if (!menuToggle || !nav) return;
    
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    
    // Fecha menu ao clicar em um link
    nav.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}

// ========================================
// FAQ ACCORDION
// ========================================
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (!question) return;
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Fecha todos os outros
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle do item atual
            item.classList.toggle('active', !isActive);
        });
    });
}

// ========================================
// HEADER SCROLL EFFECT
// ========================================
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
}

// ========================================
// RSVP FORM - UTILITIES
// ========================================
function normalizeName(name) {
    // Remove acentos e converte para minúsculas
    return name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim();
}

function generateRSVPId(nome, sobrenome) {
    // Gera ID único baseado em nome+sobrenome normalizado
    const normalizedNome = normalizeName(nome || '');
    const normalizedSobrenome = normalizeName(sobrenome || '');
    return `rsvp_${normalizedNome}_${normalizedSobrenome}`;
}

function checkExistingRSVP(nome, sobrenome) {
    const rsvpId = generateRSVPId(nome, sobrenome);
    const existing = localStorage.getItem(rsvpId);
    if (existing) {
        try {
            return JSON.parse(existing);
        } catch (e) {
            return null;
        }
    }
    return null;
}

function saveRSVP(data) {
    const nomeCompleto = `${data.nome || ''} ${data.sobrenome || ''}`.trim();
    const rsvpId = generateRSVPId(data.nome, data.sobrenome);
    
    const rsvpData = {
        ...data,
        nomeCompleto: nomeCompleto,
        submittedAt: new Date().toISOString()
    };
    
    localStorage.setItem(rsvpId, JSON.stringify(rsvpData));
    
    // Mantém compatibilidade com código antigo (opcional)
    localStorage.setItem('rsvp_submitted', JSON.stringify(rsvpData));
}

// ========================================
// RSVP FORM
// ========================================
function initRSVPForm() {
    const form = document.getElementById('rsvpForm');
    const successDiv = document.getElementById('rsvpSuccess');
    
    if (!form) return;
    
    // Navegação entre steps
    const nextButtons = form.querySelectorAll('.form-next');
    const backButtons = form.querySelectorAll('.form-back');
    
    nextButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const currentStep = btn.closest('.form-step');
            const nextStepNum = btn.getAttribute('data-next');
            const nextStep = form.querySelector(`[data-step="${nextStepNum}"]`);
            
            if (nextStep) {
                // Validação básica
                if (validateStep(currentStep)) {
                    currentStep.classList.remove('active');
                    nextStep.classList.add('active');
                    nextStep.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
    
    backButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const currentStep = btn.closest('.form-step');
            const backStepNum = btn.getAttribute('data-back');
            const backStep = form.querySelector(`[data-step="${backStepNum}"]`);
            
            if (backStep) {
                currentStep.classList.remove('active');
                backStep.classList.add('active');
                backStep.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // Mostrar/esconder campo número de pessoas e acompanhantes
    const presencaRadios = form.querySelectorAll('input[name="presenca"]');
    const numeroPessoasGroup = document.getElementById('numeroPessoasGroup');
    const numeroPessoasInput = document.getElementById('numeroPessoas');
    const acompanhantesGroup = document.getElementById('acompanhantesGroup');
    const acompanhantesContainer = document.getElementById('acompanhantesContainer');
    
    function updateAcompanhantesFields() {
        if (!acompanhantesContainer || !numeroPessoasInput) return;
        
        const numAcompanhantes = parseInt(numeroPessoasInput.value) || 0;
        
        // Limpa campos existentes
        acompanhantesContainer.innerHTML = '';
        
        if (numAcompanhantes > 0) {
            acompanhantesGroup.style.display = 'block';
            
            // Cria campos para cada acompanhante
            for (let i = 1; i <= numAcompanhantes; i++) {
                const acompanhanteDiv = document.createElement('div');
                acompanhanteDiv.className = 'acompanhante-item';
                acompanhanteDiv.innerHTML = `
                    <div class="acompanhante-header">
                        <label class="acompanhante-label">Acompanhante ${i}</label>
                    </div>
                    <div class="form-row">
                        <div class="form-group" style="flex: 1; margin-right: 1rem;">
                            <label for="acompanhante_nome_${i}" class="form-label">Nome *</label>
                            <input type="text" id="acompanhante_nome_${i}" name="acompanhante_nome_${i}" class="form-input" required>
                        </div>
                        <div class="form-group" style="flex: 1;">
                            <label for="acompanhante_sobrenome_${i}" class="form-label">Sobrenome *</label>
                            <input type="text" id="acompanhante_sobrenome_${i}" name="acompanhante_sobrenome_${i}" class="form-input" required>
                        </div>
                    </div>
                `;
                acompanhantesContainer.appendChild(acompanhanteDiv);
            }
        } else {
            acompanhantesGroup.style.display = 'none';
        }
    }
    
    if (presencaRadios.length && numeroPessoasGroup) {
        presencaRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                if (radio.value === 'sim') {
                    numeroPessoasGroup.style.display = 'block';
                    if (numeroPessoasInput) {
                        numeroPessoasInput.required = true;
                        numeroPessoasInput.value = '0';
                        updateAcompanhantesFields();
                    }
                } else {
                    numeroPessoasGroup.style.display = 'none';
                    acompanhantesGroup.style.display = 'none';
                    if (numeroPessoasInput) {
                        numeroPessoasInput.required = false;
                    }
                }
            });
        });
        
        // Atualiza campos quando o número de acompanhantes muda
        if (numeroPessoasInput) {
            numeroPessoasInput.addEventListener('input', updateAcompanhantesFields);
            numeroPessoasInput.addEventListener('change', updateAcompanhantesFields);
        }
    }
    
    // Submit do formulário
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!validateForm(form)) {
            return;
        }
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Verifica se já existe confirmação para este nome
        const existingRSVP = checkExistingRSVP(data.nome, data.sobrenome);
        let isUpdate = false;
        
        if (existingRSVP) {
            isUpdate = true;
            // Pergunta se deseja atualizar a confirmação existente
            const nomeCompleto = `${data.nome || ''} ${data.sobrenome || ''}`.trim();
            const confirmUpdate = confirm(
                `Você já confirmou sua presença como "${nomeCompleto}".\n\n` +
                `Deseja atualizar sua confirmação?\n\n` +
                `Confirmação anterior:\n` +
                `- Presença: ${existingRSVP.presenca === 'sim' ? 'Sim' : 'Não'}\n` +
                `- Número de pessoas: ${existingRSVP.numeroPessoas || '1'}\n\n` +
                `Clique em "OK" para atualizar ou "Cancelar" para manter a confirmação anterior.`
            );
            
            if (!confirmUpdate) {
                return; // Usuário cancelou, mantém confirmação anterior
            }
        }
        
        try {
            // Coleta dados dos acompanhantes antes de formatar
            const acompanhantesData = {};
            if (data.presenca === 'sim' && data.numeroPessoas) {
                const numAcomp = parseInt(data.numeroPessoas) || 0;
                for (let i = 1; i <= numAcomp; i++) {
                    acompanhantesData[`acompanhante_nome_${i}`] = data[`acompanhante_nome_${i}`] || '';
                    acompanhantesData[`acompanhante_sobrenome_${i}`] = data[`acompanhante_sobrenome_${i}`] || '';
                }
            }
            const dataCompleto = { ...data, ...acompanhantesData };
            
            // Formata o email em HTML bonito
            const emailHTML = formatEmailHTML(dataCompleto);
            
            // Envia o email usando EmailJS
            await sendEmail(dataCompleto, emailHTML);
            
            // Salva no localStorage (atualiza se já existir)
            saveRSVP(data);
            
            // Mostra mensagem de sucesso
            form.style.display = 'none';
            if (successDiv) {
                const successText = successDiv.querySelector('.success-text');
                if (successText && isUpdate) {
                    successText.textContent = 'Sua confirmação foi atualizada com sucesso! Obrigado por nos avisar sobre as mudanças.';
                }
                successDiv.style.display = 'block';
                successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            
        } catch (error) {
            console.error('Erro ao enviar formulário:', error);
            console.error('Detalhes do erro:', {
                message: error.message,
                text: error.text,
                status: error.status
            });
            
            let errorMessage = 'Ocorreu um erro ao enviar. Por favor, tente novamente.';
            
            // Mensagens de erro mais específicas
            if (error.status === 400) {
                errorMessage = 'Erro na configuração do EmailJS. Verifique o Service ID e Template ID.';
            } else if (error.status === 401) {
                errorMessage = 'Erro de autenticação. Verifique a Public Key do EmailJS.';
            } else if (error.status === 404) {
                errorMessage = 'Service ID ou Template ID não encontrado. Verifique as configurações.';
            } else if (error.text) {
                errorMessage = `Erro: ${error.text}`;
            }
            
            alert(errorMessage);
        }
    });
    
    // Verificação no passo 2 (quando tem nome/sobrenome)
    const nomeInput = form.querySelector('#nome');
    const sobrenomeInput = form.querySelector('#sobrenome');
    const step2 = form.querySelector('[data-step="2"]');
    
    function checkDuplicateOnStep2() {
        if (!nomeInput || !sobrenomeInput || !step2) return;
        
        const nome = nomeInput.value.trim();
        const sobrenome = sobrenomeInput.value.trim();
        
        if (nome && sobrenome && step2.classList.contains('active')) {
            const existingRSVP = checkExistingRSVP(nome, sobrenome);
            
            if (existingRSVP) {
                // Remove aviso anterior se existir
                const existingWarning = step2.querySelector('.duplicate-warning');
                if (existingWarning) {
                    existingWarning.remove();
                }
                
                // Cria aviso visual
                const warningDiv = document.createElement('div');
                warningDiv.className = 'duplicate-warning';
                warningDiv.innerHTML = `
                    <div class="warning-icon">ℹ️</div>
                    <div class="warning-content">
                        <strong>Você já confirmou sua presença!</strong>
                        <p>Se desejar atualizar sua confirmação, continue preenchendo o formulário.</p>
                        <p class="warning-details">
                            Confirmação anterior: ${existingRSVP.presenca === 'sim' ? 'Sim, presente' : 'Não poderei comparecer'} 
                            ${existingRSVP.numeroPessoas ? `(${existingRSVP.numeroPessoas} pessoa${existingRSVP.numeroPessoas > 1 ? 's' : ''})` : ''}
                        </p>
                    </div>
                `;
                
                const firstGroup = step2.querySelector('.form-group');
                if (firstGroup) {
                    step2.insertBefore(warningDiv, firstGroup);
                }
            } else {
                // Remove aviso se não há duplicata
                const existingWarning = step2.querySelector('.duplicate-warning');
                if (existingWarning) {
                    existingWarning.remove();
                }
            }
        }
    }
    
    if (nomeInput && sobrenomeInput) {
        nomeInput.addEventListener('blur', checkDuplicateOnStep2);
        sobrenomeInput.addEventListener('blur', checkDuplicateOnStep2);
        
        // Verifica quando step 2 fica ativo
        const observer = new MutationObserver(() => {
            if (step2 && step2.classList.contains('active')) {
                setTimeout(checkDuplicateOnStep2, 100);
            }
        });
        observer.observe(step2, { attributes: true, attributeFilter: ['class'] });
    }
}

// ========================================
// EMAIL FORMATTING
// ========================================
function formatEmailHTML(data) {
    const nomeCompleto = `${data.nome || ''} ${data.sobrenome || ''}`.trim();
    const presenca = data.presenca === 'sim' ? 'Sim, estarei presente' : 'Não, não poderei comparecer';
    const numAcompanhantes = data.presenca === 'sim' ? (parseInt(data.numeroPessoas) || 0) : 0;
    const totalPessoas = numAcompanhantes + 1; // Convidado + acompanhantes
    const observacoes = data.observacoes || 'Nenhuma observação';
    
    // Coleta informações dos acompanhantes
    const acompanhantes = [];
    if (data.presenca === 'sim' && numAcompanhantes > 0) {
        for (let i = 1; i <= numAcompanhantes; i++) {
            const nomeAcomp = data[`acompanhante_nome_${i}`] || '';
            const sobrenomeAcomp = data[`acompanhante_sobrenome_${i}`] || '';
            if (nomeAcomp || sobrenomeAcomp) {
                acompanhantes.push(`${nomeAcomp} ${sobrenomeAcomp}`.trim());
            }
        }
    }
    
    return `
<div style="font-family: 'Georgia', 'Times New Roman', serif; line-height: 1.6; color: #1F1F1F; background-color: #F7F4EF; margin: 0; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; padding: 40px;">
        <div style="text-align: center; border-bottom: 2px solid #C8A45D; padding-bottom: 20px; margin-bottom: 30px;">
            <h1 style="font-family: 'Playfair Display', serif; font-size: 28px; color: #1F1F1F; margin: 0; letter-spacing: 1px;">Casamento - Confirmação de Presença</h1>
            <div style="font-size: 16px; color: #6B6B6B; margin-top: 8px;">10 de abril de 2027</div>
        </div>
        
        <div style="color: #1F1F1F;">
            <p>Olá!</p>
            <p>Recebemos uma nova confirmação de presença para nosso casamento.</p>
            
            <div style="margin: 25px 0; padding: 20px; background-color: #F7F4EF; border-left: 3px solid #C8A45D;">
                <div style="margin: 12px 0;">
                    <span style="font-weight: 600; color: #1F1F1F; min-width: 140px; display: inline-block;">Nome:</span>
                    <span style="color: #6B6B6B;">${nomeCompleto}</span>
                </div>
                <div style="margin: 12px 0;">
                    <span style="font-weight: 600; color: #1F1F1F; min-width: 140px; display: inline-block;">Presença:</span>
                    <span style="color: #6B6B6B;">${presenca}</span>
                </div>
                ${data.presenca === 'sim' ? `
                <div style="margin: 12px 0;">
                    <span style="font-weight: 600; color: #1F1F1F; min-width: 140px; display: inline-block;">Total de pessoas:</span>
                    <span style="color: #6B6B6B;">${totalPessoas} ${totalPessoas === 1 ? 'pessoa' : 'pessoas'}</span>
                </div>
                ` : ''}
                ${acompanhantes.length > 0 ? `
                <div style="margin: 12px 0;">
                    <span style="font-weight: 600; color: #1F1F1F; min-width: 140px; display: inline-block;">Acompanhantes:</span>
                    <div style="color: #6B6B6B; margin-top: 4px;">
                        ${acompanhantes.map((nome, idx) => `<div style="margin: 4px 0;">${idx + 1}. ${nome}</div>`).join('')}
                    </div>
                </div>
                ` : ''}
                ${data.observacoes ? `
                <div style="margin: 12px 0;">
                    <span style="font-weight: 600; color: #1F1F1F; min-width: 140px; display: inline-block;">Observações:</span>
                    <span style="color: #6B6B6B;">${observacoes}</span>
                </div>
                ` : ''}
            </div>
            
            <p>Esta confirmação foi enviada automaticamente através do site do casamento.</p>
        </div>
        
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #E0E0E0; text-align: center; font-size: 14px; color: #6B6B6B;">
            <div style="font-family: 'Playfair Display', serif; font-size: 18px; color: #1F1F1F; margin-top: 10px;">Suzana & Eric</div>
            <div>10 de abril de 2027</div>
        </div>
    </div>
</div>
    `.trim();
}

// ========================================
// EMAIL SENDING (EmailJS)
// ========================================
async function sendEmail(data, emailHTML) {
    // Inicializa EmailJS (substitua 'YOUR_PUBLIC_KEY' pela sua chave pública do EmailJS)
    // Para obter a chave: https://www.emailjs.com/
    if (typeof emailjs === 'undefined') {
        console.error('EmailJS não está carregado');
        throw new Error('Serviço de email não disponível');
    }
    
    emailjs.init('RUCANfHn1ROI5Gq5X');
    
    const nomeCompleto = `${data.nome || ''} ${data.sobrenome || ''}`.trim();
    
    // Calcula acompanhantes e total de pessoas
    const numAcompanhantes = data.presenca === 'sim' ? (parseInt(data.numeroPessoas) || 0) : 0;
    const totalPessoas = numAcompanhantes + 1; // Convidado + acompanhantes
    
    const acompanhantes = [];
    if (data.presenca === 'sim' && numAcompanhantes > 0) {
        for (let i = 1; i <= numAcompanhantes; i++) {
            const nomeAcomp = data[`acompanhante_nome_${i}`] || '';
            const sobrenomeAcomp = data[`acompanhante_sobrenome_${i}`] || '';
            if (nomeAcomp || sobrenomeAcomp) {
                acompanhantes.push(`${nomeAcomp} ${sobrenomeAcomp}`.trim());
            }
        }
    }
    
    const templateParams = {
        to_email: 'ericmelomp@gmail.com,suzana.mlpaiva@gmail.com',
        subject: 'Casamento - Confirmação de Presença',
        message_html: emailHTML,
        name: nomeCompleto,  // Template pode esperar 'name' em vez de 'nome'
        email: 'casamentosuzeri@outlook.com',  // Email do remetente (Outlook service)
        nome: nomeCompleto,  // Mantém para compatibilidade
        presenca: data.presenca === 'sim' ? 'Sim' : 'Não',
        numero_pessoas: data.presenca === 'sim' ? totalPessoas.toString() : '0',
        acompanhantes: acompanhantes.length > 0 ? acompanhantes.join(', ') : 'Nenhum',
        observacoes: data.observacoes || 'Nenhuma observação'
    };
    
    // Log para debug
    console.log('Enviando email com parâmetros:', {
        service_id: 'service_ip2ourp',
        template_id: 'template_9dqwxqj',
        params: templateParams
    });
    
    // Envia o email
    await emailjs.send('service_ip2ourp', 'template_9dqwxqj', templateParams);
}

function validateStep(step) {
    const requiredInputs = step.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    requiredInputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#d32f2f';
            setTimeout(() => {
                input.style.borderColor = '';
            }, 2000);
        } else {
            input.style.borderColor = '';
        }
    });
    
    // Validação específica para radio buttons
    const radioGroups = step.querySelectorAll('input[type="radio"][required]');
    if (radioGroups.length > 0) {
        const groupName = radioGroups[0].name;
        const checked = step.querySelector(`input[name="${groupName}"]:checked`);
        if (!checked) {
            isValid = false;
        }
    }
    
    return isValid;
}

function validateForm(form) {
    const steps = form.querySelectorAll('.form-step');
    let isValid = true;
    
    steps.forEach(step => {
        if (!validateStep(step)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// ========================================
// CALENDAR ICS GENERATION
// ========================================
function generateICS() {
    const eventDate = new Date('2027-04-10T16:00:00');
    const endDate = new Date(eventDate);
    endDate.setHours(22, 0, 0);
    
    const formatDate = (date) => {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };
    
    const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Suzana & Eric//Wedding//PT',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        `DTSTART:${formatDate(eventDate)}`,
        `DTEND:${formatDate(endDate)}`,
        `DTSTAMP:${formatDate(new Date())}`,
        'SUMMARY:Casamento de Suzana & Eric',
        'DESCRIPTION:Celebração do casamento de Suzana & Eric',
        'LOCATION:Chácara Flores - R. Maria Emília, 101 - Somma, Ribeirão Pires - SP, 09445-740, Brasil',
        'STATUS:CONFIRMED',
        'SEQUENCE:0',
        'BEGIN:VALARM',
        'TRIGGER:-P1D',
        'ACTION:DISPLAY',
        'DESCRIPTION:O casamento é amanhã!',
        'END:VALARM',
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\r\n');
    
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'casamento-suzana-eric.ics';
    link.click();
    URL.revokeObjectURL(url);
}

// ========================================
// MAPS INTEGRATION
// ========================================
function initMapsIntegration() {
    const openMapsBtn = document.getElementById('openMaps');
    const directionsBtn = document.getElementById('directions');
    const saveCalendarBtn = document.getElementById('saveCalendar');
    
    // Coordenadas e endereço
    const address = 'R. Maria Emília, 101 - Somma, Ribeirão Pires - SP, 09445-740, Brasil';
    const lat = -23.71265;
    const lng = -46.35619;
    
    if (openMapsBtn) {
        openMapsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Abre no Google Maps (link compartilhável)
            window.open('https://maps.app.goo.gl/C7EvoLFLMVEzwtj66', '_blank');
        });
    }
    
    if (directionsBtn) {
        directionsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Abre rotas no Google Maps
            window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
        });
    }
    
    if (saveCalendarBtn) {
        saveCalendarBtn.addEventListener('click', (e) => {
            e.preventDefault();
            generateICS();
        });
    }
}

// ========================================
// INTERSECTION OBSERVER (ANIMATIONS)
// ========================================
function initScrollAnimations() {
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
    
    // Observa elementos que devem ter animação
    document.querySelectorAll('.info-card, .historia-content, .timeline-item, .faq-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ========================================
// INITIALIZE ALL
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initTypingAnimation();
    initCountdown();
    initSmoothScroll();
    initMobileMenu();
    initFAQ();
    initHeaderScroll();
    initRSVPForm();
    initMapsIntegration();
    initScrollAnimations();
    
    // Verifica se já submeteu RSVP
    const rsvpSubmitted = localStorage.getItem('rsvp_submitted');
    if (rsvpSubmitted && window.location.pathname.includes('rsvp')) {
        const form = document.getElementById('rsvpForm');
        const successDiv = document.getElementById('rsvpSuccess');
        if (form && successDiv) {
            form.style.display = 'none';
            successDiv.style.display = 'block';
        }
    }
});
