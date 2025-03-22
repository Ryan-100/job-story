import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "./modules/auth/authModule";
import counterReducer from "./modules/counter/counter-slice";
import { BreedSlice } from "./modules/dogs/breedsModule";
import userReducer from "./modules/user/user-slice";
// import { VotesSlice } from "./modules/dogs/votesModule";
import { StoreSlice } from "./modules/fakeStore/storeModule";
import { JobSlice } from "./modules/jobs/jobsModules";
import { FileSlice } from "./modules/file/fileModule";
import { UserSlice } from "./modules/user/userModule";

export default configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    [BreedSlice.reducerPath]: BreedSlice.reducer,
    [JobSlice.reducerPath]: JobSlice.reducer,
    [StoreSlice.reducerPath]: StoreSlice.reducer,
    [AuthSlice.reducerPath]:AuthSlice.reducer,
    [UserSlice.reducerPath]:UserSlice.reducer,
    [FileSlice.reducerPath]:FileSlice.reducer,
    
  },
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([
      JobSlice.middleware,
      StoreSlice.middleware,
      AuthSlice.middleware,
      UserSlice.middleware,
      FileSlice.middleware,
    ]);
  },
});

// export const wrapper = createWrapper(store, { debug: true });
