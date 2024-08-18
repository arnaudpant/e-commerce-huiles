import { CategoriesSelection } from "../components/storefront/CategorySelection";
import { FeaturedProducts } from "../components/storefront/FeatureProducts";
import { Hero } from "../components/storefront/Hero";

export default function IndexPage() {
    return (
        <>
            <Hero />
            <CategoriesSelection />
            <FeaturedProducts />
        </>
    );
}
