import { writable } from "svelte/store";

export const username_when_logged_in = writable('');
export const check_if_admin = writable('-1');