import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const chatSessions = [
  {
    name: "Spring Planting Queries",
    someid: "4f5a2c17-a687-4e4c-9d3b-93c8f64f1db4",
    creationDate: new Date(2023, 3, 10, 14, 30).toISOString(),
  },
  {
    name: "Irrigation Solutions Discussion",
    someid: "be98e057-ca0d-4f5b-8b0e-688a95c7e65b",
    creationDate: new Date(2023, 3, 11, 15, 45).toISOString(),
  },
  {
    name: "Organic Farming Tips",
    someid: "e4b99ad3-d403-4fb7-a2ab-6f734d73d6b7",
    creationDate: new Date(2023, 3, 12, 16, 50).toISOString(),
  },
  {
    name: "Harvest Season Strategies",
    someid: "1c5b76d0-75e2-491b-afde-20e130446ac5",
    creationDate: new Date(2023, 3, 13, 17, 55).toISOString(),
  },
];

export async function GET(req: NextRequest) {
  // console.log("🚀 ~ GET ~ req:", req);
  try {
    return NextResponse.json({ chatSessions });
  } catch (error) {}
}
export async function POST(req: Request) {
  // console.log("🚀 ~ GET ~ req:", req);

  // const body = await req.json();
  // // console.log("🚀 ~ POST ~ body:", body);
  // const payload = {
  //   name: body?.name || "New",
  //   someid: body?.someid,
  //   creationDate: new Date().toISOString(),
  // };

  // chatSessions.unshift(payload);
  revalidatePath("/chat");
  revalidatePath("/services");
  try {
    return NextResponse.json({ chatSessions });
  } catch (error) {}
}
