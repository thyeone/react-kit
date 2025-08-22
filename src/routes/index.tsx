import { Calendar } from '@/headless/Calendar';
import { Box } from '@/headless/ui/Box';
import { Spacing } from '@/headless/ui/Spacing';
import 'dayjs/locale/ko';
import { EmblaCarousel } from '@thyeone/embla';

export default function Index() {
  return (
    <EmblaCarousel.Root
      options={{
        stopPropagation: true,
      }}
      className="p-4"
    >
      <EmblaCarousel.Content>
        <EmblaCarousel.Root
          options={{
            stopPropagation: true,
          }}
        >
          <EmblaCarousel.Content>
            <EmblaCarousel.Item className="size-[300px] border border-gray-100 bg-gray-50 rounded-md">
              dd
            </EmblaCarousel.Item>
          </EmblaCarousel.Content>
        </EmblaCarousel.Root>
      </EmblaCarousel.Content>
    </EmblaCarousel.Root>
  );
}
