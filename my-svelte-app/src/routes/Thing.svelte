<script>
    const emojis = {
        apple: '🍎',
        banana: '🍌',
        carrot: '🥕',
        doughnut: '🍩',
        egg: '🥚'
    };

    let { name } = $props();

    // FIX: reactive derived value (updates when name changes)
    let emoji = $derived(emojis[name]);
</script>

<p>{emoji} = {name}</p>