<script>
    let name = "Ecaterina";

    let src = '/1.jpg';

    import Nested from './Nested.svelte';
    import PackageInfo from "./PackageInfo.svelte";
    import Counter from './Counter.svelte';

    let string = `this string contains some <strong>HTML!!!</strong>`;

    let count = $state(0);
    function increment() {
        count += 1;
    }

    let numbers = $state([1, 2, 3, 4]);
    //$inspect(numbers);
    $inspect(numbers).with(console.trace)
    let total = $derived(numbers.reduce((total,number)=>total+number,0));
    function addNumber() {
        numbers.push(numbers.length+1);

       // console.log("proxy:", numbers);
       // console.log($state.snapshot(numbers));
    }
    function removeNumber() {
        numbers.pop();
    }

    const pkg = {
        name: 'svelte',
        version: 5,
        description: 'blazing fast',
        website: 'https://svelte.dev'
    };

    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
    let selected = $state(colors[0]);


    import Thing from './Thing.svelte';

    let things = $state([
        { id: 1, name: 'apple' },
        { id: 2, name: 'banana' },
        { id: 3, name: 'carrot' },
        { id: 4, name: 'doughnut' },
        { id: 5, name: 'egg' }
    ]);

    function removeFirst() {
        things.shift();
    }

    function rollDice() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(Math.floor(Math.random() * 6) + 1);
            }, 2000);
        });
    }
    let promise = $state();

    function handleClick() {
        promise = rollDice();
    }

    let m = $state({ x: 0, y: 0 });

    function  onpointermove(event) {
        m = {
            x: event.clientX,
            y: event.clientY
        };
    }


    import Stepper from './Stepper.svelte';
    let value = $state(0);

</script>


<h1>Hello {name.toUpperCase()}!</h1>

<input bind:value={name} />
<img src ={src} alt="blue bear" width="300">

<p> {name} is a java Developer</p>

<Nested/>

<p>{@html string}</p>

<button onclick={increment}>
    Clicked {count}
    {count === 1 ? 'time' : 'times'}
</button>
{#if count>10}
    <p>{count} is greater than 10</p>
    {:else if count<10 && count>0}
    <p>{count} is less than 10</p>
    {:else}
    <p>{count} is less than 1</p>
{/if}
<p>{numbers.join(' + ')} = ...</p>

<button onclick={addNumber}>
    Add a number
</button>

<button onclick={removeNumber}>
    Remove number
</button>
<p>
    Total: {total}
</p>

<Counter />
<Counter />
<Counter />

<Nested answer={42} />
<Nested answer={23} />

<PackageInfo
        {...pkg}
/>

<p>Pick a color</p>
<div>
    {#each colors as color,i}
        <button
                class:selected={selected===color}
                style="background: {color}"
            onclick={()=>selected=color}
           >{i+1}</button>
    {/each}

</div>


<!-- KEYED EACH BLOCK -->
{#each things as thing (thing.id)}
    <Thing name={thing.name} />
{/each}
<button onclick={removeFirst}>
    Remove first thing
</button>


<!--await promise-->
<button onclick={handleClick}>
    Roll dice
</button>

{#await promise}
    <p>Rolling...</p>
{:then number}
    <p>You rolled: {number}</p>
{/await}

<!--DOM event-->
<div class="pointer"
        onpointermove={(event) => {
		m.x = event.clientX;
		m.y = event.clientY;
	}}
>
    The pointer is at {m.x} x {m.y}
</div>

<!--capturing-->
<div onkeydowncapture={(e) => alert(`<div> ${e.key}`)} role="presentation">
    <input onkeydowncapture={(e) => alert(`<input> ${e.key}`)} />
</div>


<p>The current value is {value}</p>

<Stepper
        increment={() => value += 1}
        decrement={() => value -= 1}
/>




<style>
    .pointer {
        color: blue;
    }
    p{
        color: goldenrod;
        font-family: 'Comic Sans MS', cursive;
        font-size: 2em;
    }

    h1 {
        font-size: 2rem;
        font-weight: 700;
        transition: color 0.2s;
    }

    div {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-gap: 5px;
        max-width: 400px;
    }

    .selected {
        border: 4px solid black;
        aspect-ratio: 1;
        border-radius: 50%;
        background: var(--color, #fff);
        transform: translate(-2px,-2px);
        filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.2));
        transition: all 0.1s;
        color: black;
        font-weight: 700;
        font-size: 2rem;
    }

    .selected {
        transform: none;
        filter: none;
        box-shadow: inset 3px 3px 4px rgba(0,0,0,0.2);
    }

</style>

