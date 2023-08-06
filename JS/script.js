const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/* -------Remove menu Mobile--------- */
const navLink = document.querySelectorAll('.nav_link');

const linkAction = () =>{
    navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction))

const scrollHeader = () =>{
    const header = document.getElementById('header');
    this.scrollY >= 50 ? header.classList.add('bg-header'):header.classList.remove('bg-header');
}
window.addEventListener('scroll', scrollHeader);

/* ---------------- Page Scroll ---------------- */
const sections = document.querySelectorAll('section[id]');

const scrollActive = () =>{
    const scrollY = window.pageYOffset;

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 58;
        const sectionId = current.getAttribute('id');
        const sectionClass = document.querySelector('.nav_menu a[href*=' +sectionId+']');

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            sectionClass.classList.add('active-link');
        }
        else{
            sectionClass.classList.remove('active-link');
        }
    })
}
window.addEventListener('scroll', scrollActive);

/* -------------- Scroll Up ------------ */
const scrollUp = () =>{
    const scrollUp = document.getElementById('scroll-up');

    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
    :scrollUp.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp);

/* ----------------Scroll REveal------------------- */
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
})
sr.reveal('.home_data, .footer_container, .footer_group')
sr.reveal('.home_img', {delay: 700, origin: 'bottom'})
sr.reveal('.logos_img, .program_card, .pricing_card', {interval: 100})
sr.reveal('.choose_img, .calculate_content', {origin: 'left'})
sr.reveal('.choose_content, .calculate_img', {origin: 'right'})

/* ------------------Calculate BMI--------------------------- */
const calculateForm = document.getElementById("calculate-form");
const calculateCm = document.getElementById('calculate-cm');
const calculateKg = document.getElementById('calculate-kg');
const calculateMsg = document.getElementById('calculate-message');

const calculateBMI = (e) =>{
    e.preventDefault();

    if(calculateCm.value === '' || calculateKg.value === ''){
        //Add and remove color
        calculateMsg.classList.remove('color-green');
        calculateMsg.classList.add('color-red');

        //Show message
        calculateMsg.textContent = 'Fill in the height and weight 🏋️';

        setTimeout(() =>{
            calculateMsg.textContent = ''
        }, 3000)
    }
    else{
        const cm = calculateCm.value / 100;
        const kg = calculateKg.value;
        const BMI = Math.round(kg/(cm*cm));

        //Show health status
        if(BMI < 18.5){
            calculateMsg.classList.add('color-green');
            calculateMsg.textContent = `Your BMI is ${BMI} and you are skinny 😔`;
        }
        else if(BMI < 25){
            calculateMsg.classList.add('color-green');
            calculateMsg.textContent = `Your BMI is ${BMI} and you are healthy 😃`;
        }
        else{
            calculateMsg.classList.add('color-green');
            calculateMsg.textContent = `Your BMI is ${BMI} and you are overweight 😥`;
        }

        //To clear the input field
        calculateCm.value = '';
        calculateKg.value = '';

        //Remove message four seconds
        setTimeout(() =>{
            calculateMsg.textContent = '';
        }, 4000)


    }
}
calculateForm.addEventListener('submit', calculateBMI)

/* ----------------Email------------------- */
const  contactForm = document.getElementById('contact-form');
const contactMessage = document.getElementById('contact-message');
const contactUser = document.getElementById('contact-user');

const sendEmail = (e) =>{
    e.preventDefault();

    if(contactUser.value === ''){
        contactMessage.classList.remove('color-green');
        contactMessage.classList.add('color-red');

        contactMessage.textContent = 'You must enter your email 📧';

        setTimeout(() =>{
            contactMessage.textContent = '';
        }, 3000)
    }
    else{
        emailjs.sendForm(serviceID, templateID, templateParams, publicKey)
        .then(()=>{
            contactMessage.classList.add('color-green')
            contactMessage.textContent = 'You registered successfully';

            setTimeout(() =>{
                contactMessage.textContent = ''
            }, 3000)
        }, (error) =>{
            alert('Opps!! Something went wrong', error)
        })

        //To clear the input field
        contactUser.value = ''
    }
}

contactForm.addEventListener('submit', sendEmail);