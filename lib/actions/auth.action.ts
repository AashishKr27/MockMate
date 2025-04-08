/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { db, auth } from "@/firebase/admin";
import { cookies } from "next/headers";

const ONE_WEEK = 60 * 60 * 24 * 7; // 7 days in milliseconds

export async function signUp(params: SignUpParams) {
  const { uid, name, email } = params;

  try {
    const userRecord = await db.collection("users").doc(uid).get();

    if (userRecord.exists) {
      return {
        success: false,
        message: "User already exists",
      };
    }

    await db.collection("users").doc(uid).set({
      name,
      email,
    });
    
  } catch (e) {
    console.error("Error signing up:", e);
    if (e instanceof Error && (e as any).code === "auth/email-already-exists") {
      return {
        success: false,
        message: "Email already exists",
      };
    }
    return {
      success: false,
      message: "Error signing up",
    };
  }
}

export async function signIn(params: SignInParams) {
  const { email, idToken } = params;
  try {
    const userRecord = await auth.getUserByEmail(email);

    if (!userRecord) {
      return {
        success: false,
        message: "User doesn't exist",
      };
    }

    await setSessionCookie(idToken);

  } catch (e) {
    console.log(e);
    return {
      success: false,
      message: "Error signing in",
    };
  }
}

export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: ONE_WEEK * 1000, // 7 days
  });
  cookieStore.set("session", sessionCookie, {
    maxAge: ONE_WEEK, // 7 days
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}
