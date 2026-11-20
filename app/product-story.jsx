import PhoneStory from './phone-story';
import TravelShowcase from './travel-showcase';
import { ProductStory } from '../src/styles/product-story';
export default function ProductStorySection() {
 return <ProductStory id="product-story">
    <TravelShowcase />
    <PhoneStory />
 </ProductStory>;
}
