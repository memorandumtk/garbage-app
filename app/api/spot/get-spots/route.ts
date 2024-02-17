import { isNumberObject } from "util/types";
import prisma from "../../../../lib/prisma";
import { Corben } from "next/font/google";

export async function GET(request: Request) {
  const spots = await prisma.spot.findMany({
    select: {
      general: true,
      paper: true,
      recycle: true,
      latitude: true,
      longitude: true,
    },
  });
  // debugger;
  const result = spots.map((value, key) => {
    let colorOptions, color;
    if (value.general === 1 && value.paper === 1 && value.recycle === 1) {
      color = "white";
    } else if (value.general === 1 && value.paper === 1) {
      color = "magenta";
    } else if (value.paper === 1 && value.recycle === 1) {
      color = "magenta";
    } else if (value.general === 1 && value.recycle === 1) {
      color = "magenta";
    } else if (value.general === 1) {
      color = "gray";
    } else if (value.paper === 1) {
      color = "yellow";
    } else if (value.recycle === 1) {
      color = "cyan";
    }
    colorOptions = { color: color, fillColor: color };
    return { ...value, colorOptions: colorOptions };
  });

  return Response.json({
    result: result,
  });
}
