import {
  component$,
  useSignal,
  // useTask$,
  // useVisibleTask$,
} from "@builder.io/qwik";
// import { isBrowser, isServer } from "@builder.io/qwik/build";
import { useAuthSession } from "~/routes/plugin@auth";
import styles from "./hero.module.css";
import ImgThunder from "~/media/thunder.png?jsx";
import AddModal from "~/components/modal/add-modal";
import TopicList from "~/components/topicList/topicList";
import { useCreateTopic } from "~/actions/addTopic";
import { QGreetings } from "~/components/react/Card/card";

export default component$(() => {
  const action = useCreateTopic();
  const session = useAuthSession();
  const userName = useSignal(session.value?.user?.name);

  // const displayConfetti = $(async () => {
  //   console.log("geeee");
  //   const defaults = {
  //     spread: 360,
  //     ticks: 70,
  //     gravity: 0,
  //     decay: 0.95,
  //     startVelocity: 30,
  //     colors: ["006ce9", "ac7ff4", "18b6f6", "713fc2", "ffffff"],
  //     origin: {
  //       x: 0.5,
  //       y: 0.35,
  //     },
  //   };

  //   function loadConfetti() {
  //     return new Promise<(opts: any) => void>((resolve, reject) => {
  //       if ((globalThis as any).confetti) {
  //         return resolve((globalThis as any).confetti as any);
  //       }
  //       const script = document.createElement("script");
  //       script.src =
  //         "https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js";
  //       script.onload = () => resolve((globalThis as any).confetti as any);
  //       script.onerror = reject;
  //       document.head.appendChild(script);
  //       script.remove();
  //     });
  //   }

  //   const confetti = await loadConfetti();

  //   function shoot() {
  //     confetti({
  //       ...defaults,
  //       particleCount: 80,
  //       scalar: 1.2,
  //     });

  //     confetti({
  //       ...defaults,
  //       particleCount: 60,
  //       scalar: 0.75,
  //     });
  //   }

  //   setTimeout(shoot, 0);
  //   setTimeout(shoot, 100);
  //   setTimeout(shoot, 200);
  //   setTimeout(shoot, 300);
  //   setTimeout(shoot, 400);
  // });

  // eslint-disable-next-line qwik/no-use-visible-task
  // useVisibleTask$(({ track }) => {
  //   track(() => userName.value);
  //   if (session.value?.user?.name) {
  //     // displayConfetti();
  //   }
  // });

  // useTask$(({ track }) => {
  //   track(() => userName.value);

  //   if (isBrowser && userName.value) {
  //     displayConfetti();
  //   }
  // });
  // console.log(isBrowser, "isBrowser");
  // console.log(isServer, "isServer");

  return (
    <div class={["container", styles.hero]}>
      <ImgThunder class={styles["hero-image"]} />
      <h1 class="mt-10 text-4xl">
        {userName.value ? (
          <>
            Volla!!! Welcome <span class="highlight">{userName}</span>
            <br />
            <span class="highlight">Let's Celebrate</span>
          </>
        ) : (
          <>
            Hello!!! <span class="highlight">Sign In</span>
            <br />
            to add Topics <span class="highlight"></span>
          </>
        )}
      </h1>
      <div class={styles["button-group"]}>
        {/* <button
          onClick$={async () => {
            const defaults = {
              spread: 360,
              ticks: 70,
              gravity: 0,
              decay: 0.95,
              startVelocity: 30,
              colors: ["006ce9", "ac7ff4", "18b6f6", "713fc2", "ffffff"],
              origin: {
                x: 0.5,
                y: 0.35,
              },
            };

            function loadConfetti() {
              return new Promise<(opts: any) => void>((resolve, reject) => {
                if ((globalThis as any).confetti) {
                  return resolve((globalThis as any).confetti as any);
                }
                const script = document.createElement("script");
                script.src =
                  "https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js";
                script.onload = () =>
                  resolve((globalThis as any).confetti as any);
                script.onerror = reject;
                document.head.appendChild(script);
                script.remove();
              });
            }

            const confetti = await loadConfetti();

            function shoot() {
              confetti({
                ...defaults,
                particleCount: 80,
                scalar: 1.2,
              });

              confetti({
                ...defaults,
                particleCount: 60,
                scalar: 0.75,
              });
            }

            setTimeout(shoot, 0);
            setTimeout(shoot, 100);
            setTimeout(shoot, 200);
            setTimeout(shoot, 300);
            setTimeout(shoot, 400);
          }}
        >
          Time to celebrate
        </button> */}
        {/* <Link href="/about">About (preferred)</Link> */}
        {/* {session.value?.user?.name ? (
          <button onClick$={() => toggleModal(true)}>Add Topic</button>
        ) : null} */}
      </div>
      <AddModal headerText="Add Topic" formAction={action} />

      <div class="mt-8">
        <TopicList />
      </div>
      {/* <QGreetings /> */}
    </div>
  );
});
