<script lang="ts">

    import {Student} from "$lib/Cart";
    import { derived , writable} from 'svelte/store';

    const cnt = writable(0);
    const doubled = derived(cnt, $cnt => $cnt * 2);

    const sum = (a:number, b:number):number => a+b;
    let result = sum(3.2, 4.2);
    console.log(result)

    function calculator (a:number, b:number):number{
        return a*b;
    }
    console.log(calculator(2,4));

    const student = new Student("Anna", 25);
    console.log(student.toString());

    let count : number = 0;
    const increment= () : void => {
        count++;
    }
</script>


<button on:click={increment}>
    Click me
</button>

<button on:click={() => cnt.update(n => n + 5)}>
    Click me
</button>

<p>Cnt: {$cnt}</p>
<p>Doubled: {$doubled}</p>
<p>Count: {count}</p>