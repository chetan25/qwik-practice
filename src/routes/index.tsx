import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import Hero from "~/components/starter/hero/hero";
import { db } from "~/db";

export const useGetTopics = routeLoader$(async () => {
  const topics = await db.topic.findMany({
    orderBy: [
      {
        posts: {
          _count: "desc",
        },
      },
    ],
    include: {
      _count: {
        select: {
          posts: true,
        },
      },
    },
    take: 5,
  });
  console.log(topics);
  return topics;
});

export default component$(() => {
  return <Hero />;
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
