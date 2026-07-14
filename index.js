// ==========================================
// MITHIBAI CULTURAL COMMITTEE LANDING PAGE JS
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  initCountdown();
  initDepartments();
  initAuditionForm();
  initScrollReveal();
});

// ==========================================
// STICKY HEADER
// ==========================================
function initStickyHeader() {
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================
function initMobileMenu() {
  const toggleBtn = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-item a');

  toggleBtn.addEventListener('click', () => {
    toggleBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleBtn.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

// ==========================================
// EVENT COUNTDOWN TIMER
// ==========================================
function initCountdown() {
  // Set target date for the annual Kshitij festival (e.g. Nov 26, 2026)
  const targetDateStr = '2026-11-26T09:00:00';
  const targetDate = new Date(targetDateStr).getTime();

  const daysVal = document.getElementById('days');
  const hoursVal = document.getElementById('hours');
  const minutesVal = document.getElementById('minutes');
  const secondsVal = document.getElementById('seconds');

  if (!daysVal || !hoursVal || !minutesVal || !secondsVal) return;

  function updateTimer() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      // Event started / ended
      daysVal.textContent = '00';
      hoursVal.textContent = '00';
      minutesVal.textContent = '00';
      secondsVal.textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    daysVal.textContent = String(days).padStart(2, '0');
    hoursVal.textContent = String(hours).padStart(2, '0');
    minutesVal.textContent = String(minutes).padStart(2, '0');
    secondsVal.textContent = String(seconds).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

// ==========================================
// DEPARTMENTS MODAL LOGIC
// ==========================================
const DEPT_DATA = {
  dance: {
    title: 'Dance Department',
    sub: 'Prestige, Rythm, & Energy',
    desc: 'The Dance department is one of the most decorated divisions of the Mithibai Cultural Committee. Renowned for high-octane street styles, elegant classical recitals, folk heritage dances, and theatrical choreography, we represent Mithibai at national fests (Mood Indigo, Malhar) and consistently bring home gold.',
    highlights: [
      'Street Choreography & Hip-Hop Crews',
      'Classical & Semi-Classical Solo/Duets',
      'Traditional Folk & Theme-based Group Dances',
      'National Contingent Representation'
    ],
    audition: 'Prepare a 1.5-minute routine in your preferred style. Bring your music on a mobile phone (3.5mm jack or Bluetooth). Wear comfortable attire.'
  },
  drama: {
    title: 'Drama Department',
    sub: 'Expression, Storytelling, & Impact',
    desc: 'The Drama department is the voice of social change and theatrical expression. From high-energy street plays (Nukkad Natak) to nuanced stage plays, mime, mono-acting, and improvisational comedy, our actors command attention and evoke powerful emotions across audiences.',
    highlights: [
      'Nukkad Natak (Street Play) & Social Awareness',
      'Full-Length Stage Productions & Proscenium Plays',
      'Mime, Mono-Acting & Character Solos',
      'Scriptwriting, Directing & Sound Scaping'
    ],
    audition: 'You will be given a script on the spot for cold reading. Additionally, prepare a 2-minute monologue of your choice (Hindi/Marathi/English).'
  },
  music: {
    title: 'Music Department',
    sub: 'Harmony, Vocals, & Beats',
    desc: 'The Music department is the soul of MCC. We house powerhouse vocalists, virtuoso instrumentalists, and dynamic acoustic bands. Our genres range from Hindustani classical and Sufi fusion to contemporary pop, rock, and western acapella.',
    highlights: [
      'Indian Semi-Classical & Bollywood Vocals',
      'Western Acoustic & Electric Bands',
      'Instrumental Duels (Percussion, Strings, Keys)',
      'Acapella Groups & Choir Performances'
    ],
    audition: 'Perform one song of your choice (vocals or instrumental) for up to 2 minutes. You may bring one acoustic instrument (guitar/keyboard available).'
  },
  fashion: {
    title: 'Fashion Department',
    sub: 'Runway, Aesthetics, & Attitude',
    desc: 'The Fashion department defines style and glamour. We create high-end runway themes, design avant-garde couture, and showcase unmatched poise. MCC Fashion is a dominant force at college pageants and theme-based walks.',
    highlights: [
      'Theme-based Ramp Walk Choreography',
      'Garment Design & Styling Innovation',
      'Grooming, Poise & Expression Workshops',
      'Inter-collegiate Fashion Show Competitions'
    ],
    audition: 'Walk the ramp (shoes with heels recommended). Introduce yourself and participate in a short styling task setup on-the-spot by judges.'
  },
  finearts: {
    title: 'Fine Arts Department',
    sub: 'Colors, Installations, & Vision',
    desc: 'The Fine Arts department colors the canvas of Mithibai. We manage grand installations, traditional rangolis, live sketching, canvas painting, and graffiti. Our artists curate the visual appeal of MCC and decorate the campus during festivals.',
    highlights: [
      'Mega Installations & Sculptural Art',
      'Charcoal Sketching & Acrylic Canvas Painting',
      'Traditional Rangoli & Decorative Themes',
      'Live Graffiti & Poster Design Contests'
    ],
    audition: 'A 2-hour drawing/painting task based on a given prompt. Sketching pencils and acrylic colors will be provided; bring your custom brushes.'
  },
  literary: {
    title: 'Literary Arts Department',
    sub: 'Writings, Debates, & Quizzing',
    desc: 'The Literary Arts department represents the intellect of MCC. We gather creative writers, spoken word poets, eloquent debaters, and trivia enthusiasts. We write publications, host panel talks, and dominate quiz bowls.',
    highlights: [
      'Spoken Word Poetry & Slam Contests',
      'Parliamentary Debating & Elocutions',
      'Creative Writing & Journalism Pieces',
      'General, Pop-Culture & Business Quizzes'
    ],
    audition: 'Participate in a 1-minute Extempore speak or write a 250-word essay on a prompt provided on the spot. Quiz test for quiz applicants.'
  },
  business: {
    title: 'Business Events Department',
    sub: 'Corporate Strategy, Finance, & Pitching',
    desc: 'The Business Events department is the engine of corporate simulation. We design mock stocks, elevator pitches, PR crises, and strategic marketing games, bridging cultural engagement with corporate acumen.',
    highlights: [
      'Mock Stock & Financial Arbitrage Games',
      'Elevator Pitching & Venture Capital Rounds',
      'Crisis Management & PR Damage Control',
      'Case Studies & Business Plan Competitions'
    ],
    audition: 'Analyze a mini-case study for 10 minutes and present your solution to a panel of corporate judges for 3 minutes. Q&A follows.'
  },
  gaming: {
    title: 'Gaming & Sports Department',
    sub: 'Athletics, Esports, & Reflexes',
    desc: 'The Gaming & Sports department represents physical endurance and virtual tactical skill. We coordinate university esports tournaments (Valorant, BGMI, FIFA) alongside indoor athletics (Chess, Carrom, Table Tennis).',
    highlights: [
      'Esports Tournaments & Stream Management',
      'Athletic Coordination & Physical Sports fests',
      'Indoor Tactics (Chess, Carrom Leagues)',
      'Fitness Challenges & Speed Runs'
    ],
    audition: 'Live gameplay round (PC/Console) for Esports candidates, or a sports rule knowledge test and quick fitness drill for sports admins.'
  },
  graphics: {
    title: 'Graphics & Photo Media',
    sub: 'Filmmaking, Editing, & Visual Stories',
    desc: 'The Graphics & Photo Media department is the lens of the committee. We create visual content: event photography, promotional teasers, social media graphics, posters, and documentary aftermovies that capture the soul of MCC.',
    highlights: [
      'Cinematic Event Photography & Videography',
      'Professional Video Editing & Motion Graphics',
      'Digital Poster & Brand Asset Creations',
      'MCC Vlogs, Reels, & Documentary Filmmaking'
    ],
    audition: 'Submit a digital portfolio (drive link/artstation) containing at least 5 of your past works (photos/designs/edits). Short software test.'
  }
};

function initDepartments() {
  const deptCards = document.querySelectorAll('.dept-card');
  const modalOverlay = document.getElementById('dept-modal');
  const closeModalBtn = modalOverlay.querySelector('.close-modal');
  
  const mIconBox = modalOverlay.querySelector('.modal-icon-box');
  const mTitle = modalOverlay.querySelector('.modal-title h3');
  const mSub = modalOverlay.querySelector('.modal-title span.sub');
  const mDesc = modalOverlay.querySelector('.modal-desc');
  const mList = modalOverlay.querySelector('.modal-list');
  const mAudition = modalOverlay.querySelector('.modal-audition-text');
  const modalJoinBtn = modalOverlay.querySelector('.modal-join-btn');

  // Open modal on click
  deptCards.forEach(card => {
    card.addEventListener('click', () => {
      const deptKey = card.getAttribute('data-dept');
      const data = DEPT_DATA[deptKey];
      
      if (!data) return;

      // Set icons based on department key
      mIconBox.innerHTML = card.querySelector('.dept-icon-box').innerHTML;
      mTitle.textContent = data.title;
      mSub.textContent = data.sub;
      mDesc.textContent = data.desc;
      mAudition.innerHTML = `<strong>Audition Requirements:</strong> ${data.audition}`;

      // Populate highlights
      mList.innerHTML = '';
      data.highlights.forEach(item => {
        const li = document.createElement('li');
        li.className = 'modal-list-item';
        li.innerHTML = `
          <svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>${item}</span>
        `;
        mList.appendChild(li);
      });

      // Set join button target
      modalJoinBtn.onclick = () => {
        closeModal();
        // Set dropdown value to this department
        const deptSelect = document.getElementById('dept-select');
        if (deptSelect) {
          deptSelect.value = deptKey;
        }
        // Scroll to form
        const formSection = document.getElementById('join');
        if (formSection) {
          formSection.scrollIntoView({ behavior: 'smooth' });
        }
      };

      // Show Modal
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Lock background scroll
    });
  });

  // Close modal functions
  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeModalBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
}

// ==========================================
// AUDITION FORM HANDLING
// ==========================================
function initAuditionForm() {
  const form = document.getElementById('auditionForm');
  const successOverlay = document.getElementById('success-modal');
  const successClose = successOverlay.querySelector('.close-success');
  const successOkBtn = successOverlay.querySelector('.success-ok-btn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Select form submit button and state elements
    const submitBtn = form.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const spinner = submitBtn.querySelector('.spinner');

    // Simple validation (already handled by HTML5, but we can verify selections)
    const deptSelect = document.getElementById('dept-select').value;
    if (!deptSelect) {
      alert('Please select a department to audit for.');
      return;
    }

    // Toggle button loading state
    submitBtn.disabled = true;
    btnText.textContent = 'Submitting Application...';
    spinner.style.display = 'inline-block';

    // Simulate network delay
    setTimeout(() => {
      // Revert button state
      submitBtn.disabled = false;
      btnText.textContent = 'Submit Audition Entry';
      spinner.style.display = 'none';

      // Reset form
      form.reset();

      // Open success modal
      successOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }, 1500);
  });

  // Close success modal
  function closeSuccess() {
    successOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  successClose.addEventListener('click', closeSuccess);
  successOkBtn.addEventListener('click', closeSuccess);
  successOverlay.addEventListener('click', (e) => {
    if (e.target === successOverlay) closeSuccess();
  });
}

// ==========================================
// SCROLL REVEAL ANIMATIONS
// ==========================================
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Once revealed, we don't need to observe it anymore
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15, // Trigger when 15% of the element is visible
    rootMargin: '0px 0px -50px 0px' // Margins around root
  });

  revealElements.forEach(element => {
    observer.observe(element);
  });
}
