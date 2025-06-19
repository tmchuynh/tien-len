import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const word = searchParams.get("word");

  if (!word) {
    return NextResponse.json(
      { error: "Word parameter is required" },
      { status: 400 }
    );
  }

  const apiKey = process.env.NEXTJS_MERRIAM_WEBSTER_THESAURUS_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Thesaurus API key not configured" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${encodeURIComponent(
        word
      )}?key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`Thesaurus API request failed: ${response.status}`);
    }

    const data = await response.json();

    // Handle case where word is not found (returns suggestions array)
    if (Array.isArray(data) && data.length > 0 && typeof data[0] === "string") {
      return NextResponse.json(
        {
          error: "Word not found",
          suggestions: data.slice(0, 5), // Return first 5 suggestions
        },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Thesaurus API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch thesaurus data" },
      { status: 500 }
    );
  }
}
