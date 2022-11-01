export const client = Deno.dlopen("libwayland-client.so", {
  wl_display_connect: {
    parameters: ["buffer"],
    result: "pointer",
  },
  wl_display_disconnect: {
    parameters: ["pointer"],
    result: "void",
  },
  wl_display_get_fd: {
    parameters: ["pointer"],
    result: "pointer",
  },
  wl_display_dispatch: {
    parameters: ["pointer"],
    result: "i32",
  },
  wl_display_dispatch_queue: {
    parameters: ["pointer", "pointer"],
    result: "i32",
  },
  wl_display_dispatch_queue_pending: {
    parameters: ["pointer", "pointer"],
    result: "i32",
  },
  wl_display_dispatch_pending: {
    parameters: ["pointer"],
    result: "i32",
  },
  wl_event_queue_destroy: {
    parameters: ["pointer"],
    result: "void",
  },
  wl_display_create_queue: {
    parameters: ["pointer"],
    result: "pointer",
  },
  wl_display_get_error: {
    parameters: ["pointer"],
    result: "i32",
  },
  wl_display_roundtrip: {
    parameters: ["pointer"],
    result: "i32",
  },
  wl_display_roundtrip_queue: {
    parameters: ["pointer", "pointer"],
    result: "i32",
  },
  wl_display_prepare_read: {
    parameters: ["pointer"],
    result: "i32",
  },
  wl_display_prepare_read_queue: {
    parameters: ["pointer", "pointer"],
    result: "i32",
  },
  wl_display_flush: {
    parameters: ["pointer"],
    result: "i32",
  },
  wl_display_read_events: {
    parameters: ["pointer"],
    result: "i32",
  },
});

export const cursor = Deno.dlopen("libwayland-cursor.so", {});
export const server = Deno.dlopen("libwayland-server.so", {});
export const egl = Deno.dlopen("libwayland-egl.so", {});
