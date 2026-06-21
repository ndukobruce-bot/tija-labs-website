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
const inboxEmail = "tijalabs@gmail.com";
const formService = {
  endpoint: "https://api.web3forms.com/submit",
  accessKey: "3a0213b3-d098-4644-90f1-8a22ca739221"
};
const iconPaths = {
  "arrow-down": '<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>',
  "book-open-check": '<path d="M12 7v14"/><path d="M3 18a2 2 0 0 1 2-2h6V5H5a2 2 0 0 0-2 2z"/><path d="M21 18a2 2 0 0 0-2-2h-6V5h6a2 2 0 0 1 2 2z"/><path d="m9 12 1.4 1.4L14 10"/>',
  "briefcase-business": '<path d="M10 6V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1"/><path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M3 13h18"/><path d="M12 12v2"/>',
  "chevron-down": '<path d="m6 9 6 6 6-6"/>',
  "clipboard-list": '<path d="M9 5h6"/><path d="M9 3h6v4H9z"/><path d="M5 5h2"/><path d="M17 5h2"/><path d="M5 5v16h14V5"/><path d="M9 12h.01"/><path d="M12 12h4"/><path d="M9 16h.01"/><path d="M12 16h4"/>',
  "external-link": '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
  "globe-2": '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 0 20"/><path d="M12 2a15 15 0 0 0 0 20"/>',
  "graduation-cap": '<path d="m22 10-10-5-10 5 10 5z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/><path d="M22 10v6"/>',
  mail: '<path d="M4 4h16v16H4z"/><path d="m22 6-10 7L2 6"/>',
  menu: '<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 3 5.2 2 2 0 0 1 5.1 3h3a2 2 0 0 1 2 1.7l.4 2.4a2 2 0 0 1-.6 1.8L8.6 10a16 16 0 0 0 5.4 5.4l1.1-1.3a2 2 0 0 1 1.8-.6l2.4.4a2 2 0 0 1 1.7 2z"/>',
  rocket: '<path d="M4.5 16.5c-1.5 1.3-2 3.4-2 5 1.6 0 3.7-.5 5-2"/><path d="M9 15 4 10l7-7c3-3 8-1 10-1 0 2 2 7-1 10l-7 7z"/><path d="M15 9h.01"/><path d="M9 15l-2 2"/>',
  send: '<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>',
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  "users-round": '<path d="M18 21a6 6 0 0 0-12 0"/><circle cx="12" cy="7" r="4"/><path d="M22 21a5 5 0 0 0-4-4.9"/><path d="M16 3.1a4 4 0 0 1 0 7.8"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>'
};
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

const renderIcons = () => {
  document.querySelectorAll("[data-lucide]").forEach((element) => {
    const name = element.getAttribute("data-lucide");
    const paths = iconPaths[name];
    if (!paths) return;
    element.outerHTML = `<svg class="lucide lucide-${name}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
  });
};

renderIcons();

const isFormServiceConfigured = () =>
  formService.accessKey && !formService.accessKey.includes("REPLACE_WITH");

const setSubmitting = (form, isSubmitting) => {
  const submitButton = form.querySelector("button[type='submit']");
  if (!submitButton) return;
  submitButton.disabled = isSubmitting;
  submitButton.dataset.originalText ||= submitButton.textContent.trim();
  submitButton.querySelector("span").textContent = isSubmitting ? "Sending..." : submitButton.dataset.originalText;
};

const sendToInbox = async ({ subject, fromName, replyTo, message }) => {
  if (!isFormServiceConfigured()) {
    throw new Error(`The form service is not configured yet. Add the Web3Forms access key for ${inboxEmail} in script.js.`);
  }

  const response = await fetch(formService.endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      access_key: formService.accessKey,
      subject,
      from_name: fromName,
      email: replyTo,
      message
    })
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok || result.success === false) {
    throw new Error(result.message || "The message could not be sent. Please try again.");
  }

  return result;
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

contactForm?.addEventListener("submit", async (event) => {
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

  formNote.textContent = "Sending your message...";
  setSubmitting(contactForm, true);

  try {
    await sendToInbox({
      subject: `Tija Labs website message from ${name}`,
      fromName: name,
      replyTo: email,
      message: body
    });
    contactForm.reset();
    formNote.textContent = "Thanks, your message has been sent.";
  } catch (error) {
    formNote.textContent = `${error.message} Your message is still here, so you can try again.`;
  } finally {
    setSubmitting(contactForm, false);
  }
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
  applicationNote.textContent = "Submit your answers here. No email app will open.";
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

applicationForm?.addEventListener("submit", async (event) => {
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

  applicationNote.textContent = "Sending your application...";
  setSubmitting(applicationForm, true);

  try {
    await sendToInbox({
      subject: `Tija Labs ${role} Application - ${name}`,
      fromName: name,
      replyTo: email,
      message: body
    });
    applicationForm.reset();
    applicationNote.textContent = "Thanks, your response has been sent.";
  } catch (error) {
    applicationNote.textContent = `${error.message} Your answers are still here, so you can try again.`;
  } finally {
    setSubmitting(applicationForm, false);
  }
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
