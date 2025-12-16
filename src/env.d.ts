/// <reference types="astro/client" />

// Allow importing .svelte components from TypeScript files
declare module "*.svelte" {
  import { SvelteComponentTyped } from "svelte";
  export default SvelteComponentTyped<any, any, any>;
}
