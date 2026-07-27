"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ArrowRight, Check, Lock } from "./Icons";

export default function AuthForm({ mode }: { mode: "sign-in" | "sign-up" }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const isSignup = mode === "sign-up";

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") || "").trim();
    const password = String(data.get("password") || "");
    const name = String(data.get("name") || "Professional").trim();
    const acceptedTerms = data.get("terms") === "on";
    if (isSignup && name.length < 2) return setError("Enter your name.");
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Enter a valid email address.");
    if (password.length < 6) return setError("Use at least 6 characters for your password.");
    if (isSignup && !acceptedTerms) return setError("Confirm the privacy and image-rights statement to continue.");
    setError("");
    setBusy(true);
    window.setTimeout(() => {
      localStorage.setItem("aragon-session", JSON.stringify({ email, name, signedInAt: new Date().toISOString() }));
      router.push("/studio");
    }, 650);
  }

  return (
    <form className="auth-form" onSubmit={submit} noValidate>
      {isSignup && <label><span>Name</span><input name="name" type="text" autoComplete="name" placeholder="Your name" required/></label>}
      <label><span>Email</span><input name="email" type="email" autoComplete="email" placeholder="you@company.com" required/></label>
      <label><span>Password</span><input name="password" type="password" autoComplete={isSignup ? "new-password" : "current-password"} placeholder="At least 6 characters" required/></label>
      {isSignup && <label className="checkbox-row"><input name="terms" type="checkbox" required/><span>I agree to the privacy policy and confirm I own the photos I upload.</span></label>}
      {error && <div className="form-error" role="alert">{error}</div>}
      <button className="button button--gradient button--full" type="submit" disabled={busy}>
        {busy ? <><span className="button-loader"/> Preparing your studio…</> : <>{isSignup ? "Create free account" : "Log in"} <ArrowRight/></>}
      </button>
      <div className="auth-divider"><span>or continue with</span></div>
      <button className="oauth-button" type="button" onClick={() => { localStorage.setItem("aragon-session", JSON.stringify({email:"demo@aragon.studio", name:"Demo User"})); router.push("/studio"); }}>
        <span className="google-mark">G</span> Google
      </button>
      <p className="auth-switch">{isSignup ? "Already have an account?" : "New to Aragon?"} <Link href={isSignup ? "/sign-in" : "/sign-up"}>{isSignup ? "Log in" : "Create one"}</Link></p>
      <p className="auth-security"><Lock size={15}/> Encrypted in transit <span>•</span> <Check size={15}/> Private by default</p>
    </form>
  );
}
