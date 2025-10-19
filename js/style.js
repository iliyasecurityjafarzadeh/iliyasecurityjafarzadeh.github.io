        // اسکرول نرم برای لینک‌های داخلی
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // افزودن کلاس اسکرول به نوار ناوبری
        window.addEventListener('scroll', function() {
            const header = document.querySelector('.header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // شمارنده آمار
        function startCounters() {
            const counters = document.querySelectorAll('.stat-item h3');
            const speed = 200;
            
            counters.forEach(counter => {
                const target = +counter.innerText.replace(',', '');
                const count = +counter.innerText;
                const increment = Math.ceil(target / speed);
                
                let startValue = 0;
                
                const updateCounter = () => {
                    startValue += increment;
                    if (startValue < target) {
                        counter.innerText = startValue.toLocaleString();
                        setTimeout(updateCounter, 1);
                    } else {
                        counter.innerText = target.toLocaleString();
                    }
                };
                
                updateCounter();
            });
        }

        // راه‌اندازی شمارنده هنگام اسکرول به بخش آمار
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const statsSection = document.querySelector('.stats');
        if (statsSection) {
            observer.observe(statsSection);
        }

        // اعتبارسنجی فرم خبرنامه
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const emailInput = this.querySelector('input[type="email"]');
                const email = emailInput.value.trim();
                
                if (!email) {
                    alert('لطفاً آدرس ایمیل خود را وارد کنید.');
                    return;
                }
                
                if (!isValidEmail(email)) {
                    alert('لطفاً یک آدرس ایمیل معتبر وارد کنید.');
                    return;
                }
                
                alert('ایمیل شما با موفقیت ثبت شد!');
                emailInput.value = '';
            });
        }

        function isValidEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        // انیمیشن اسکرول برای عناصر
        function animateOnScroll() {
            const elements = document.querySelectorAll('.feature-item, .pricing-plan, .category-item');
            
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;
                
                if (elementPosition < screenPosition) {
                    element.style.opacity = 1;
                    element.style.transform = 'translateY(0)';
                }
            });
        }

        // مقداردهی اولیه استایل برای انیمیشن
        document.querySelectorAll('.feature-item, .pricing-plan, .category-item').forEach(item => {
            item.style.opacity = 0;
            item.style.transform = 'translateY(50px)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });

        // راه‌اندازی انیمیشن هنگام اسکرول
        window.addEventListener('scroll', animateOnScroll);
        // فراخوانی اولیه برای عناصری که در viewport هستند
        window.addEventListener('load', animateOnScroll);