/* eslint-disable @typescript-eslint/no-unused-vars */
const myName = 'David';
const myAge = 12;

const suma = (a: number, b: number) => {
  return a + b;
};
suma(12, 34);
class Persona {
  constructor(private age: number, private name: string) {}

  getSumary() {
    return `My name is ${this.name} and I am ${this.age}`;
  }
}

const david = new Persona(20, 'David');

david.getSumary();
