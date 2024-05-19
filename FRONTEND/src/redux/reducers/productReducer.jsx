export const productReducer=(state,action)=>{
        switch (action.type) {
            case "FEATURED_PRODUCT_REQUEST":
                return{
                    ...state,
                    isLoading:true,
                    products:[]
                }
            
            case "FEATURED_PRODUCT_SUCCESS":
                const featuredData=action.payload.filter((element)=>{
                    return element;
                })
                return{
                    isLoading:false,
                    products:action.payload,
                }
            
            case "FEATURED_PRODUCT_FAIL":
                return{
                    isLoading:false,
                    error:action.payload
                }
            default:
                return{state}
        }
};