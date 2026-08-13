# Firebase Firestore Setup

This project stores Contact Us and Enquiry form submissions in Firebase Firestore.

## Project Details

- **Firebase project:** `ssmetalfinishers-ea4a7`
- **Collection:** `contactSubmissions`
- **Admin page:** `ssmetalsviewform.html` (passcode: `2026`)

## 1. Enable Firestore

1. Go to [Firebase Console](https://console.firebase.google.com/) and open project **ssmetalfinishers-ea4a7**.
2. In the left menu, click **Build → Firestore Database**.
3. Click **Create database**.
4. Choose **Start in production mode** (you will set rules below).
5. Select a region close to your users (e.g. `asia-south1` for India) and confirm.

## 2. Set Security Rules

In Firestore → **Rules**, paste and publish:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /contactSubmissions/{docId} {
      allow create: if request.resource.data.keys().hasAll(['formType', 'fullName', 'email'])
                    && request.resource.data.formType in ['contact', 'enquiry'];
      allow read, update, delete: if true;
    }
  }
}
```

These rules allow anyone to submit forms and allow the admin page to list, edit, and delete entries.

> **Security note:** The admin passcode (`2026`) only hides the admin UI. It does not protect Firestore data. For stronger security later, add Firebase Authentication for admin users and change `read, update, delete` rules to require authentication.

## 3. Test the Integration

1. Open `contact.html` and submit the Contact form.
2. Open `enquiry.html` and submit the Enquiry form.
3. In Firebase Console → Firestore → **Data**, confirm documents appear in `contactSubmissions`.
4. Open `ssmetalsviewform.html`, enter passcode `2026`, and verify both submissions appear in the table.
5. Test **Edit** and **Delete** from the admin page.

## Files

| File | Purpose |
|------|---------|
| `assets/js/firebase-config.js` | Firebase initialization |
| `assets/js/form-submit.js` | Saves Contact & Enquiry form data |
| `assets/js/admin-forms.js` | Admin list, edit, delete |
| `ssmetalsviewform.html` | Passcode-protected admin UI |

## Data Fields

Each document includes:

- `formType`: `"contact"` or `"enquiry"`
- `fullName`, `mobile`, `email`, `service`
- Contact-only: `subject`, `message`
- Enquiry-only: `companyName`, `substrateMaterial`, `estimatedQuantity`, `requiredBy`, `projectDetails`
- `createdAt`, `updatedAt` (Firestore server timestamps)
