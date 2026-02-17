<script>
    import { counter } from './shared.svelte.js';
</script>

<button onclick={() => counter.count++}>
    count: {counter.count}
</button>