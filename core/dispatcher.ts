export class Dispatcher {
  // deno-lint-ignore no-explicit-any
  names: Map<Deno.PointerValue, any> = new Map();
  callback: (Deno.UnsafeCallback | undefined)[];
  // deno-lint-ignore no-explicit-any
  constructor(messages: any[]) {
    for (let i = 0; i < messages.length; i++) {
      this.names.set(messages[i].name, i);
    }
    this.callback = new Array(messages.length);
  }

  get(key: string | number) {
    return this.callback[typeof key == "string" ? this.names.get(BigInt(key)) : key];
  }

  set(key: string | number, value: Deno.UnsafeCallback) {
    this.callback[typeof key == "string" ? this.names.get(BigInt(key)) : key] = value;
  }
}
