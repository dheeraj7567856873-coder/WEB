import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const searchSchema = z.object({
  mode: z.enum(["login", "register", "forgot"]).catch("login"),
});

export const Route = createFileRoute("/auth")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Sign in to Wealthly" },
      {
        name: "description",
        content: "Sign in or create your Wealthly account to access your private finance workspace.",
      },
      { property: "og:title", content: "Sign in to Wealthly" },
      {
        property: "og:description",
        content: "Access your private Wealthly finance workspace.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

const credentials = z.object({
  email: z.string().trim().email("Enter a valid email address").max(255),
  password: z.string().min(8, "Password must be at least 8 characters").max(128),
});

function AuthPage() {
  const { mode } = Route.useSearch();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/app", replace: true });
    });
  }, [navigate]);

  function setMode(next: "login" | "register" | "forgot") {
    setError("");
    setNotice("");
    void navigate({ to: "/auth", search: { mode: next }, replace: true });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setNotice("");

    if (mode === "forgot") {
      const parsed = z.string().trim().email().safeParse(email);
      if (!parsed.success) return setError("Enter a valid email address");
      setBusy(true);
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(parsed.data, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      setBusy(false);
      if (resetError) return setError(resetError.message);
      return setNotice("If that email has an account, a reset link is on its way.");
    }

    const parsed = credentials.safeParse({ email, password });
    if (!parsed.success) return setError(parsed.error.issues[0]?.message ?? "Invalid details");

    setBusy(true);
    if (mode === "register") {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: parsed.data.email,
        password: parsed.data.password,
        options: {
          emailRedirectTo: window.location.origin,
          data: { full_name: fullName.trim().slice(0, 80) },
        },
      });
      setBusy(false);
      if (signUpError) return setError(signUpError.message);

      // Supabase returns a "fake" user with no identities (and no error) when
      // the email is already registered, instead of leaking that info via an
      // error message. Detect that case explicitly so we can tell the user.
      const identities = data.user?.identities ?? [];
      if (data.user && identities.length === 0) {
        return setError("This email is already registered. Please sign in instead.");
      }

      if (!data.session) {
        return setNotice("Account created. Check your inbox and confirm your email to sign in.");
      }
      return void navigate({ to: "/app", replace: true });
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: parsed.data.email,
      password: parsed.data.password,
    });
    setBusy(false);
    if (signInError) return setError(signInError.message);
    return void navigate({ to: "/app", replace: true });
  }

  const isForgot = mode === "forgot";
  const isRegister = mode === "register";

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-brand">
          <div className="brand-mark">W</div>
          <span>Wealthly</span>
        </div>

        {isForgot ? (
          <>
            <h1 className="auth-title">Reset your password</h1>
            <p className="auth-sub">We'll email you a secure link to choose a new one.</p>
          </>
        ) : (
          <>
            <h1 className="auth-title">{isRegister ? "Create your account" : "Welcome back"}</h1>
            <p className="auth-sub">
              {isRegister
                ? "Your own private finance workspace, ready in seconds."
                : "Sign in to pick up right where you left off."}
            </p>
            <div className="auth-tabs">
              <button
                type="button"
                className={`auth-tab ${!isRegister ? "active" : ""}`}
                onClick={() => setMode("login")}
              >
                Sign in
              </button>
              <button
                type="button"
                className={`auth-tab ${isRegister ? "active" : ""}`}
                onClick={() => setMode("register")}
              >
                Register
              </button>
            </div>
          </>
        )}

        {error ? <div className="auth-alert error">{error}</div> : null}
        {notice ? <div className="auth-alert success">{notice}</div> : null}

        <form onSubmit={handleSubmit} noValidate>
          {isRegister ? (
            <div className="auth-field">
              <label htmlFor="fullName">Full name</label>
              <input
                id="fullName"
                type="text"
                maxLength={80}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Alex Sharma"
              />
            </div>
          ) : null}

          <div className="auth-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              maxLength={255}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          {!isForgot ? (
            <div className="auth-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                autoComplete={isRegister ? "new-password" : "current-password"}
                minLength={8}
                maxLength={128}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                required
              />
            </div>
          ) : null}

          <button className="auth-btn" type="submit" disabled={busy}>
            {busy
              ? "Please wait…"
              : isForgot
                ? "Send reset link"
                : isRegister
                  ? "Create account"
                  : "Sign in"}
          </button>
        </form>

        <div className="auth-row">
          {isForgot ? (
            <button type="button" className="auth-link" onClick={() => setMode("login")}>
              Back to sign in
            </button>
          ) : (
            <button type="button" className="auth-link" onClick={() => setMode("forgot")}>
              Forgot password?
            </button>
          )}
          <Link to="/" className="auth-link">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
