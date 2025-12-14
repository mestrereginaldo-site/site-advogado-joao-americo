// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== CURSOR PERSONALIZADO ==========
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });
    
    // Efeito ao passar o mouse em elementos interativos
    const interactiveElements = document.querySelectorAll('a, button, .area-card, .nav-link');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.backgroundColor = '#ff6f00';
            cursor.style.width = '16px';
            cursor.style.height = '16px';
            cursorFollower.style.borderColor = '#ff6f00';
            cursorFollower.style.width = '40px';
            cursorFollower.style.height = '40px';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.backgroundColor = '#ff6f00';
            cursor.style.width = '8px';
            cursor.style.height = '8px';
            cursorFollower.style.borderColor = '#1a237e';
            cursorFollower.style.width = '30px';
            cursorFollower.style.height = '30px';
        });
    });
    
    // ========== TYPING EFFECT ==========
    const typingText = document.querySelector('.typing-text');
    const phrases = [
        'dedicação',
        'experiência',
        'excelência',
        'compromisso',
        'ética'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            // Apagando texto
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Digitando texto
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }
        
        // Velocidade de digitação/apagamento
        let typeSpeed = isDeleting ? 50 : 100;
        
        // Se a frase estiver completa
        if (!isDeleting && charIndex === currentPhrase.length) {
            // Pausa antes de começar a apagar
            typeSpeed = 1500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    // Iniciar efeito de digitação
    setTimeout(type, 1000);
    
    // ========== MENU MOBILE ==========
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // ========== SCROLL SUAVE E HIGHLIGHT DO MENU ==========
    window.addEventListener('scroll', () => {
        // Atualizar menu ativo
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
        
        // Efeito de transparência na navbar
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        }
    });
    
    // ========== ANIMAÇÃO DAS ÁREAS DE ATUAÇÃO ==========
    const areaCards = document.querySelectorAll('.area-card');
    
    // Observador de interseção para animações
    const observerOptions = {
        threshold: 0.2,
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
    
    // Aplicar observador às áreas de atuação
    areaCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    
    // ========== MODAL DE CONSULTA RÁPIDA ==========
    const consultBtn = document.querySelector('.nav-btn');
    const modal = document.getElementById('consultModal');
    const closeModal = document.querySelector('.close-modal');
    
    consultBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
    
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Fechar modal ao clicar fora
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // ========== FORMULÁRIOS ==========
    const contactForm = document.getElementById('contactForm');
    const quickConsultForm = document.getElementById('quickConsultForm');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulação de envio do formulário
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Mensagem enviada com sucesso! O Dr. João Américo entrará em contato em breve.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
    
    quickConsultForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulação de envio do formulário
        const submitBtn = quickConsultForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Solicitação de consulta enviada! Retornaremos em até 2 horas úteis.');
            quickConsultForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 1500);
    });
    
    // ========== EFEITO DE DIGITAÇÃO NO FORMULÁRIO ==========
    const messageTextarea = document.getElementById('message');
    const exampleText = "Exemplo: Gostaria de orientação sobre um contrato de compra e venda de imóvel que está com cláusulas abusivas...";
    
    messageTextarea.addEventListener('focus', function() {
        if (this.value === exampleText) {
            this.value = '';
            this.style.color = '#333';
        }
    });
    
    messageTextarea.addEventListener('blur', function() {
        if (this.value === '') {
            this.value = exampleText;
            this.style.color = '#999';
        }
    });
    
    // Inicializar com texto de exemplo
    messageTextarea.value = exampleText;
    messageTextarea.style.color = '#999';
    
    // ========== ANIMAÇÃO DE CONTAGEM (STATS) ==========
    const stats = document.querySelectorAll('.stat h3');
    const heroSection = document.querySelector('.hero');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                stats.forEach(stat => {
                    const target = parseInt(stat.textContent);
                    let current = 0;
                    const increment = target / 50;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            stat.textContent = target + '+';
                            clearInterval(timer);
                        } else {
                            stat.textContent = Math.floor(current) + '+';
                        }
                    }, 30);
                });
                
                // Desconectar após executar uma vez
                statsObserver.disconnect();
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(heroSection);
    
    // ========== EFEITO PARALLAX SUAVE ==========
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
        }
    });
});
