import { Slider as SliderPrimitive } from "@base-ui/react/slider"

import { cn } from "@/lib/utils"

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: SliderPrimitive.Root.Props) {
  const _values = Array.isArray(value)
    ? value
    : Array.isArray(defaultValue)
      ? defaultValue
      : [min, max]

  return (
    <SliderPrimitive.Root
      className={cn("w-full", className)}
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      thumbAlignment="edge"
      {...props}
    >
      <SliderPrimitive.Control className="relative flex w-full touch-none items-center select-none py-2 data-disabled:opacity-50">
        <SliderPrimitive.Track
          data-slot="slider-track"
          className="relative h-2.5 w-full grow overflow-hidden rounded-full bg-zinc-300 shadow-inner dark:bg-zinc-600 select-none"
        >
          <SliderPrimitive.Indicator
            data-slot="slider-range"
            className="h-full bg-primary select-none"
          />
        </SliderPrimitive.Track>
        {Array.from({ length: _values.length }, (_, index) => (
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            key={index}
            className="relative block size-5 shrink-0 rounded-full border-2 border-zinc-400 bg-white shadow-md ring-ring/50 transition-[color,box-shadow] select-none after:absolute after:-inset-3 hover:ring-4 hover:border-primary focus-visible:ring-4 focus-visible:border-primary focus-visible:outline-hidden active:ring-4 active:scale-110 disabled:pointer-events-none disabled:opacity-50 dark:border-zinc-500"
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

export { Slider }
