import { initTRPC } from '@trpc/server';
import type { OnboardDataAccess } from './data-access.js';
import {
  createSchoolSchema,
  deleteSchoolSchema,
  getStudentsSchema,
  createStudentSchema,
  deleteStudentSchema,
} from './schemas.js';

export type Context = {
  dataAccess: OnboardDataAccess;
};

const t = initTRPC.context<Context>().create({ allowOutsideOfServer: true });

const publicProcedure = t.procedure;
const router = t.router;

export const onboardRouter = router({
  schools: router({
    list: publicProcedure.query(({ ctx }) => {
      return ctx.dataAccess.getSchools();
    }),

    create: publicProcedure
      .input(createSchoolSchema)
      .mutation(({ ctx, input }) => {
        return ctx.dataAccess.createSchool(input);
      }),

    delete: publicProcedure
      .input(deleteSchoolSchema)
      .mutation(({ ctx, input }) => {
        return ctx.dataAccess.deleteSchool(input.id);
      }),
  }),

  students: router({
    list: publicProcedure.input(getStudentsSchema).query(({ ctx, input }) => {
      return ctx.dataAccess.getStudents(input.schoolId);
    }),

    create: publicProcedure
      .input(createStudentSchema)
      .mutation(({ ctx, input }) => {
        return ctx.dataAccess.createStudent(input);
      }),

    delete: publicProcedure
      .input(deleteStudentSchema)
      .mutation(({ ctx, input }) => {
        return ctx.dataAccess.deleteStudent(input.id);
      }),
  }),
});

export type OnboardRouter = typeof onboardRouter;
