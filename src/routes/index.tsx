import { toast } from '@/headless/Toaster'
import { EmblaCarousel } from '@thyeone/embla'
import 'dayjs/locale/ko'

export default function Index() {
  return (
    <EmblaCarousel.Root
      options={{
        stopPropagation: true,
      }}
      className="p-4"
      onClick={() => {
        toast.show('Hello')
      }}
    >
      <EmblaCarousel.Content>
        <EmblaCarousel.Root
          options={{
            stopPropagation: true,
          }}
        >
          <EmblaCarousel.Content>
            <EmblaCarousel.Item className="size-[300px] rounded-md border border-gray-100 bg-gray-50">
              dd
            </EmblaCarousel.Item>
          </EmblaCarousel.Content>
        </EmblaCarousel.Root>
      </EmblaCarousel.Content>
    </EmblaCarousel.Root>
  )
}
