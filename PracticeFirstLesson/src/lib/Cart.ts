export class Student {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    toString(): string {
        return `Student(name=${this.name}, age=${this.age})`;
    }
}
