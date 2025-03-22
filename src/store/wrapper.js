import { createWrapper } from "next-redux-wrapper";
import store from ".";

export const wrapper = createWrapper(store, { debug: true });
