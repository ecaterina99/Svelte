<script lang="ts">
    let name: string;
    name = "Anna";
    let age: number;
    age = 20;

    let names: string[];
    names = ['Ben', 'Maria', 'David'];
    names = [...names, name];
    names.push('Michele')
    names.splice(4, 1, 'Alice');

    let upperCaseNames = names.map(n => n.toUpperCase());

    console.log(names);
    console.log(upperCaseNames);

    type User = {
        name: string;
        active: boolean;
        score: number;
    };

    let persons: User [] = [
        {name: "Ana", active: true, score: 10},
        {name: "Ilon", active: false, score: 8}
    ]

    console.log(persons);

    let namesOnly = persons.map(n=>n.name);
    console.log(namesOnly);

    let activeUsers = persons.filter(n=>n.active);
    console.log(activeUsers);


</script>
<h1>Welcome to SvelteKit</h1>
<p> My name is {name} , I'm {age} years old.</p>
