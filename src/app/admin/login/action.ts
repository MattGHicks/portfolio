"use server";

import { redirect } from "next/navigation";
import { constantTimeEqual, createSession, setSessionCookie } from "@/lib/auth";

export async function loginAction(formData: FormData) {
  const password = (formData.get("password") as string) ?? "";
  const from = (formData.get("from") as string) || "/admin";

  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    redirect("/admin/login?error=Server%20misconfigured%3A%20ADMIN_PASSWORD%20not%20set");
  }

  if (!constantTimeEqual(password, expected)) {
    redirect("/admin/login?error=Incorrect%20password");
  }

  const token = await createSession();
  setSessionCookie(token);
  redirect(from);
}
