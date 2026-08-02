/**
 * Data access layer for the Wealthly tracker.
 *
 * This module is the ONLY thing that replaced the original localStorage code.
 * Every call is scoped to the signed-in user by row level security, so two
 * accounts can never see each other's records.
 */
import { supabase } from "@/integrations/supabase/client";

export type ExpenseRecord = {
  id: string;
  date: string;
  amount: number;
  category: string;
  paymentMethod: string;
  description: string;
};

export type IncomeRecord = {
  id: string;
  date: string;
  amount: number;
  source: string;
  description: string;
};

export type ProfileRecord = {
  id: string;
  full_name: string;
  email: string;
  avatar_url: string;
};

export type Settings = { theme: string; darkMode: boolean; currency: string };

async function requireUserId(): Promise<string> {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) throw new Error("Your session expired. Please sign in again.");
  return data.user.id;
}

function unwrap<T>(res: { data: T; error: { message: string } | null }): NonNullable<T> {
  if (res.error) throw new Error(res.error.message);
  if (res.data == null) throw new Error("No data returned from the server.");
  return res.data as NonNullable<T>;
}

async function signedAvatarUrl(path: string | null): Promise<string> {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  const { data } = await supabase.storage.from("avatars").createSignedUrl(path, 60 * 60 * 24);
  return data?.signedUrl ?? "";
}

export const api = {
  async loadAll() {
    const userId = await requireUserId();

    const [profileRes, expensesRes, incomesRes, budgetsRes] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", userId).maybeSingle(),
      supabase.from("expenses").select("*").order("date", { ascending: false }),
      supabase.from("incomes").select("*").order("date", { ascending: false }),
      supabase.from("budgets").select("*"),
    ]);

    if (profileRes.error) throw new Error(profileRes.error.message);
    const profileRow = profileRes.data;
    const expenses = unwrap(expensesRes);
    const incomes = unwrap(incomesRes);
    const budgetRows = unwrap(budgetsRes);

    const budgets: Record<string, number> = {};
    for (const b of budgetRows) budgets[b.month] = Number(b.amount);

    return {
      profile: {
        id: userId,
        full_name: profileRow?.full_name ?? "",
        email: profileRow?.email ?? "",
        avatar_url: await signedAvatarUrl(profileRow?.avatar_url ?? null),
      } satisfies ProfileRecord,
      settings: {
        theme: profileRow?.theme ?? "violet",
        darkMode: profileRow?.dark_mode ?? true,
        currency: profileRow?.currency ?? "INR",
      } satisfies Settings,
      expenses: expenses.map((e) => ({
        id: e.id,
        date: e.date,
        amount: Number(e.amount),
        category: e.category,
        paymentMethod: e.payment_method,
        description: e.description ?? "",
      })) satisfies ExpenseRecord[],
      incomes: incomes.map((i) => ({
        id: i.id,
        date: i.date,
        amount: Number(i.amount),
        source: i.source,
        description: i.description ?? "",
      })) satisfies IncomeRecord[],
      budgets,
    };
  },

  async saveSettings(settings: Settings) {
    const userId = await requireUserId();
    const { error } = await supabase
      .from("profiles")
      .update({ theme: settings.theme, dark_mode: settings.darkMode, currency: settings.currency })
      .eq("id", userId);
    if (error) throw new Error(error.message);
  },

  async createExpense(input: Omit<ExpenseRecord, "id">): Promise<ExpenseRecord> {
    const userId = await requireUserId();
    const row = unwrap(
      await supabase
        .from("expenses")
        .insert({
          user_id: userId,
          date: input.date,
          amount: input.amount,
          category: input.category,
          payment_method: input.paymentMethod,
          description: input.description,
        })
        .select()
        .single(),
    );
    return {
      id: row.id,
      date: row.date,
      amount: Number(row.amount),
      category: row.category,
      paymentMethod: row.payment_method,
      description: row.description ?? "",
    };
  },

  async createIncome(input: Omit<IncomeRecord, "id">): Promise<IncomeRecord> {
    const userId = await requireUserId();
    const row = unwrap(
      await supabase
        .from("incomes")
        .insert({
          user_id: userId,
          date: input.date,
          amount: input.amount,
          source: input.source,
          description: input.description,
        })
        .select()
        .single(),
    );
    return {
      id: row.id,
      date: row.date,
      amount: Number(row.amount),
      source: row.source,
      description: row.description ?? "",
    };
  },

  async updateExpense(record: ExpenseRecord) {
    const { error } = await supabase
      .from("expenses")
      .update({
        date: record.date,
        amount: record.amount,
        category: record.category,
        payment_method: record.paymentMethod,
        description: record.description,
      })
      .eq("id", record.id);
    if (error) throw new Error(error.message);
  },

  async updateIncome(record: IncomeRecord) {
    const { error } = await supabase
      .from("incomes")
      .update({
        date: record.date,
        amount: record.amount,
        source: record.source,
        description: record.description,
      })
      .eq("id", record.id);
    if (error) throw new Error(error.message);
  },

  async deleteExpense(id: string) {
    const { error } = await supabase.from("expenses").delete().eq("id", id);
    if (error) throw new Error(error.message);
  },

  async deleteIncome(id: string) {
    const { error } = await supabase.from("incomes").delete().eq("id", id);
    if (error) throw new Error(error.message);
  },

  async setBudget(month: string, amount: number) {
    const userId = await requireUserId();
    const { error } = await supabase
      .from("budgets")
      .upsert({ user_id: userId, month, amount }, { onConflict: "user_id,month" });
    if (error) throw new Error(error.message);
  },

  async bulkImport(payload: {
    expenses: Omit<ExpenseRecord, "id">[];
    incomes: Omit<IncomeRecord, "id">[];
    budgets: { month: string; amount: number }[];
  }) {
    const userId = await requireUserId();

    if (payload.expenses.length) {
      const { error } = await supabase.from("expenses").insert(
        payload.expenses.map((e) => ({
          user_id: userId,
          date: e.date,
          amount: e.amount,
          category: e.category,
          payment_method: e.paymentMethod,
          description: e.description,
        })),
      );
      if (error) throw new Error(error.message);
    }

    if (payload.incomes.length) {
      const { error } = await supabase.from("incomes").insert(
        payload.incomes.map((i) => ({
          user_id: userId,
          date: i.date,
          amount: i.amount,
          source: i.source,
          description: i.description,
        })),
      );
      if (error) throw new Error(error.message);
    }

    if (payload.budgets.length) {
      const { error } = await supabase
        .from("budgets")
        .upsert(
          payload.budgets.map((b) => ({ user_id: userId, month: b.month, amount: b.amount })),
          { onConflict: "user_id,month" },
        );
      if (error) throw new Error(error.message);
    }
  },

  async updateProfile(patch: { full_name: string }) {
    const userId = await requireUserId();
    const { error } = await supabase.from("profiles").update(patch).eq("id", userId);
    if (error) throw new Error(error.message);
  },

  async changePassword(password: string) {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) throw new Error(error.message);
  },

  async uploadAvatar(file: File): Promise<string> {
    const userId = await requireUserId();
    const ext = (file.name.split(".").pop() || "png").toLowerCase();
    const path = `${userId}/avatar-${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("avatars").upload(path, file, { upsert: true });
    if (error) throw new Error(error.message);
    const { error: profileError } = await supabase
      .from("profiles")
      .update({ avatar_url: path })
      .eq("id", userId);
    if (profileError) throw new Error(profileError.message);
    return signedAvatarUrl(path);
  },

  async logout() {
    await supabase.auth.signOut();
    window.location.href = "/auth";
  },
};
