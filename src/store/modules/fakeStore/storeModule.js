import apiSlice from "@/controller/apiSlice";

export const StoreSlice = apiSlice.injectEndpoints({
  endpoints(builder) {
    return {
      fetchProducts: builder.query({
        providesTags: ["Products"],
        query({ limit }) {
          return `/products?limit=${limit || 10}`;
        },
        transformResponse: (response, meta, arg) => {
          console.log("http request and response infos", meta);
          console.log("args you put when calling this custom", arg);
          return { data: response, dummyResponse: "Hi, i am custom response" };
        },
      }),
      createProduct: builder.mutation({
        invalidatesTags: ["Products"],
        query({ product }) {
          return {
            url: "/products",
            method: "POST",
            body: JSON.stringify(product),
          };
        },
        transformResponse: (response, meta, arg) => {
          return {
            data: response,
            dummyResponse: "Hi, i am custom response for mutation",
          };
        },
      }),
      updateProduct: builder.mutation({
        query({ id, newProduct }) {
          return {
            url: `/products/${id}`,
            method: "PATCH",
            body: JSON.stringify(newProduct),
          };
        },
      }),
      deleteProduct: builder.mutation({
        query({ id }) {
          return {
            url: `/products/${id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

export const {
  useFetchProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = StoreSlice;
