import { globalAction$, zod$, z } from "@builder.io/qwik-city";
import { db } from "~/db";

export type TypeCreatePost = Awaited<ReturnType<typeof useCreatePost>>;

export const useCreatePost = globalAction$(
  async (data, requestEvent) => {
    const { slug } = requestEvent.params;
    const user = requestEvent.sharedMap.get("session").user;
    console.log(user, "This is logged in user");
    const dbUser = await db.user.findUnique({
      where: {
        email: user.email,
      },
    });
    if (!dbUser) {
      return requestEvent.fail(401, {
        errorMessage: "Must be Signed In",
      });
    }

    const topic = await db.topic.findFirst({
      where: {
        slug: slug,
      },
    });

    if (!topic) {
      return requestEvent.fail(404, {
        errorMessage: "Bad Request, Topic does not exist",
      });
    }

    const post = await db.post.create({
      data: {
        title: data.name,
        content: data.description,
        userId: dbUser.id,
        topicId: topic.id,
      },
    });

    return post;
  },
  zod$({
    name: z
      .string()
      .min(3)
      .regex(/[a-z-]/, {
        message: "Must be lower case or dashes without space",
      }),
    description: z.string().min(10),
  }),
);
