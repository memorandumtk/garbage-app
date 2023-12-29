// pages/api/auth/hook.ts
import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: Request) {
  // debugger;
  // Ensure the method is POST
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ message: "Method not allowed" }), {
      status: 405,
    });
  }

  try {
    // Parse the request body as JSON
    const { email, secret } = (await req.json()) as {
      email: string;
      secret: string;
    };

    // Check the secret
    if (secret !== process.env.AUTH0_HOOK_SECRET) {
      return new Response(
        JSON.stringify({ message: `You must provide the correct secret 🤫` }),
        { status: 403 }
      );
    }

    // Process the email
    if (email) {
      await prisma.user.create({
        data: { email },
      });
      return new Response(
        JSON.stringify({
          message: `User with email: ${email} has been created successfully!`,
        }),
        { status: 200 }
      );
    } else {
      return new Response(JSON.stringify({ message: "Email is required" }), {
        status: 400,
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: "Invalid request body" }), {
      status: 400,
    });
  }
}

// export default POST;

// export async function POST(req: NextApiRequest, res: NextApiResponse) {
//  // Parse the request body
//   const body = req.body;
//   let email: string | null = null;
//   let secret: string | null = null;
//   debugger;
//     if (typeof body === 'string') {
//     try {
//       const jsonBody = JSON.parse(body);
//       email = jsonBody.email;
//       secret = jsonBody.secret;
//     } catch (error) {
//       return res.status(400).json({ message: 'Invalid JSON body' });
//     }
//   }
//   // const { email, secret } = req.body;
//   // 1
//   if (req.method !== 'POST') {
//     return NextResponse.json({ message: 'Method not allowed' });
//   }
//   // 2
//   if (secret !== process.env.AUTH0_HOOK_SECRET) {
//     return NextResponse.json({ message: `You must provide the secret` });
//   }
//   // 3
//   if (email) {
//     // 4
//     await prisma.user.create({
//       data: { email },
//     });
//     return NextResponse.json({
//       message: `User with email: ${email} has been created successfully!`,
//     });
//   }
// };

// export default POST;
