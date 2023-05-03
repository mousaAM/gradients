import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { gradients } from "~/json/gradients";

type Color = {
  name: string;
  colors: string[];
};

const copyToClipboard = (color: string) => {
  navigator.clipboard.writeText(color);

  return true;
};

const search = (colors: Color[], searchQuery: string) => {
  const filteredColors = [...colors].filter((arrayColor: Color) =>
    arrayColor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return filteredColors;
};

export default component$(() => {
  const filteredColors = useSignal(gradients);
  const copied = useSignal(false);

  useTask$(({ track, cleanup }) => {
    track(() => copied.value);

    const debounced = setTimeout(() => {
      copied.value = false;
    }, 1000);

    cleanup(() => clearTimeout(debounced));
  });

  return (
    <>
      <div class="w-full py-2 mb-6 flex justify-center items-center">
        <input
          type="text"
          placeholder="Search for colors"
          onInput$={(event) => {
            filteredColors.value = search(
              gradients,
              (event.target as HTMLInputElement).value
            );
          }}
          class="sm:w-[400px] xs:w-[90%] w-[95%] h-[36px] px-4 outline-none border border-blue-950 dark:border-stone-50 dark:bg-slate-900 dark:caret-stone-50 dark:text-white rounded-full"
        />
      </div>

      <div class="w-full flex flex-wrap flex-row justify-start items-baseline">
        {filteredColors.value.map((value, index) => (
          <div
            key={index}
            class="2xl:basis-[calc(100%/7-1rem)] xl:basis-[calc(100%/6-1rem)] lg:basis-[calc(100%/5-1rem)] md:basis-[calc(100%/4-1rem)] sm:basis-[calc(100%/3-1rem)] xs:basis-[calc(100%/2-1rem)] basis-[calc(100%/1-1rem)] p-2 mx-2 my-4 bg-stone-50 dark:bg-slate-800 rounded-lg shadow"
          >
            <h1 class="text-center dark:text-white mb-2">{value.name}</h1>

            <div
              style={{
                background: `linear-gradient(${value.colors.join(", ")});`,
              }}
              class="relative flex-1 w-full h-[144px] rounded"
            >
              <button
                class="absolute w-full h-full bg-slate-500 text-stone-100 dark:text-slate-800 opacity-0 hover:opacity-100 bg-opacity-0 hover:bg-opacity-30 text-opacity-0 hover:text-opacity-100 text-xl font-bold flex justify-center items-center z-10"
                onClick$={() => {
                  copied.value = copyToClipboard(
                    `background: linear-gradient(${value.colors.join(", ")})`
                  );
                }}
              >
                <p
                  class={`text-sm border-2 rounded ${
                    copied.value
                      ? "border-green-400 dark:border-green-700 hover:bg-green-400 dark:hover:bg-green-700 bg-green-400"
                      : "border-stone-100 dark:border-slate-800 hover:bg-stone-100 dark:hover:bg-slate-800"
                  } px-2 py-1 hover:text-gray-900 dark:hover:text-amber-100 transition-all`}
                >
                  {copied.value ? "Copied" : "Copy CSS"}
                </p>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
});
