import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponse } from "../type";

export const qnaApi = createApi({
  reducerPath: "qna",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://opentdb.com/api.php?amount=1",
  }),
  endpoints: (builder) => ({
    getQuestions: builder.query<ApiResponse, void>({
      query: () => "",
    }),
  }),
});

export const { useGetQuestionsQuery } = qnaApi;
