import TravelShowcase from './travel-showcase';
import { ProductStory } from '../src/styles/product-story';
// Simplified page: hero -> features -> download -> footer.
// TicketReminder (./ticket-reminder) and DataAndAISections (./data-and-ai-sections) are kept
// on disk but not rendered; they may return as the app-screens section after the app ships.
export default function ProductStorySection() {
 return <ProductStory id="product-story">
    <TravelShowcase />
 </ProductStory>;
}
