import TicketReminder from './ticket-reminder';
import TravelShowcase from './travel-showcase';
import { ProductStory } from '../src/styles/product-story';
export default function ProductStorySection() {
 return <ProductStory id="product-story">
    <TravelShowcase />
    <TicketReminder />
 </ProductStory>;
}
