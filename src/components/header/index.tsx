import { component$ } from "@builder.io/qwik"

export default component$(() => {
  return (
    <header class="text-center mt-24 mb-8">
      <h1
        class="sm:text-6xl text-3xl sm:mb-4 mb-2 font-medium"
        style="
          background: linear-gradient(#4776E6, #8E54E9);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        "
        >
        Gradients
      </h1>

      <p class="sm:text-xl text-base">
        Collection of awesome background gradients for your next project
      </p>
    </header>
  )
})
