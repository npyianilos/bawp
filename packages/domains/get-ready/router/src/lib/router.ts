import { initTRPC } from '@trpc/server';
import type { GetReadyDataAccess } from './data-access.js';
import {
  searchStudentsSchema,
  createSessionSchema,
  listSessionsSchema,
  addStudentToSessionSchema,
  getSessionStudentsSchema,
} from './schemas.js';

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

  sessions: router({
    create: publicProcedure
      .input(createSessionSchema)
      .mutation(({ ctx, input }) => {
        return ctx.dataAccess.createSession(input);
      }),

    list: publicProcedure.input(listSessionsSchema).query(({ ctx, input }) => {
      return ctx.dataAccess.listSessions(input);
    }),

    addStudent: publicProcedure
      .input(addStudentToSessionSchema)
      .mutation(({ ctx, input }) => {
        return ctx.dataAccess.addStudentToSession(input);
      }),

    listStudents: publicProcedure
      .input(getSessionStudentsSchema)
      .query(({ ctx, input }) => {
        return ctx.dataAccess.getSessionStudents(input);
      }),
  }),
});

export type GetReadyRouter = typeof getReadyRouter;
