const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const roleCards = document.querySelectorAll(".role-card");
const contactForm = document.querySelector(".contact-form");
const formNote = document.querySelector(".form-note");
const applicationModal = document.querySelector("#application-modal");
const applicationForm = document.querySelector("#application-form");
const questionnaire = document.querySelector("#questionnaire");
const applicationTitle = document.querySelector("#application-title");
const applicationIntro = document.querySelector("#application-intro");
const applicationRole = document.querySelector("#application-role");
const applicationNote = document.querySelector(".application-note");
const applyButtons = document.querySelectorAll("[data-apply-role]");
const closeApplicationButtons = document.querySelectorAll("[data-close-application]");
const inboxEmail = "ndukobruce@gmail.com";
let lastFocusedElement = null;

const questionnaires = {
  backend: {
    title: "Backend Engineer",
    intro: "Tell us how you build secure, reliable APIs and backend systems.",
    sections: [
      {
        title: "Experience",
        questions: [
          "How many years of professional backend development experience do you have?",
          "Which backend languages/frameworks are you most comfortable with? Rank your top 2.",
          "Describe a backend system you've built or significantly contributed to. What was your role, and what was the scale?",
          "Have you designed a database schema from scratch? Briefly describe one example.",
          "Have you built or maintained APIs consumed by mobile and web clients simultaneously? What challenges came up?"
        ]
      },
      {
        title: "Technical",
        questions: [
          "How do you approach designing an API that needs to serve multiple different apps/products with shared user data?",
          "Walk us through how you would secure a REST API, including authentication, authorization, and rate limiting.",
          "What's your experience with cloud platforms? Which services have you used directly?",
          "How do you typically handle database migrations and schema changes on a live production system?",
          "Describe a time a backend system you built broke in production. What happened, and how did you fix or prevent it?"
        ]
      },
      {
        title: "Fit",
        questions: [
          "We're a small, early-stage team building multiple products at once. How do you feel about wearing multiple hats and shifting priorities?",
          "What excites you about working on productivity apps specifically?",
          "Are you based in Kenya or able to collaborate closely in similar time zones?",
          "What's your expected availability and timeline to start?"
        ]
      }
    ]
  },
  mobile: {
    title: "Mobile Developer",
    intro: "Show us how you build and ship mobile apps with Flutter, React Native, or both.",
    sections: [
      {
        title: "Experience",
        questions: [
          "How many years of mobile development experience do you have? Flutter, React Native, or both?",
          "Have you shipped an app to the Google Play Store? Walk us through that process, including any rejections or issues.",
          "Have you shipped to the Apple App Store as well?",
          "Describe an app you built or maintained that's currently live. What was your role?",
          "Have you worked with push notifications, offline data sync, or background tasks in a mobile app? Describe one example."
        ]
      },
      {
        title: "Technical",
        questions: [
          "If you joined an existing Flutter or React Native codebase, how would you get familiar with it quickly?",
          "How do you handle state management in your apps?",
          "How do you typically structure an app to integrate with a backend API?",
          "What's your process for debugging a bug that only happens on certain devices or OS versions?",
          "How do you approach optimizing app performance, including load times, battery, and memory usage?"
        ]
      },
      {
        title: "Fit",
        questions: [
          "StudySphere needs ongoing maintenance, and LeverageX needs to be built and shipped. Which excites you more, and are you comfortable doing both?",
          "Are you based in Kenya or able to collaborate closely in similar time zones?",
          "What's your expected availability and timeline to start?"
        ]
      }
    ]
  },
  frontend: {
    title: "Frontend/Web Developer",
    intro: "Tell us how you turn ideas and designs into fast, responsive product interfaces.",
    sections: [
      {
        title: "Experience",
        questions: [
          "How many years of frontend development experience do you have?",
          "Which frameworks/libraries are you most comfortable with? Rank your top 2.",
          "Describe a web app or website you built or significantly contributed to. What was your role?",
          "Have you worked from design files and translated them into functioning UI? Describe your process.",
          "Have you built or maintained a dashboard or data-heavy interface before?"
        ]
      },
      {
        title: "Technical",
        questions: [
          "How do you ensure a web app is fully responsive and works well on mobile browsers, not just desktop?",
          "How do you structure component code to keep it reusable across multiple pages/products?",
          "How do you handle API integration on the frontend, including loading states, errors, and caching?",
          "What's your experience with performance optimization?",
          "How comfortable are you with basic SEO best practices for a marketing or landing page?"
        ]
      },
      {
        title: "Fit",
        questions: [
          "Are you comfortable starting with simpler pages and growing into more complex dashboards over time?",
          "Are you based in Kenya or able to collaborate closely in similar time zones?",
          "What's your expected availability and timeline to start?"
        ]
      }
    ]
  }
};

if (window.lucide) {
  window.lucide.createIcons();
}

const buildMailto = (subject, body) => {
  const params = new URLSearchParams({ subject, body });
  return `mailto:${inboxEmail}?${params.toString().replace(/\+/g, "%20")}`;
};

const openMail = (subject, body) => {
  window.location.href = buildMailto(subject, body);
};

navToggle?.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  document.body.classList.toggle("nav-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

siteNav?.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    siteNav.classList.remove("is-open");
    document.body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
    navToggle?.setAttribute("aria-label", "Open navigation");
  }
});

roleCards.forEach((card) => {
  const trigger = card.querySelector(".role-trigger");
  trigger?.addEventListener("click", () => {
    const isOpen = card.classList.toggle("is-open");
    trigger.setAttribute("aria-expanded", String(isOpen));
  });
});

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactForm.checkValidity()) {
    formNote.textContent = "Please add your name, email, and message before sending.";
    contactForm.reportValidity();
    return;
  }

  const formData = new FormData(contactForm);
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");
  const body = [
    "New Tija Labs website message",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    "",
    "Message:",
    message
  ].join("\n");

  formNote.textContent = "Opening an email draft addressed to ndukobruce@gmail.com.";
  openMail(`Tija Labs website message from ${name}`, body);
});

const renderQuestionnaire = (roleKey) => {
  const role = questionnaires[roleKey];
  applicationTitle.textContent = `${role.title} Application`;
  applicationIntro.textContent = role.intro;
  applicationRole.value = role.title;
  questionnaire.innerHTML = role.sections
    .map((section, sectionIndex) => {
      const questions = section.questions
        .map((question, questionIndex) => {
          const questionNumber = `${sectionIndex + 1}.${questionIndex + 1}`;
          return `
            <label class="question-field">
              <span>${questionNumber} ${question}</span>
              <textarea name="${question}" rows="4" required></textarea>
            </label>
          `;
        })
        .join("");

      return `
        <fieldset class="question-section">
          <legend>${section.title}</legend>
          ${questions}
        </fieldset>
      `;
    })
    .join("");
};

const openApplication = (roleKey, opener) => {
  lastFocusedElement = opener;
  renderQuestionnaire(roleKey);
  applicationForm.reset();
  applicationRole.value = questionnaires[roleKey].title;
  applicationNote.textContent = "Your email app will open with the completed application addressed to Bruce.";
  applicationModal.classList.add("is-open");
  applicationModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  applicationForm.querySelector("input[name='Full name']").focus();
};

const closeApplication = () => {
  applicationModal.classList.remove("is-open");
  applicationModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  lastFocusedElement?.focus();
};

applyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openApplication(button.dataset.applyRole, button);
  });
});

closeApplicationButtons.forEach((button) => {
  button.addEventListener("click", closeApplication);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && applicationModal?.classList.contains("is-open")) {
    closeApplication();
  }
});

applicationForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!applicationForm.checkValidity()) {
    applicationNote.textContent = "Please complete every required question before sending.";
    applicationForm.reportValidity();
    return;
  }

  const formData = new FormData(applicationForm);
  const role = formData.get("role");
  const name = formData.get("Full name");
  const email = formData.get("Email");
  const phone = formData.get("Phone or WhatsApp");
  const portfolio = formData.get("Portfolio link") || "Not provided";
  const answers = [];

  questionnaires[Object.keys(questionnaires).find((key) => questionnaires[key].title === role)].sections.forEach((section) => {
    answers.push("", section.title.toUpperCase());
    section.questions.forEach((question, index) => {
      answers.push(`${index + 1}. ${question}`);
      answers.push(String(formData.get(question)).trim());
      answers.push("");
    });
  });

  const body = [
    `New Tija Labs application: ${role}`,
    "",
    `Full name: ${name}`,
    `Email: ${email}`,
    `Phone / WhatsApp: ${phone}`,
    `Portfolio / LinkedIn / GitHub: ${portfolio}`,
    ...answers
  ].join("\n");

  applicationNote.textContent = "Opening an email draft addressed to ndukobruce@gmail.com.";
  openMail(`Tija Labs ${role} Application - ${name}`, body);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
