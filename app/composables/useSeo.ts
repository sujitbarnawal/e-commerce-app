export const useSeo=(title:string,description:string)=>{
    useHead({
        title,
        meta:[
            {
                name:"description",
                content:description
            }
        ]
    })
}

