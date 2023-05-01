import { component$ } from "@builder.io/qwik";
import api from "./api.json";

export default component$(() => {
  return <>{JSON.stringify(api)}</>;
});
