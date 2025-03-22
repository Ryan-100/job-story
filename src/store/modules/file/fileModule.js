import apiSlice from "@/controller/apiSlice";

export const FileSlice = apiSlice.injectEndpoints({
    endpoints(builder) {
        return {
            fetchFileById: builder.query({
                query(params) {
                    return `/file/${params.id}`;
                },
            }),
            files: builder.mutation({
                query({file, token}) {
                    console.log(file)
                    return {
                        url: "/file",
                        method: "POST",
                        body: file,
                        credentials: 'include',
                        headers: {
                            "content-type": "multipart/form-data",
                            Accept: "application/json",
                            Authorization: "Bearer " + token ?? "",
                        },
                    };
                },
            }),
            multipleResumes:builder.mutation({
                query(files){
                    return{
                        url:'/file/mass-resumes',
                        method:"POST",
                        body:files
                    }
                }
            })
        };
    },
});

export const {useFilesMutation, useFetchFileByIdQuery,useMultipleResumesMutation} = FileSlice;
