import {configureStore} from '@reduxjs/toolkit';
import userLoginReducer from '../slices/loginSlice';
import productsReducer from '../slices/productSlice';
import productDetailsReducer from '../slices/productDetailSlice.';
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

const store = configureStore({
  reducer: {
    userLogin: userLoginReducer,
    products: productsReducer,
    productDetails: productDetailsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Needed for handling  actions related to redux persists
      },
    }),
});
const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Export the store and persistor
export {store, persistor};
