<script lang="ts">
    import { writable } from 'svelte/store';

    type Product = {
        id: number;
        name: string;
        price: number;
    };

    function createCart() {
        const { subscribe, update, set } = writable<Product[]>([]);

        return {
            subscribe,

            add(product: Product) {
                update(items => [...items, product]);
            },

            remove(id: number) {
                update(items => items.filter(p => p.id !== id));
            },

            clear() {
                set([]);
            }
        };
    }

    export const cart = createCart();
</script>