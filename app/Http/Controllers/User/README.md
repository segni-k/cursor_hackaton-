# User app (back-end)

Namespaces under `App\Http\Controllers\User`:

| Namespace | Purpose |
|-----------|---------|
| `User\` | Shared user routes: medicines, orders, payments, pharmacies (patient browse), prescriptions, receipts, profile, locale |
| `User\Patient\` | Patient dashboard |
| `User\Pharmacy\` | Pharmacy owner dashboard, inventory, orders, payments, analytics |
| `User\Auth\` | Authentication (was `Auth\`) |

Routes are registered in `routes/user.php` and `routes/auth.php`.

**Not here:** `Landing\` (marketing), `Admin\` (admin team).
