<script lang="ts">
    let i: number = 1;

    while (i < 5) {
        console.log(i + " is less than 5")
        i++;
    }

    let numbers: number[] = [];

    for (let i = 1; i < 5; i++) {
        numbers.push(i);
    }
</script>

<ul>
    {#each numbers as number }
        <li>{number}</li>
    {/each}
</ul>