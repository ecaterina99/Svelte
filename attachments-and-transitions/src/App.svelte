<script>
    import Canvas from './Canvas.svelte';
    import { trapFocus } from './attachments.svelte.js';

    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'white', 'black'];

    let selected = $state(colors[0]);
    let size = $state(10);
    let showMenu = $state(true);

    import tippy from 'tippy.js';

    let content = $state('Hello!');

    function tooltip(content) {
        return (node) => {
        const tooltip = tippy(node, { content });
        return tooltip.destroy;
    };
    }

    import InputComponent from "./components/InputComponent.svelte";
    import { fly } from 'svelte/transition';
    let visible = $state(true);


    import { fade } from 'svelte/transition';
    import { elasticOut } from 'svelte/easing';

    function spin(node, { duration }) {
        return {
            duration,
            css: (t, u) => {
                const eased = elasticOut(t);

                return `
					transform: scale(${eased}) rotate(${eased * 1080}deg);
					color: hsl(
						${Math.trunc(t * 360)},
						${Math.min(100, 1000 * u)}%,
						${Math.min(50, 500 * u)}%
					);`
            }
        };
    }

    let vis = $state(false);

    function typewriter(node, { speed = 1 }) {
        const valid = node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE;

        if (!valid) {
            throw new Error(`This transition only works on elements with a single text node child`);
        }

        const text = node.textContent;
        const duration = text.length / (speed * 0.01);

        return {
            duration,
            tick: (t) => {
                const i = Math.trunc(text.length * t);
                node.textContent = text.slice(0, i);
            }
        };
    }
</script>



<div class="container">
    <Canvas color={selected} size={size} />
    {#if showMenu}
        <div
                role="presentation"
                class="modal-background"
                onclick={(event) => {
            if (event.target === event.currentTarget) {
                showMenu = false;
            }
        }}
                onkeydown={(e) => {
            if (e.key === 'Escape') {
                showMenu = false;
            }
        }}
        >
            <div class="menu" {@attach trapFocus}>

                <input bind:value={content} />

                <button {@attach tooltip(content)}>
                    Hover me
                </button>

                <div class="colors">
                    {#each colors as color}
                        <button
                                class="color"
                                aria-label={color}
                                aria-current={selected === color}
                                style="--color: {color}"
                                onclick={() => selected = color}
                        ></button>
                    {/each}
                </div>

                <label>
                    small
                    <input type="range" bind:value={size} min="1" max="50" />
                    large
                </label>
                <InputComponent/>
                <label>
                    <input type="checkbox" bind:checked={vis} />
                    vis
                </label>

                {#if vis}
                    <p transition:typewriter>
                        The quick brown fox jumps over the lazy dog
                    </p>
                {/if}
                <label>
                    <input type="checkbox" bind:checked={visible} />
                    visible
                </label>

                {#if visible}

                    <p transition:fly={{ y: 200, duration: 2000 }}>
                        Flies in and out
                    </p>
                {/if}

                <label>
                    <input type="checkbox" bind:checked={visible} />
                    visible
                </label>

                {#if visible}
                    <div
                            class="centered"
                            in:spin={{ duration: 8000 }}
                            out:fade
                    >
                        <span>transitions!</span>
                    </div>
                {/if}


            </div>
        </div>
    {/if}

    <div class="controls">
        <button class="show-menu" onclick={() => showMenu = !showMenu}>
            {showMenu ? 'close' : 'menu'}
        </button>
    </div>
</div>

<style>
    .centered {
        position: absolute;
        left: 50%;
        top: 120%;
        transform: translate(-50%, -50%);
    }

    span {
        position: absolute;
        transform: translate(-50%, -50%);
        font-size: 4em;
    }

    .container {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }

    .controls {
        position: absolute;
        left: 0;
        top: 0;
        padding: 1em;
    }

    .show-menu {
        width: 5em;
    }

    .modal-background {
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        backdrop-filter: blur(20px);
    }

    .menu {
        position: relative;
        background: var(--bg-2);
        width: calc(100% - 2em);
        max-width: 28em;
        padding: 1em 1em 0.5em 1em;
        border-radius: 1em;
        box-sizing: border-box;
        user-select: none;
    }

    .colors {
        display: grid;
        align-items: center;
        grid-template-columns: repeat(9, 1fr);
        grid-gap: 0.5em;
    }

    .color {
        aspect-ratio: 1;
        border-radius: 50%;
        background: var(--color, #fff);
        transform: none;
        filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.2));
        transition: all 0.1s;
    }

    .color[aria-current="true"] {
        transform: translate(1px, 1px);
        filter: none;
        box-shadow: inset 3px 3px 4px rgba(0,0,0,0.2);
    }

    .menu label {
        display: flex;
        width: 100%;
        margin: 1em 0 0 0;
    }

    .menu input {
        flex: 1;
    }

     :global {
         [data-tippy-root] {
             --bg: #666;
             background-color: var(--bg);
             color: white;
             border-radius: 0.2rem;
             padding: 0.2rem 0.6rem;
             filter: drop-shadow(1px 1px 3px rgb(0 0 0 / 0.1));

             * {
                 transition: none;
             }
         }

         [data-tippy-root]::before {
             --size: 0.4rem;
             content: '';
             position: absolute;
             left: calc(50% - var(--size));
             top: calc(-2 * var(--size) + 1px);
             border: var(--size) solid transparent;
             border-bottom-color: var(--bg);
         }
     }
</style>
