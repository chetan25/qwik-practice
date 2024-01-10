import { component$ } from "@builder.io/qwik";
// import type { RequestHandler } from "@builder.io/qwik-city";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import AddModal from "~/components/modal/add-modal";
import { db } from "~/db";
// import { useAuthSession } from "~/routes/plugin@auth";
import { useCreatePost } from "~/actions/addPost";
import PostList from "~/components/postList/postlist";
export { useCreatePost } from "~/actions/addPost";

export const useGetPostBySlug = routeLoader$(async ({ params }) => {
  const slug = params["slug"];
  console.log(slug, "slugslug");
  const posts = await db.post.findMany({
    where: {
      topic: { slug },
    },
    include: {
      topic: {
        select: {
          slug: true,
        },
      },
      user: {
        select: { name: true },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });

  return posts;
});

// export const onGet: RequestHandler = async (requestEvent) => {
//   // console.log(
//   //   "coo",
//   //   requestEvent.cookie.get("next-auth.session-token")?.value.toString(),
//   // );
//   // const sessionToken = requestEvent.cookie.get("next-auth.session-token")
//   // ?.value;
//   // const response = await fetch("/api/auth/session");
//   // const sessionData = await response.json();
//   // console.log(sessionData, "sessionData");
//   const { sharedMap, next } = requestEvent;
//   const session = sharedMap.get("session");

//   const dbUser = await db.user.findUnique({
//     where: {
//       email: session.user.email,
//     },
//   });

//   if (dbUser) {
//     sharedMap.set("session", {
//       ...session,
//       user: {
//         ...session.user,
//         id: dbUser.id,
//       },
//     });
//   }

//   await next();
// };

export const useGetTopic = routeLoader$(
  async ({ params, status, sharedMap }) => {
    console.log(sharedMap.get("session").user, "getTopic");
    const slug = params["slug"];
    const topic = await db.topic.findUnique({
      where: { slug: slug },
    });
    if (!topic) {
      // Set the status to 404 if the user is not found
      status(404);
    }
    return topic;
  },
);

export default component$(() => {
  const topic = useGetTopic();
  //createComment.bind(null, { postId, parentId })
  const action = useCreatePost();
  // const session = useAuthSession();

  return (
    <section>
      <div class="ml-6">
        <Link href="/">Back</Link>
      </div>
      <h1>Topic Details</h1>
      {topic.value ? (
        <div class="m-14">
          <h3>Title: {topic.value.slug}</h3>
          <p class="text-bold mt-4 text-2xl">
            Description: {topic.value.description}
          </p>
        </div>
      ) : (
        <p>Topic Not Found</p>
      )}
      <div class="text-center"></div>
      <AddModal headerText="Add Post" formAction={action} />

      <h2 class="m-10">Posts for the Topic</h2>
      <PostList />
    </section>
  );
});
