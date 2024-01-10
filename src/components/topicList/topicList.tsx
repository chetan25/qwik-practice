import { component$ } from "@builder.io/qwik";
import { QList } from "~/components/react/list/list";
import { useGetTopics } from "~/routes";

const TopicList = component$(() => {
  const topics = useGetTopics();

  console.log(topics.value, "topics");
  if (topics.value.length === 0) {
    return <h2 class="mb-12">No Topics Added Yet</h2>;
  }

  return (
    <div class="flow-root">
      <h2 class="mb-12">Top rated topics</h2>
      <QList items={topics.value} />
      {/* <ul role="list" class="-my-8 divide-y divide-gray-200">
        {topics.value.map((topic) => {
          return (
            <li class="flex py-10" key={topic.id}>
              <div class="ml-4 flex flex-1 flex-col">
                <div>
                  <div class="flex justify-between text-base font-medium text-gray-900">
                    <h3>
                     
                    </h3>
                  </div>
                </div>
                <div class="flex flex-1 items-end justify-between text-sm"></div>
              </div>
            </li>
          );
        })}
      </ul> */}
    </div>
  );
});

export default TopicList;
