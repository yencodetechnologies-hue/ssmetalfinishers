// Admin UI passcode gate only — does not protect Firestore data.
// For production, use Firebase Authentication and restrict Firestore rules.

import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { db, COLLECTION_NAME } from "./firebase-config.js";

const PASSCODE = "2026";
const AUTH_KEY = "ssmetals_admin_auth";

const passcodeGate = document.getElementById("passcode-gate");
const adminPanel = document.getElementById("admin-panel");
const passcodeForm = document.getElementById("passcode-form");
const passcodeInput = document.getElementById("passcode-input");
const passcodeError = document.getElementById("passcode-error");
const submissionsBody = document.getElementById("submissions-body");
const loadingState = document.getElementById("loading-state");
const emptyState = document.getElementById("empty-state");
const tableWrapper = document.getElementById("table-wrapper");
const refreshBtn = document.getElementById("refresh-btn");
const logoutBtn = document.getElementById("logout-btn");

const editModal = document.getElementById("edit-modal");
const editForm = document.getElementById("edit-form");
const editCancelBtn = document.getElementById("edit-cancel-btn");
const contactFields = document.getElementById("contact-fields");
const enquiryFields = document.getElementById("enquiry-fields");

const viewModal = document.getElementById("view-modal");
const viewDetails = document.getElementById("view-details");
const viewFormTypeLabel = document.getElementById("view-form-type-label");
const viewCloseBtn = document.getElementById("view-close-btn");
const viewCloseBottomBtn = document.getElementById("view-close-bottom-btn");
const viewEditBtn = document.getElementById("view-edit-btn");

let submissions = [];
let editingId = null;
let viewingId = null;

function isAuthenticated() {
  return sessionStorage.getItem(AUTH_KEY) === "true";
}

function showGate() {
  passcodeGate?.classList.remove("hidden");
  adminPanel?.classList.add("hidden");
}

function showAdmin() {
  passcodeGate?.classList.add("hidden");
  adminPanel?.classList.remove("hidden");
  loadSubmissions();
}

function formatDate(timestamp) {
  if (!timestamp) return "—";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function formatType(formType) {
  return formType === "enquiry" ? "Enquiry" : "Contact";
}

function displayValue(value) {
  const text = (value || "").toString().trim();
  return text ? escapeHtml(text) : '<span class="text-gray-400">—</span>';
}

function renderDetailRow(label, value, fullWidth = false) {
  return `
    <div class="${fullWidth ? "col-span-full" : ""}">
      <p class="mb-1 text-xs font-bold uppercase tracking-wider text-[#4b6544]">${label}</p>
      <p class="rounded-xl border border-gray-100 bg-[#fafcf9] px-4 py-3 text-sm leading-6 text-[#172f14]">${displayValue(value)}</p>
    </div>`;
}

function setModalOpen(isOpen) {
  document.body.classList.toggle("overflow-hidden", isOpen);
}

async function loadSubmissions() {
  loadingState?.classList.remove("hidden");
  emptyState?.classList.add("hidden");
  tableWrapper?.classList.add("hidden");
  submissionsBody.innerHTML = "";

  try {
    const snapshot = await getDocs(collection(db, COLLECTION_NAME));
    submissions = snapshot.docs
      .map((d) => ({ id: d.id, ...d.data() }))
      .sort((a, b) => {
        const aTime = a.createdAt?.toMillis?.() || 0;
        const bTime = b.createdAt?.toMillis?.() || 0;
        return bTime - aTime;
      });

    if (submissions.length === 0) {
      emptyState?.classList.remove("hidden");
      return;
    }

    tableWrapper?.classList.remove("hidden");
    submissionsBody.innerHTML = submissions
      .map(
        (item, index) => `
        <tr class="border-b border-gray-100 hover:bg-[#fafcf9]">
          <td class="px-4 py-3 text-sm text-gray-600">${index + 1}</td>
          <td class="px-4 py-3">
            <span class="inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
              item.formType === "enquiry"
                ? "bg-blue-50 text-blue-700"
                : "bg-green-50 text-green-700"
            }">${formatType(item.formType)}</span>
          </td>
          <td class="px-4 py-3 text-sm font-medium text-[#172f14]">${escapeHtml(item.fullName || "—")}</td>
          <td class="px-4 py-3 text-sm text-gray-600">${escapeHtml(item.mobile || "—")}</td>
          <td class="px-4 py-3 text-sm text-gray-600">${escapeHtml(item.email || "—")}</td>
          <td class="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">${formatDate(item.createdAt)}</td>
          <td class="px-4 py-3">
            <div class="flex gap-2">
              <button type="button" data-action="view" data-id="${item.id}" title="View details" aria-label="View details"
                class="view-btn flex h-8 w-8 items-center justify-center rounded-lg border border-[#739e67]/30 bg-[#739e67]/10 text-[#4b6544] hover:bg-[#739e67] hover:text-white">
                <span class="material-symbols-outlined text-[18px]">visibility</span>
              </button>
              <button type="button" data-action="edit" data-id="${item.id}" class="edit-btn rounded-lg bg-[#739e67] px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white hover:bg-[#4b6544]">Edit</button>
              <button type="button" data-action="delete" data-id="${item.id}" class="delete-btn rounded-lg bg-red-600 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white hover:bg-red-700">Delete</button>
            </div>
          </td>
        </tr>`
      )
      .join("");
  } catch (err) {
    console.error("Failed to load submissions:", err);
    submissionsBody.innerHTML = `
      <tr>
        <td colspan="7" class="px-4 py-8 text-center text-sm text-red-600">
          Failed to load submissions. Check Firestore setup and security rules.
        </td>
      </tr>`;
    tableWrapper?.classList.remove("hidden");
  } finally {
    loadingState?.classList.add("hidden");
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function openViewModal(id) {
  const item = submissions.find((s) => s.id === id);
  if (!item) return;

  viewingId = id;
  viewFormTypeLabel.textContent = `${formatType(item.formType)} Form Submission`;

  const commonFields = [
    renderDetailRow("Full Name", item.fullName),
    renderDetailRow("Mobile Number", item.mobile),
    renderDetailRow("Email Address", item.email),
    renderDetailRow("Service Required", item.service)
  ];

  const contactFieldsHtml =
    item.formType === "contact"
      ? [
          renderDetailRow("Subject", item.subject),
          renderDetailRow("Message", item.message, true)
        ]
      : [];

  const enquiryFieldsHtml =
    item.formType === "enquiry"
      ? [
          renderDetailRow("Company Name", item.companyName),
          renderDetailRow("Substrate Material", item.substrateMaterial),
          renderDetailRow("Estimated Quantity", item.estimatedQuantity),
          renderDetailRow("Required By", item.requiredBy),
          renderDetailRow("Project Details", item.projectDetails, true)
        ]
      : [];

  viewDetails.innerHTML = `
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      ${renderDetailRow("Form Type", formatType(item.formType))}
      ${renderDetailRow("Submitted On", formatDate(item.createdAt))}
      ${renderDetailRow("Last Updated", formatDate(item.updatedAt))}
      ${commonFields.join("")}
      ${contactFieldsHtml.join("")}
      ${enquiryFieldsHtml.join("")}
    </div>`;

  viewModal?.classList.remove("hidden");
  setModalOpen(true);
}

function closeViewModal() {
  viewingId = null;
  viewModal?.classList.add("hidden");
  if (editModal?.classList.contains("hidden")) {
    setModalOpen(false);
  }
}

function openEditModal(id) {
  const item = submissions.find((s) => s.id === id);
  if (!item) return;

  closeViewModal();
  editingId = id;
  editForm.elements.formType.value = item.formType || "contact";
  editForm.elements.fullName.value = item.fullName || "";
  editForm.elements.mobile.value = item.mobile || "";
  editForm.elements.email.value = item.email || "";
  editForm.elements.subject.value = item.subject || "";
  editForm.elements.service.value = item.service || "";
  editForm.elements.message.value = item.message || "";
  editForm.elements.companyName.value = item.companyName || "";
  editForm.elements.substrateMaterial.value = item.substrateMaterial || "";
  editForm.elements.estimatedQuantity.value = item.estimatedQuantity || "";
  editForm.elements.requiredBy.value = item.requiredBy || "";
  editForm.elements.projectDetails.value = item.projectDetails || "";

  toggleFieldGroups(item.formType);
  editModal?.classList.remove("hidden");
  setModalOpen(true);
}

function closeEditModal() {
  editingId = null;
  editModal?.classList.add("hidden");
  if (viewModal?.classList.contains("hidden")) {
    setModalOpen(false);
  }
}

function toggleFieldGroups(formType) {
  const isContact = formType === "contact";
  contactFields?.classList.toggle("hidden", !isContact);
  enquiryFields?.classList.toggle("hidden", isContact);
}

async function saveEdit(event) {
  event.preventDefault();
  if (!editingId) return;

  const formType = editForm.elements.formType.value;
  const payload = {
    formType,
    fullName: editForm.elements.fullName.value.trim(),
    mobile: editForm.elements.mobile.value.trim(),
    email: editForm.elements.email.value.trim(),
    service: editForm.elements.service.value.trim(),
    updatedAt: serverTimestamp()
  };

  if (formType === "contact") {
    Object.assign(payload, {
      subject: editForm.elements.subject.value.trim(),
      message: editForm.elements.message.value.trim(),
      companyName: "",
      substrateMaterial: "",
      estimatedQuantity: "",
      requiredBy: "",
      projectDetails: ""
    });
  } else {
    Object.assign(payload, {
      companyName: editForm.elements.companyName.value.trim(),
      substrateMaterial: editForm.elements.substrateMaterial.value.trim(),
      estimatedQuantity: editForm.elements.estimatedQuantity.value.trim(),
      requiredBy: editForm.elements.requiredBy.value,
      projectDetails: editForm.elements.projectDetails.value.trim(),
      subject: "",
      message: ""
    });
  }

  const saveBtn = editForm.querySelector('[type="submit"]');
  saveBtn.disabled = true;
  saveBtn.textContent = "Saving...";

  try {
    await updateDoc(doc(db, COLLECTION_NAME, editingId), payload);
    closeEditModal();
    await loadSubmissions();
  } catch (err) {
    console.error("Failed to update:", err);
    alert("Failed to save changes. Please try again.");
  } finally {
    saveBtn.disabled = false;
    saveBtn.textContent = "Save Changes";
  }
}

async function deleteSubmission(id) {
  const item = submissions.find((s) => s.id === id);
  const name = item?.fullName || "this submission";
  if (!confirm(`Delete submission from "${name}"? This cannot be undone.`)) return;

  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
    await loadSubmissions();
  } catch (err) {
    console.error("Failed to delete:", err);
    alert("Failed to delete submission. Please try again.");
  }
}

passcodeForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  if (passcodeInput.value === PASSCODE) {
    sessionStorage.setItem(AUTH_KEY, "true");
    passcodeError?.classList.add("hidden");
    showAdmin();
  } else {
    passcodeError?.classList.remove("hidden");
    passcodeInput.value = "";
    passcodeInput.focus();
  }
});

logoutBtn?.addEventListener("click", () => {
  sessionStorage.removeItem(AUTH_KEY);
  showGate();
  passcodeInput.value = "";
});

refreshBtn?.addEventListener("click", loadSubmissions);

submissionsBody?.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-action]");
  if (!btn) return;
  const { action, id } = btn.dataset;
  if (action === "view") openViewModal(id);
  if (action === "edit") openEditModal(id);
  if (action === "delete") deleteSubmission(id);
});

viewCloseBtn?.addEventListener("click", closeViewModal);
viewCloseBottomBtn?.addEventListener("click", closeViewModal);
viewEditBtn?.addEventListener("click", () => {
  if (viewingId) openEditModal(viewingId);
});
viewModal?.addEventListener("click", (e) => {
  if (e.target === viewModal) closeViewModal();
});

editForm?.addEventListener("submit", saveEdit);
editCancelBtn?.addEventListener("click", closeEditModal);
editModal?.addEventListener("click", (e) => {
  if (e.target === editModal) closeEditModal();
});

editForm?.elements.formType?.addEventListener("change", (e) => {
  toggleFieldGroups(e.target.value);
});

if (isAuthenticated()) {
  showAdmin();
} else {
  showGate();
}
