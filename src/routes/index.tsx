import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import Plates from "~/components/plates";
import ModeToggle from "~/components/modeToggle";
import Header from "~/components/header";

export default component$(() => {
  return (
    <div>
      <ModeToggle />
      <Header />
      <Plates />
    </div>
  );
});

export const head: DocumentHead = {
  title: "Gradients, Collection of gradients",
  meta: [
    {
      name: "description",
      content:
        "Gradients, Website that includes a lot of nice gradients that will help you in your next project",
    },
  ],
};
