import { Calendar } from '@/headless/Calendar';
import { Box } from '@/headless/ui/Box';
import { Spacing } from '@/headless/ui/Spacing';
import 'dayjs/locale/ko';
import { EmblaCarousel } from 'embla-kit';

export default function Main() {
  return (
    <Box className="w-full  h-dvh px-20 py-16">
      <Spacing size={48} />
      <Calendar />
    </Box>
  );
}
