import TicketReminder from './ticket-reminder';
import TravelShowcase from './travel-showcase';
import DataAndAISections from './data-and-ai-sections';
import { ProductStory } from '../src/styles/product-story';
export default function ProductStorySection() {
 return <ProductStory id="product-story">
    <TravelShowcase />
    {/* Ticket reminder and AI demo continue the feature grid as a second card row. */}
    <div className="companion-grid">
      <TicketReminder />
      <DataAndAISections />
    </div>
 </ProductStory>;
}
