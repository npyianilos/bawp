import { initTRPC } from '@trpc/server';
import type { GetReadyDataAccess } from './data-access.js';
import { searchStudentsSchema } from './schemas.js';

export type Context = {
  dataAccess: GetReadyDataAccess;
};

const t = initTRPC.context<Context>().create({ allowOutsideOfServer: true });

const publicProcedure = t.procedure;
const router = t.router;

export const getReadyRouter = router({
  searchStudents: publicProcedure
    .input(searchStudentsSchema)
    .query(({ ctx, input }) => {
      return ctx.dataAccess.searchStudents(input);
    }),
});

export type GetReadyRouter = typeof getReadyRouter;
