import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Wealthly — Multi-User Expense & Income Tracker" },
      {
        name: "description",
        content:
          "Wealthly gives every user a private finance workspace: expenses, income, budgets, analytics, calendar and PDF or Excel reports.",
      },
      { property: "og:title", content: "Wealthly — Multi-User Expense & Income Tracker" },
      {
        property: "og:description",
        content:
          "Wealthly gives every user a private finance workspace: expenses, income, budgets, analytics, calendar and PDF or Excel reports.",
      },
    ],
  }),
  component: Landing,
});

const FEATURES = [
  ["Private by account", "Every user gets an isolated workspace. Nobody can read your records."],
  ["Live analytics", "Income vs expense, category splits and monthly trends, updated instantly."],
  ["Budgets & calendar", "Set monthly limits and see spending day by day."],
  ["PDF & Excel", "Download reports or import an existing workbook in seconds."],
];

function Landing() {
  return (
    <div className="auth-shell">
      <div className="auth-card wide">
        <div className="auth-brand">
          <div className="brand-mark">W</div>
          <span>Wealthly</span>
        </div>

        <h1 className="landing-title">
          Every rupee, dollar and euro <em>accounted for</em>.
        </h1>
        <p className="landing-sub">
          A production-ready personal finance tracker with secure accounts, cloud-synced data and
          the reports you actually need. Your numbers follow you to every device — and stay yours
          alone.
        </p>

        <div className="landing-actions">
          <Link to="/auth" search={{ mode: "register" }} className="auth-btn">
            Create your account
          </Link>
          <Link to="/auth" search={{ mode: "login" }} className="auth-btn secondary">
            Sign in
          </Link>
        </div>

        <div className="landing-features">
          {FEATURES.map(([title, copy]) => (
            <div className="landing-feature" key={title}>
              <strong>{title}</strong>
              <span>{copy}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
