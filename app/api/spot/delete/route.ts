import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import prisma from "../../../../lib/prisma";

import type { NextApiRequest, NextApiResponse } from "next";

export async function DELETE(request: Request) {

  const deletedRecord = await prisma.spot.deleteMany({});

  return Response.json({
    result: deletedRecord,
  });
}