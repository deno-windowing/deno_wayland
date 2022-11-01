import { Display } from "./display.ts";
import { client } from "../core/lib.ts";

export class EventQueue {
  #ptr?: Deno.PointerValue;
  #display: Display;
  static memory: Map<Deno.PointerValue, EventQueue> = new Map();
  constructor(display?: Display) {
    if (!display || !display.ptr) throw new Error("display instance not found");
    this.#display = display;
    this.#ptr = client.symbols.wl_display_create_queue(display.ptr);
    display.children.push(this);
    EventQueue.memory.set(this.#ptr, this);
  }

  destroy() {
    this.#ptr = undefined;
  }
  get ptr() {
    this.checkPointer();
    return this.#ptr!;
  }
  checkPointer() {
    if (this.#ptr === undefined) {
      throw new Error("Display not instantiated or destroyed");
    }
  }
}
