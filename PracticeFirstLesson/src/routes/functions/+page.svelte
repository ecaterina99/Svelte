<script lang="ts">

    import {Student} from "$lib/Cart";

    const sum = (a:number, b:number):number => a+b;
    let result = sum(3.2, 4.2);
    console.log(result)

    function calculator (a:number, b:number):number{
        return a*b;
    }
    console.log(calculator(2,4));

    const student = new Student("Anna", 25);
    console.log(student.toString());

</script>