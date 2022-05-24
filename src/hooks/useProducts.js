import { useQuery } from "react-query";
import axiosBicycle from "../api/axiosBicycle";

const useProducts = () => {
    const { data: products, isLoading } = useQuery('products', () => axiosBicycle('/products'));
    return { products, isLoading };
}

export default useProducts;