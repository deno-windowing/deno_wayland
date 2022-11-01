import { client } from "./core/lib.ts";

export function eventQueueDestroy(
  display: Deno.PointerValue | undefined,
  data: Deno.PointerValue,
) {
  if (!display) throw new Error("display instance not found");
  client.symbols.wl_event_queue_destroy(data);
}