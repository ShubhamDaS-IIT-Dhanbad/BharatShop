// productContext.jsx 
import axios from "axios";
const API = "https://api.pujakaitem.com/api/products";
export const featuredProduct = () => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(API);
                dispatch({
                    type: "FEATURED_PRODUCT_SUCCESS",
                    payload: res
                });
            } catch (error) {
                console.error("Error fetching products:", error);
                dispatch({
                    type: "FEATURED_PRODUCT_FAIL" ,
                    payload:error
                });
            }
        };fetchData();
    }, []);
};







