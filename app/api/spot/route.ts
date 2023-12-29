import { NextRequest, NextResponse } from "next/server";
// import { geolocation } from "@vercel/edge";
import { headers } from "next/headers";
import prisma from "../../../lib/prisma";

import type { NextApiRequest, NextApiResponse } from "next";

export async function POST(request: Request) {
  const { paper, general, recycle, latitude, longitude } = await request.json();

  const range = 0.0005;
  const found = await prisma.spot.findFirst({
    where: {
      latitude: { gte: latitude - range, lte: latitude + range },
      longitude: { gte: longitude - range, lte: longitude + range },
    },
  });

  console.log(found);
  if (found) {
    const updatedRecord = await prisma.spot.update({
      where: {
        id: found.id,
      },
      data: {
        paper: paper,
        general: general,
        recycle: recycle,
        latitude: latitude,
        longitude: longitude,
      },
    });
    return NextResponse.json({
      message: "this geolocation is already registerd then updated.",
      updated: updatedRecord,
    });
  }

  // const insertResult = await prisma.spot.create({
  //   data: {
  //     paper,
  //     general,
  //     recycle,
  //     latitude,
  //     longitude,
  //   },
  // });

  debugger;

  return NextResponse.json({
    founded: found,
    // inserted: insertResult,
  });
}