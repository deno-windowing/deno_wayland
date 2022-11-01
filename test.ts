import { Display } from "./client/mod.ts";


// let compositor!: Deno.PointerValue;

const display = new Display();
const fd = display.getFd();
// const registry = Display.getRegistry(display);
// Display.disconnect(display);
console.log(display.ptr)
console.log(fd);
// console.log(registry)
