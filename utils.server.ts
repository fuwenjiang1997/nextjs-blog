// import nc from 'next-connect'
// import { NextApiRequest, NextApiResponse } from 'next'

import { PrismaClient } from '@prisma/client'

export const prisma: PrismaClient = (global as any).prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') (global as any).prisma = prisma

// import * as Boom from '@prisma/client'

// export const apiHandler = () =>
//   nc<NextApiRequest, NextApiResponse>({
//     onError(err, req, res) {
//       if (Boom.isBoom(err)) {
//         console.log(err);
//         res.status(err.output.payload.statusCode);
//         res.json({
//           error: err.output.payload.error,
//           message: err.output.payload.message,
//         });
//       } else {
//         res.status(500);
//         res.json({
//           message: "Unexpected error",
//         });
//         console.error(err);
//         // unexcepted error
//       }
//     },
//   });
