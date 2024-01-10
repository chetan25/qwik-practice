import { component$ } from "@builder.io/qwik";
import { useGetPostBySlug } from "~/routes/topics/[slug]";

// eslint-disable-next-line qwik/loader-location

const PostList = component$(() => {
  const posts = useGetPostBySlug();

  console.log(posts.value, "posts");
  return (
    <div class="mb-8 flow-root h-max">
      <ul role="list" class="-my-8  divide-y divide-gray-200">
        {posts.value.map((post) => {
          return (
            <li class="py-max mb-3 flex border p-4" key={post.id}>
              <div class="ml-4 flex flex-1 flex-col">
                <div>
                  <div class="flex justify-between text-base font-medium ">
                    <h3>Tilte: {post.title}</h3>
                  </div>
                  <div class="mt-8 flex justify-between text-base font-medium">
                    <h4>Content: {post.content}</h4>
                  </div>
                  <div class="mt-4 flex justify-between text-base font-medium">
                    <h4>Author: {post.user.name}</h4>
                  </div>
                </div>
                <div class="flex flex-1 items-end justify-between text-sm"></div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
});

export default PostList;
