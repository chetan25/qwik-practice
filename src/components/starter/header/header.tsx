import { component$ } from "@builder.io/qwik";
// import { QwikLogo } from "../icons/qwik";
// import { v4 as uuidv4 } from "uuid";
// import { isServer } from "@builder.io/qwik/build";

import {
  useAuthSignin,
  useAuthSession,
  useAuthSignout,
} from "~/routes/plugin@auth";

import styles from "./header.module.css";
import Button from "~/components/button/button";
// import { db } from "~/db";

export default component$(() => {
  const signIn = useAuthSignin();
  const session = useAuthSession();
  const signOut = useAuthSignout();

  // useTask$(async () => {
  //   if (isServer) {
  //     if (session.value?.user?.email) {
  //       const dbUser = await db.user.findFirst({
  //         where: {
  //           email: session.value.user.email,
  //         },
  //       });
  //       if (!dbUser) {
  //         await db.user.create({
  //           data: {
  //             ...session.value.user,
  //             id: uuidv4(),
  //           },
  //         });
  //       }
  //     }
  //   }
  // });

  return (
    <header class={styles.header}>
      <div class={["container", styles.wrapper]}>
        <div class={styles.logo}>
          <a href="/" title="qwik">
            {session.value?.user?.name}
          </a>
        </div>
        {session.value?.user?.name ? (
          <Button message="Sign Out" formAction={signOut} />
        ) : (
          <Button message="Sign In" formAction={signIn} />
        )}
      </div>
    </header>
  );
});
