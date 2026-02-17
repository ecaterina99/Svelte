<script>
    let name = "Ecaterina";

    let src = '/1.jpg';

    import Nested from './Nested.svelte';

    let string = `this string contains some <strong>HTML!!!</strong>`;

    let count = $state(0);
    function increment() {
        count += 1;
    }

    let numbers = $state([1, 2, 3, 4]);
    function addNumber() {
        numbers.push(numbers.length+1);
    }

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
<p>{numbers.join(' + ')} = ...</p>

<button onclick={addNumber}>
    Add a number
</button>

<style>
    p{
        color: goldenrod;
        font-family: 'Comic Sans MS', cursive;
        font-size: 2em;
    }
</style>
