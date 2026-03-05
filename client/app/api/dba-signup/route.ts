import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

  try {
    if (!scriptUrl) {
      return NextResponse.json(
        { ok: false, error: "Missing GOOGLE_SCRIPT_URL on server." },
        { status: 500 }
      );
    }

    const body = await req.json();

    // basic validation
    const fullname = String(body?.fullname ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const affiliation = String(body?.affiliation ?? "").trim();
    const commit = Boolean(body?.commit);

    // honeypot
    const website = String(body?.website ?? "");
    if (website.trim().length > 0) {
      return NextResponse.json({ ok: false, error: "Blocked." }, { status: 400 });
    }

    if (!fullname) {
      return NextResponse.json({ ok: false, error: "Full name is required." }, { status: 400 });
    }
    if (!email || !email.includes("@")) {
      return NextResponse.json({ ok: false, error: "Valid email is required." }, { status: 400 });
    }
    if (!affiliation) {
      return NextResponse.json({ ok: false, error: "Affiliation is required." }, { status: 400 });
    }
    if (!commit) {
      return NextResponse.json(
        { ok: false, error: "Commitment confirmation is required." },
        { status: 400 }
      );
    }

    // Forward to Apps Script
    const upstream = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Apps Script sometimes behaves better when a UA is present
        "User-Agent": "NextJS-Vercel-Server",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const upstreamText = await upstream.text();

    // Try parse JSON, but keep raw text for debugging
    let upstreamJson: { ok?: boolean; error?: string } | null = null;
    try {
      upstreamJson = JSON.parse(upstreamText);
    } catch {
      upstreamJson = null;
    }

    if (!upstream.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: "Apps Script returned non-2xx response.",
          upstream_status: upstream.status,
          upstream_body: upstreamJson ?? upstreamText,
        },
        { status: 502 }
      );
    }

    if (!upstreamJson?.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: upstreamJson?.error || "Apps Script did not return ok:true",
          upstream_status: upstream.status,
          upstream_body: upstreamJson ?? upstreamText,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    return NextResponse.json(
      {
        ok: false,
        error: "Server failed to submit to Apps Script.",
        details: err instanceof Error ? err.message : String(err),
      },
      { status: 502 }
    );
  }
}