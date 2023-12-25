import { NextRequest, NextResponse } from "next/server";
// import { geolocation } from "@vercel/edge";
import { headers } from "next/headers";
import prisma from "../../../lib/prisma";

import type { NextApiRequest, NextApiResponse } from "next";

export async function POST(request: Request) {
  const { latitude, longitude } = await request.json();

  await prisma.spot.create({
    data: {
      latitude,longitude
    }
  });

  debugger;

  return Response.json({
    response: `${latitude}, ${longitude} has been created successfully!`,
  });
}
