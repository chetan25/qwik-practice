import { globalAction$, zod$, z } from "@builder.io/qwik-city";
import { db } from "~/db";

export type TypeCreateTopic = Awaited<ReturnType<typeof useCreateTopic>>;

export const useCreateTopic = globalAction$(
  async (data, requestEvent) => {
    if (!requestEvent.sharedMap.get("session").user?.name) {
      return requestEvent.fail(401, {
        errorMessage: "Must be Signed In",
      });
    }

    // console.log(requestEvent.sharedMap.get("session").user, "user");
    const topic = await db.topic.create({
      data: {
        slug: data.name,
        description: data.description,
      },
    });
    return topic;
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
