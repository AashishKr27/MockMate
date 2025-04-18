"use server";

import { db, auth } from "@/firebase/admin";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ONE_WEEK = 60 * 60 * 24 * 7; // 7 days in milliseconds

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

export async function signUp(params: SignUpParams) {
  const { uid, name, email } = params;

  try {
    // Create Firestore document first (more forgiving if fails)
    await db.collection("users").doc(uid).set({
      name,
      email,
      createdAt: new Date().toISOString(),
    });

    return {
      success: true,
      message: "User created successfully",
    };
  } catch (e) {
    console.error("Firestore Error:", e);
    // Still return success since Auth user was created
    return {
      success: true,
      message: "Account created (profile incomplete)",
    };
  }
}

export async function signIn(params: SignInParams) {
  const { email, idToken } = params;
  try {
    const userRecord = await auth.getUserByEmail(email);
    await setSessionCookie(idToken);

    // Ensure user document exists (create if missing)
    const userDoc = await db.collection("users").doc(userRecord.uid).get();
    if (!userDoc.exists) {
      await db
        .collection("users")
        .doc(userRecord.uid)
        .set({
          email: userRecord.email || email,
          name: userRecord.displayName || "New User",
          createdAt: new Date().toISOString(),
        });
    }

    return { success: true };
  } catch (e) {
    console.error("SignIn Error:", e);
    return { success: false, message: "Error signing in" };
  }
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) return null;

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

    // Return basic user info even if Firestore doc is missing
    return {
      id: decodedClaims.uid,
      email: decodedClaims.email || "",
      name: decodedClaims.name || "User",
    } as User;
  } catch (e) {
    console.error("Auth Error:", e);
    return null;
  }
}

export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user; // Convert to boolean
}

export async function signOut() {
  const cookieStore = cookies();

  // Clear the session cookie by setting it with a past expiration date
  (await cookieStore).set("session", "", {
    maxAge: 0,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
  redirect("/sign-in"); // Redirect to sign-in page after signing out
}
