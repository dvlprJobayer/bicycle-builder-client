import { useQuery } from "react-query";
import axiosBicycle from "../api/axiosBicycle";

const useProducts = () => {
    const { data: products, isLoading, refetch } = useQuery('products', () => axiosBicycle('/products'));
    return { products, isLoading, refetch };
}

export default useProducts;