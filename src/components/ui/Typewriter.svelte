<script lang="ts">
    /**
     * Typewriter: progressively reveals text with a blinking/fading cursor.
     *
     * @remarks
     * - Emits `done` when the full string is rendered.
     * - `cursorFadeDelay` controls when the cursor fades after finishing.
     * - Keep animations lightweight; junior devs can tweak timing via the props without touching logic.
     */
    import { onDestroy, onMount } from "svelte";
    import { createEventDispatcher } from "svelte";

    export let text: string = "";
    export let speed: number = 40;
    export let startDelay: number = 0;
    export let showCursor: boolean = true;
    export let cursorFadeDelay: number = 1500;

    let visible = "";
    let fadeCursor = false;
    let fadeTimer: ReturnType<typeof setTimeout> | null = null;
    const dispatch = createEventDispatcher();

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    onMount(async () => {
        if (startDelay) await sleep(startDelay);
        for (let i = 1; i <= text.length; i++) {
            visible = text.slice(0, i);
            await sleep(speed);
        }
        dispatch("done");
        // Junior note: change cursorFadeDelay if you want the cursor to linger longer after typing ends.
        fadeTimer = setTimeout(() => {
            fadeCursor = true;
        }, cursorFadeDelay);
    });

    onDestroy(() => {
        if (fadeTimer) clearTimeout(fadeTimer);
    });
</script>

<span class="typewriter" aria-live="polite">
    {@html visible.replace(/\n/g, "<br />")}
    {#if showCursor}
        <span
            class="cursor"
            class:fade={fadeCursor}
            aria-hidden="true"
            style={`--cursor-fade-delay:${cursorFadeDelay}ms`}
        ></span>
    {/if}
</span>

<style>
    .typewriter {
        white-space: pre-wrap;
    }
    .cursor {
        display: inline-block;
        width: 1px;
        height: 1em;
        margin-left: 4px;
        background: currentColor;
        animation: blink 1s steps(1) infinite;
        vertical-align: middle;
    }
    .cursor.fade {
        animation:
            blink 1s steps(1) infinite,
            fadeout 0.8s ease forwards;
        animation-delay: 0s, var(--cursor-fade-delay, 1500ms);
    }

    @keyframes blink {
        50% {
            opacity: 0;
        }
    }

    @keyframes fadeout {
        to {
            opacity: 0;
        }
    }
</style>
