import { EventQueue } from "./eventQueue.ts";
import { client } from "../core/lib.ts";

export class Display {
  #ptr?: Deno.PointerValue;
  children: EventQueue[] = [];
  constructor(name: string | null = null) {
    this.#ptr = this.connect(name ? new TextEncoder().encode(name!)! : null);
  }
  // deno-lint-ignore no-explicit-any
  connect(value: any) {
    const ptr = client.symbols.wl_display_connect(value);
    // is null
    if (ptr === 0) {
      throw new Error("Specified display not found");
    }
    return ptr;
  }
  destroy() {
    this.disconnect();
    this.#ptr = undefined;
  }
  disconnect() {
    this.checkPointer();
    return client.symbols.wl_display_disconnect(this.#ptr!);
  }
  getFd() {
    this.checkPointer();
    return client.symbols.wl_display_get_fd(this.#ptr!);
  }
  dispatch(queue?: EventQueue, block = false) {
    this.checkPointer();
    const ret = block
      ? queue
        ? client.symbols.wl_display_dispatch_queue(this.#ptr!, queue.ptr!)
        : client.symbols.wl_display_dispatch(this.#ptr!)
      : queue
      ? client.symbols.wl_display_dispatch_queue_pending(this.#ptr!, queue.ptr!)
      : client.symbols.wl_display_dispatch_pending(this.#ptr!);
    if (ret === -1) {
      throw new Error(
        `Action resulted in Error Code ${
          client.symbols.wl_display_get_error(this.#ptr!)
        }`,
      );
    }
    return ret;
  }
  roundTrip(queue?: EventQueue) {
    this.checkPointer();
    return queue
      ? client.symbols.wl_display_roundtrip_queue(this.#ptr!, queue.ptr!)
      : client.symbols.wl_display_roundtrip(this.#ptr!);
  }
  read(queue?: EventQueue) {
    this.checkPointer();
    while (true) {
      const prepared = queue
        ? client.symbols.wl_display_prepare_read_queue(this.#ptr!, queue.ptr!)
        : client.symbols.wl_display_prepare_read(this.#ptr!);
      if (prepared == 0) break;
      this.dispatch(queue, false);
    }
    const status = client.symbols.wl_display_read_events(this.#ptr!);
    if (status !== 0) {
      throw new Error("Failed to read events");
    }
  }
  flush() {
    this.checkPointer();
    return client.symbols.wl_display_flush(this.#ptr!);
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
