import "../admin.css";
import { loginAction } from "./action";

export const metadata = {
  title: "Sign in · Career Ops",
};

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string; from?: string };
}) {
  const error = searchParams.error;
  const from = searchParams.from || "/admin";

  return (
    <div className="admin-root">
      <div className="admin-login">
        <form action={loginAction} className="admin-login-card">
          <div className="admin-login-brand">
            <span className="admin-login-brand-mark" />
            <span>Career Ops · digitalfish.io</span>
          </div>
          <div>
            <h1 className="admin-login-title">Sign in</h1>
            <p className="admin-login-sub">
              Private dashboard. Enter the admin password to continue.
            </p>
          </div>

          {error && <div className="admin-error">{error}</div>}

          <input type="hidden" name="from" value={from} />

          <div className="admin-form-group">
            <label className="admin-label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              autoFocus
              required
              className={`admin-input ${error ? "admin-input--error" : ""}`}
              placeholder="••••••••••••"
            />
          </div>

          <button type="submit" className="admin-btn admin-btn--primary admin-btn--lg" style={{ width: "100%" }}>
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
