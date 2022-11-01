export class Message {
    static memory: Map<Deno.PointerValue, Message> = new Map();
    ptr: Deno.PointerValue;
    constructor(func: Deno.UnsafeCallback) {
        this.ptr = func.pointer
    }
}