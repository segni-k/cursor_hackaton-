# Admin dashboard (team workspace)

This folder is reserved for the **admin** Inertia/React UI.

- Keep routes in `routes/admin.php` (loaded from `routes/web.php`).
- Put controllers in `app/Http/Controllers/Admin/`.
- Use page names like `Admin/Dashboard` → `resources/js/Pages/Admin/Dashboard.jsx`.

**Do not** add admin pages under `resources/js/Pages/Landing/` or `resources/js/Pages/User/` — admin UI belongs here only.

Patient and pharmacy UIs live under `User/Patient/` and `User/Pharmacy/`.
