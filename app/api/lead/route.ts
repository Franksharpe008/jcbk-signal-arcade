import { NextResponse } from "next/server";

const defaultRecipients = "";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const company = String(body.company || "").trim();
    const interest = String(body.interest || "").trim();
    const notes = String(body.notes || "").trim();

    if (!name || !email) {
      return NextResponse.json({ ok: false, error: "Name and email are required." }, { status: 400 });
    }

    const apiKey = process.env.BREVO_API_KEY;
    const fromEmail = process.env.BREVO_FROM_EMAIL;
    const fromName = process.env.BREVO_FROM_NAME || "JCBK Signal Arcade";
    const toList = String(process.env.LEAD_FORWARD_TO || defaultRecipients)
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean)
      .map((value) => ({ email: value }));

    if (!apiKey || !fromEmail || !toList.length) {
      return NextResponse.json({ ok: false, error: "Lead route is not configured." }, { status: 500 });
    }

    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": apiKey
      },
      body: JSON.stringify({
        sender: { email: fromEmail, name: fromName },
        to: toList,
        replyTo: { email, name },
        subject: `New JCBK Signal Arcade lead: ${name}`,
        textContent: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Company: ${company || "[not provided]"}`,
          `Interest: ${interest || "[not provided]"}`,
          "",
          notes || "[no notes]"
        ].join("\n")
      })
    });

    const payload = await res.json();
    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: payload?.message || `Brevo returned ${res.status}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, messageId: payload?.messageId || null });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
