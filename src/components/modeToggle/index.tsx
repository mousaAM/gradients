import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";

import { Moon, Sun, Github } from "../../svg";

const changeMode = () => {
  if (localStorage.theme === "dark") {
    document.documentElement.classList.remove("dark");
    localStorage.theme = "light";
    return "light";
  } else {
    document.documentElement.classList.add("dark");
    localStorage.theme = "dark";
    return "dark";
  }
};

export default component$(() => {
  const mode = useSignal("light");

  useVisibleTask$(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      mode.value = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      mode.value = "light";
    }
  });
  return (
    <>
      <button
        class="m-4 p-1 flex flex-row rounded-full border-2 border-slate-800 dark:border-white fixed top-0 left-0 z-20 bg-stone-50 dark:bg-slate-900"
        onClick$={() => {
          mode.value = changeMode();
        }}
      >
        <Moon class="w-6 h-6 dark:opacity-0 rotate-0 dark:rotate-180 transition-all duration-300" />
        <Sun class="w-6 h-6 text-amber-50 opacity-0 dark:opacity-100 rotate-180 dark:rotate-0 transition-all duration-300" />
      </button>

      <a href="https://github.com/mousaAM/gradients" target="_blank" class="flex flex-row items-center fixed m-4 rounded-full right-0 top-0 z-20 bg-stone-50 dark:bg-slate-900 border-2 border-slate-900 dark:border-stone-50">
        <p class="mx-2 text-sm">Repo Link</p>
        <Github class="w-8 h-8" />
      </a>
    </>
  );
});
