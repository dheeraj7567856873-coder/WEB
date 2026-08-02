import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Choose a new password — Wealthly" },
      { name: "description", content: "Set a new password for your Wealthly account." },
      { property: "og:title", content: "Choose a new password — Wealthly" },
      { property: "og:description", content: "Set a new password for your Wealthly account." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResetPassword,
});

function ResetPassword() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    const isRecovery = hash.includes("type=recovery");
    supabase.auth.getSession().then(({ data }) => {
      if (data.session || isRecovery) setReady(true);
      else setError("This reset link is invalid or has expired. Request a new one.");
    });
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    if (password.length < 8) return setError("Password must be at least 8 characters");
    if (password !== confirm) return setError("Passwords do not match");

    setBusy(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (updateError) return setError(updateError.message);
    setNotice("Password updated. Taking you to your dashboard…");
    setTimeout(() => navigate({ to: "/app", replace: true }), 1200);
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-brand">
          <div className="brand-mark">W</div>
          <span>Wealthly</span>
        </div>
        <h1 className="auth-title">Choose a new password</h1>
        <p className="auth-sub">Make it at least 8 characters long.</p>

        {error ? <div className="auth-alert error">{error}</div> : null}
        {notice ? <div className="auth-alert success">{notice}</div> : null}

        <form onSubmit={handleSubmit} noValidate>
          <div className="auth-field">
            <label htmlFor="newPw">New password</label>
            <input
              id="newPw"
              type="password"
              autoComplete="new-password"
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="auth-field">
            <label htmlFor="confirmPw">Confirm password</label>
            <input
              id="confirmPw"
              type="password"
              autoComplete="new-password"
              minLength={8}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>
          <button className="auth-btn" type="submit" disabled={busy || !ready}>
            {busy ? "Updating…" : "Update password"}
          </button>
        </form>

        <p className="auth-note">
          Didn't request this? You can safely close this page — nothing changes until you submit.
        </p>
      </div>
    </div>
  );
}
