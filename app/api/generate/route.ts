import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 120;

export async function POST(request: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "AI generation is ready, but OPENAI_API_KEY is not configured. Add it in .env.local or your Vercel project settings, then retry." }, { status: 503 });
    }
    const incoming = await request.formData();
    const images = incoming.getAll("image").filter((value): value is File => value instanceof File);
    const prompt = String(incoming.get("prompt") || "");
    if (!images.length) return NextResponse.json({ error: "Upload at least one valid image file." }, { status: 400 });
    if (images.length > 4) return NextResponse.json({ error: "Upload no more than four reference images." }, { status: 400 });
    for (const image of images) {
      if (!/^image\/(png|jpeg|webp)$/i.test(image.type)) return NextResponse.json({ error: "Use JPG, PNG, or WebP images." }, { status: 400 });
      if (image.size > 5 * 1024 * 1024) return NextResponse.json({ error: "Each optimized reference image must be under 5MB." }, { status: 400 });
    }
    if (prompt.length < 20 || prompt.length > 4000) return NextResponse.json({ error: "The portrait instructions are invalid." }, { status: 400 });

    const body = new FormData();
    body.append("model", process.env.OPENAI_IMAGE_MODEL || "gpt-image-1.5");
    const imageField = images.length > 1 ? "image[]" : "image";
    images.forEach((image, index) => body.append(imageField, image, image.name || `reference-${index + 1}.jpg`));
    body.append("prompt", prompt);
    body.append("size", "1024x1536");
    body.append("quality", "high");
    body.append("input_fidelity", "high");
    body.append("output_format", "png");

    const response = await fetch("https://api.openai.com/v1/images/edits", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}` },
      body,
      signal: AbortSignal.timeout(115000),
    });
    const data = await response.json();
    if (!response.ok) {
      const detail = data?.error?.message || "The image model rejected the request.";
      return NextResponse.json({ error: detail }, { status: response.status >= 500 ? 502 : response.status });
    }
    const b64 = data?.data?.[0]?.b64_json;
    if (!b64) return NextResponse.json({ error: "The image model returned no image. Please retry." }, { status: 502 });
    return NextResponse.json({ image: b64 });
  } catch (error) {
    const message = error instanceof Error && error.name === "TimeoutError" ? "Generation timed out. Try a smaller source image or retry in a moment." : "The generation service is temporarily unavailable.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
