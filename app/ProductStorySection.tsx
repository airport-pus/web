import PhoneStory from './PhoneStory';
import TravelShowcase from './TravelShowcase';
import { ProductStory } from '../src/styles/product-story';
export default function ProductStorySection() {
 return <ProductStory id="product-story">
    <TravelShowcase />
    <PhoneStory />
 </ProductStory>;
}
