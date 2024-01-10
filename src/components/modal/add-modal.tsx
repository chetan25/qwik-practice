// import type { PropFunction } from "@builder.io/qwik";
import { $, component$, useStore } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import styles from "./add-modal.module.css";
import { useAuthSession } from "~/routes/plugin@auth";
// import type { TypeCreateTopic } from "~/actions/addTopic";
// import type { TypeCreatePost } from "~/actions/addPost";

type AddModalProps = {
  headerText: string;
  formAction: any;
};

const AddModal = component$(({ headerText, formAction }: AddModalProps) => {
  const session = useAuthSession();
  const state = useStore({
    showModal: false,
  });

  const toggleModal = $(() => {
    console.log("sssasa");
    state.showModal = !state.showModal;
  });

  return (
    <div>
      <div class={styles["button-group"]}>
        {session.value?.user?.name ? (
          <button onClick$={toggleModal}>Add Topic</button>
        ) : null}
      </div>
      {state.showModal ? (
        <div
          class="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <Form action={formAction} onSubmitCompleted$={toggleModal} spaReset>
            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div class="bg-white px-4  pt-5 sm:p-6 sm:pb-4">
                    <h1 class="text-xl font-semibold text-gray-900">
                      {headerText}
                    </h1>
                  </div>
                  <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div class="sm:flex sm:items-start">
                      <div class="grid w-full">
                        <div class="sm:col-span-3">
                          <label
                            for="name"
                            class="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Title
                          </label>
                          <div class="mt-2">
                            <input
                              type="text"
                              name="name"
                              id="name"
                              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div class="sm:col-span-3">
                          <label
                            for="description"
                            class="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Description
                          </label>
                          <div class="mt-2">
                            <textarea
                              name="description"
                              id="description"
                              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="submit"
                      class="inline-flex w-full justify-center rounded-md bg-blue-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick$={toggleModal}
                      class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </div>
      ) : null}
    </div>
  );
});

export default AddModal;
