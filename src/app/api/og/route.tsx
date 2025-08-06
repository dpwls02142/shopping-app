import { ImageResponse } from "next/og";

export const runtime = "edge";
const size = {
  width: 1200,
  height: 630,
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name") || "고객";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          fontSize: 48,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f9fafb",
          fontWeight: "bold",
        }}
      >
        {name}님의 쇼핑몰
      </div>
    ),
    {
      ...size,
    }
  );
}
