import { headers } from "next/headers";
import { cookies } from "next/headers";
import prisma from "../../../lib/prisma";
import {
  deleteCookie,
  getCookie,
  setCookie,
  hasCookie,
  getCookies,
} from "cookies-next";

// import { type NextRequest, NextResponse } from 'next/server'
// import type { NextApiRequest, NextApiResponse } from "next";

export async function POST( req:Request, res: Response) {
  const { paper, general, recycle, latitude, longitude } = await req.json();

  // Get user info from cookie because it's needed for inserting new record.
  const userEmail = getCookie("auth0userEmail", { cookies });
  const userInfo = await prisma.user.findFirst({
    where: {
      email: userEmail as string | undefined,
    },
  });
  const userId = userInfo?.id;
  if (!userInfo) {
    return new Response("Invalid user", {
      status: 404
    })
  }

  // Searching close garbage box info and update it, if there is matched record in db, this will be renewed.
  const range = 0.0005; // approximately lat:111.32m, lon:75.92m
  const found = await prisma.spot.findFirst({
    where: {
      latitude: { gte: latitude - range, lte: latitude + range },
      longitude: { gte: longitude - range, lte: longitude + range },
    },
  });
  console.log('spot/route 41')
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
        user: { connect: { id: userId } }
      },
    });
    // return NextResponse.json({
    return Response.json({
      message: "this geolocation is already registerd then updated.",
      updated: updatedRecord,
    });
  }

  const insertResult = await prisma.spot.create({
    data: {
      paper,
      general,
      recycle,
      latitude,
      longitude,
      user: { connect: { id: userId } }
    },
  });

  // return NextResponse.json({
  return Response.json({
    founded: found,
    inserted: insertResult,
  });
}
