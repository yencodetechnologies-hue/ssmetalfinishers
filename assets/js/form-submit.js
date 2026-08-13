import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { db, COLLECTION_NAME } from "./firebase-config.js";

const scriptTag = document.querySelector('script[data-form-type]');
const formType = scriptTag?.dataset.formType;

const FORM_CONFIG = {
  contact: {
    formId: "contact-form",
    submitBtnText: "Send Message",
    fields: {
      fullName: { required: true },
      mobile: { required: true },
      email: { required: true },
      subject: { required: false },
      service: { required: false },
      message: { required: true }
    },
    emptyEnquiryFields: {
      companyName: "",
      substrateMaterial: "",
      estimatedQuantity: "",
      requiredBy: "",
      projectDetails: ""
    }
  },
  enquiry: {
    formId: "enquiry-form",
    submitBtnText: "Submit Enquiry",
    fields: {
      fullName: { required: true },
      companyName: { required: false },
      mobile: { required: true },
      email: { required: true },
      service: { required: false },
      substrateMaterial: { required: false },
      estimatedQuantity: { required: false },
      requiredBy: { required: false },
      projectDetails: { required: false }
    },
    emptyContactFields: {
      subject: "",
      message: ""
    }
  }
};

function getFieldValue(form, name) {
  const el = form.elements[name];
  if (!el) return "";
  return (el.value || "").trim();
}

function showStatus(form, message, isError) {
  let statusEl = form.querySelector(".form-status");
  if (!statusEl) {
    statusEl = document.createElement("div");
    statusEl.className = "form-status mt-3 rounded-xl px-4 py-3 text-sm font-medium";
    const submitBtn = form.querySelector('[type="submit"]');
    submitBtn?.insertAdjacentElement("afterend", statusEl);
  }
  statusEl.textContent = message;
  statusEl.className = `form-status mt-3 rounded-xl px-4 py-3 text-sm font-medium ${
    isError
      ? "bg-red-50 text-red-700 border border-red-200"
      : "bg-green-50 text-green-800 border border-green-200"
  }`;
  statusEl.hidden = false;
}

function hideStatus(form) {
  const statusEl = form.querySelector(".form-status");
  if (statusEl) statusEl.hidden = true;
}

function buildPayload(form, config) {
  const payload = { formType };

  for (const [name, meta] of Object.entries(config.fields)) {
    const value = getFieldValue(form, name);
    if (meta.required && !value) {
      throw new Error(`Please fill in all required fields.`);
    }
    payload[name] = value;
  }

  if (formType === "contact") {
    Object.assign(payload, config.emptyEnquiryFields);
  } else {
    Object.assign(payload, config.emptyContactFields);
  }

  payload.createdAt = serverTimestamp();
  payload.updatedAt = serverTimestamp();

  return payload;
}

async function handleSubmit(event, form, config) {
  event.preventDefault();
  hideStatus(form);

  const submitBtn = form.querySelector('[type="submit"]');
  const originalHtml = submitBtn?.innerHTML;

  try {
    const payload = buildPayload(form, config);

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = "Sending...";
    }

    await addDoc(collection(db, COLLECTION_NAME), payload);

    form.reset();
    showStatus(form, "Thank you! Your message has been sent successfully.", false);
  } catch (err) {
    console.error("Form submission error:", err);
    showStatus(
      form,
      err.message || "Something went wrong. Please try again or call us directly.",
      true
    );
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalHtml;
    }
  }
}

function init() {
  if (!formType || !FORM_CONFIG[formType]) return;

  const config = FORM_CONFIG[formType];
  const form = document.getElementById(config.formId);
  if (!form) return;

  form.addEventListener("submit", (e) => handleSubmit(e, form, config));
}

init();
