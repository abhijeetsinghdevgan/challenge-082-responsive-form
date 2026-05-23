(function () {
  "use strict";

  const TOTAL_STEPS = 3;
  let currentStep = 1;

  const form = document.getElementById("registration-form");
  const stepIndicators = document.querySelectorAll(".form__step");
  const panels = document.querySelectorAll(".form__panel");
  const btnPrev = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");
  const btnSubmit = document.getElementById("btn-submit");
  const successModal = document.getElementById("success-modal");
  const modalMessage = document.getElementById("modal-message");
  const btnReset = document.getElementById("btn-reset");
  const goalsTextarea = document.getElementById("goals");
  const charCountEl = document.getElementById("char-count");
  const dobInput = document.getElementById("dob");

  const courseLabels = {
    "web-dev": "Web Development",
    "data-science": "Data Science",
    "ux-design": "UX Design",
  };

  const cohortLabels = {
    "2026-06-01": "June 2026",
    "2026-09-01": "September 2026",
    "2026-01-01": "January 2027",
  };

  function setMaxDob() {
    const today = new Date();
    const max = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate());
    dobInput.max = max.toISOString().split("T")[0];
  }

  function updateProgress() {
    const percent = (currentStep / TOTAL_STEPS) * 100;
    const styleEl = document.getElementById("progress-dynamic") || document.createElement("style");
    styleEl.id = "progress-dynamic";
    styleEl.textContent = `.form__progress-bar::after { width: ${percent}% !important; }`;
    if (!styleEl.parentNode) document.head.appendChild(styleEl);

    const progressEl = form.querySelector(".form__progress");
    progressEl.setAttribute("aria-valuenow", String(currentStep));

    stepIndicators.forEach((step) => {
      const stepNum = parseInt(step.dataset.step, 10);
      step.classList.remove("form__step--active", "form__step--done");
      if (stepNum === currentStep) step.classList.add("form__step--active");
      else if (stepNum < currentStep) step.classList.add("form__step--done");
    });
  }

  function showPanel(step) {
    panels.forEach((panel) => {
      const panelStep = parseInt(panel.dataset.panel, 10);
      const isActive = panelStep === step;
      panel.hidden = !isActive;
      panel.classList.toggle("form__panel--active", isActive);
    });

    btnPrev.hidden = step === 1;
    btnNext.hidden = step === TOTAL_STEPS;
    btnSubmit.hidden = step !== TOTAL_STEPS;

    updateProgress();
    updateSummary();
  }

  function getFieldErrorId(field) {
    return "error-" + field.id;
  }

  function showError(field, message) {
    field.classList.add("is-invalid");
    const errorEl = document.getElementById(getFieldErrorId(field));
    if (errorEl) errorEl.textContent = message;
  }

  function clearError(field) {
    field.classList.remove("is-invalid");
    const errorEl = document.getElementById(getFieldErrorId(field));
    if (errorEl) errorEl.textContent = "";
  }

  function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function validateStep(step) {
    let valid = true;

    if (step === 1) {
      const firstName = document.getElementById("first-name");
      const lastName = document.getElementById("last-name");
      const email = document.getElementById("email");
      const phone = document.getElementById("phone");

      [firstName, lastName, email].forEach(clearError);

      if (firstName.value.trim().length < 2) {
        showError(firstName, "Please enter your first name (at least 2 characters).");
        valid = false;
      }
      if (lastName.value.trim().length < 2) {
        showError(lastName, "Please enter your last name (at least 2 characters).");
        valid = false;
      }
      if (!validateEmail(email.value.trim())) {
        showError(email, "Please enter a valid email address.");
        valid = false;
      }
      if (phone.value.trim() && !/^[\d\s\-+()]{10,}$/.test(phone.value.trim())) {
        showError(phone, "Please enter a valid phone number.");
        valid = false;
      }
    }

    if (step === 2) {
      const course = form.querySelector('input[name="course"]:checked');
      const startDate = document.getElementById("start-date");
      const terms = document.getElementById("terms");
      const courseError = document.getElementById("error-course");
      const termsError = document.getElementById("error-terms");

      clearError(startDate);
      if (courseError) courseError.textContent = "";
      if (termsError) termsError.textContent = "";

      if (!course) {
        if (courseError) courseError.textContent = "Please select a course track.";
        valid = false;
      }
      if (!startDate.value) {
        showError(startDate, "Please select a preferred start date.");
        valid = false;
      }
      if (!terms.checked) {
        if (termsError) termsError.textContent = "You must agree to the terms to continue.";
        valid = false;
      }
    }

    if (!valid) {
      const firstInvalid = form.querySelector(".is-invalid, .form__error:not(:empty)");
      const focusTarget = form.querySelector(".is-invalid") || document.querySelector('[name="course"]');
      if (focusTarget) focusTarget.focus();
    }

    return valid;
  }

  function updateSummary() {
    const course = form.querySelector('input[name="course"]:checked');
    const format = form.querySelector('input[name="format"]:checked');
    const startDate = document.getElementById("start-date");

    document.getElementById("summary-course").textContent =
      course ? courseLabels[course.value] || course.value : "—";
    document.getElementById("summary-format").textContent =
      format ? format.nextElementSibling.textContent : "Online";
    document.getElementById("summary-cohort").textContent =
      startDate.value ? cohortLabels[startDate.value] || startDate.value : "—";
  }

  function collectFormData() {
    const data = new FormData(form);
    const referrals = form.querySelectorAll('input[name="referral"]:checked');
    return {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      phone: data.get("phone") || null,
      dob: data.get("dob") || null,
      course: data.get("course"),
      startDate: data.get("startDate"),
      format: data.get("format"),
      terms: data.get("terms") === "on",
      experience: data.get("experience") || null,
      referrals: Array.from(referrals).map((el) => el.value),
      goals: data.get("goals") || null,
      rating: data.get("rating") || null,
    };
  }

  btnNext.addEventListener("click", function () {
    if (!validateStep(currentStep)) return;
    currentStep = Math.min(currentStep + 1, TOTAL_STEPS);
    showPanel(currentStep);
    form.querySelector(".form__legend").focus?.();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  btnPrev.addEventListener("click", function () {
    currentStep = Math.max(currentStep - 1, 1);
    showPanel(currentStep);
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validateStep(2)) {
      currentStep = 2;
      showPanel(2);
      return;
    }

    const payload = collectFormData();
    const name = payload.firstName + " " + payload.lastName;
    modalMessage.textContent =
      "Thanks, " +
      name +
      "! Your registration for " +
      (courseLabels[payload.course] || "your course") +
      " is confirmed. We've sent details to " +
      payload.email +
      ".";
    successModal.hidden = false;
    document.body.style.overflow = "hidden";
  });

  btnReset.addEventListener("click", function () {
    form.reset();
    currentStep = 1;
    showPanel(1);
    form.querySelectorAll(".is-invalid").forEach((el) => el.classList.remove("is-invalid"));
    form.querySelectorAll(".form__error").forEach((el) => (el.textContent = ""));
    charCountEl.textContent = "0";
    successModal.hidden = true;
    document.body.style.overflow = "";
  });

  successModal.querySelector(".modal__backdrop").addEventListener("click", function () {
    btnReset.click();
  });

  goalsTextarea.addEventListener("input", function () {
    charCountEl.textContent = String(this.value.length);
  });

  form.querySelectorAll('input[name="course"], input[name="format"], #start-date').forEach(function (el) {
    el.addEventListener("change", updateSummary);
  });

  form.querySelectorAll("input, select, textarea").forEach(function (field) {
    field.addEventListener("input", function () {
      if (field.classList.contains("is-invalid")) clearError(field);
    });
    field.addEventListener("change", function () {
      if (field.classList.contains("is-invalid")) clearError(field);
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !successModal.hidden) {
      btnReset.click();
    }
  });

  setMaxDob();
  showPanel(1);
})();
