import { NextRequest, NextResponse } from "next/server";
import data from "@/data/filtered_data.json";
import detail from "@/data/categories_and_subcategories.json";

export async function GET(req: NextRequest) {
  // console.log("🚀 ~ data:1", data);

  try {
    return NextResponse.json({ services: detail });
  } catch (error) {}
}
export async function POST(req: Request) {
  // console.log("🚀 ~ data:1", data);
  const body = await req.json();
  // console.log("🚀 ~ POST ~ body:", body);
  let final = [];
  for (let i = 0; i < data.length; i++) {
    // console.log(data[i]);
    if (data[i].Category == body.service) {
      final.push(data[i]);
    }
  }

  try {
    return NextResponse.json({ service: final });
  } catch (error) {}
}
