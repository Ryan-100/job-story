import apiSlice from "@/controller/apiSlice";
import queryString from "query-string";

export const CompanySlice = apiSlice.injectEndpoints({
    endpoints(builder) {
        return {
            fetchCompanyById: builder.query({
                query(params) {
                    return {
                        url: `/company/${params.id}?${queryString.stringify(
                            params.params
                        )}`,
                        headers: {
                            Authorization: `Bearer ${params.token ? params.token : ""}`,
                        },
                    };
                },
            }),
            fetchCompanies: builder.query({
                query(params) {
                    return {
                        url: `/company?${queryString.stringify(params.query)}`,
                        headers: {
                            Authorization: `Bearer ${params.token ? params.token : ""}`,
                        },
                    }
                }
            })
        };
    },
});

export const {useFetchCompanyByIdQuery, useFetchCompaniesQuery} = CompanySlice;
