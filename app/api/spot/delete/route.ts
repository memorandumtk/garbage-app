import { NextRequest, NextResponse } from "next/server";
// import { geolocation } from "@vercel/edge";
import { headers } from "next/headers";
import prisma from "../../../../lib/prisma";

import type { NextApiRequest, NextApiResponse } from "next";

export async function DELETE(request: Request) {

  const deletedRecord = await prisma.spot.deleteMany({});

  return Response.json({
    result: deletedRecord,
  });
}


// If want to get the name of table from formData in http request.
// import prisma from "../../../../lib/prisma";
// import type { NextApiRequest, NextApiResponse } from "next";

// export async function DELETE(request: Request) {
//   const modelMapping = {
//     'modelName1': prisma.modelName1,
//     'modelName2': prisma.modelName2,
//     // ... other models
//   };

//   const formData = await request.formData();
//   const name = formData.get("name");
//   const prismaModel = modelMapping[name as keyof typeof modelMapping];

//   if (!prismaModel) {
//     return new Response(JSON.stringify({ error: 'Invalid model name' }), { status: 400 });
//   }

//   const deletedRecord = await prismaModel.deleteMany({});
  
//   return new Response(JSON.stringify({
//     message: 'Record deleted successfully',
//     deletedRecord: deletedRecord
//   }), { status: 200 });
// }

