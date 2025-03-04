import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    /** Usually this field is required, but these is no common (Restful) API used so I left it empty */
    // baseUrl: "/api",
  }),
  endpoints: () => ({}),
});
