import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"
import { GlowingEffect } from "@/components/ui/glowing-effect"

interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: {
    regular: string
    gradient: string
  }
  description?: string
  ctaText?: string
  ctaHref?: string
  video: {
    src: string
    poster: string
  }
  gridOptions?: {
    angle?: number
    cellSize?: number
    opacity?: number
    lightLineColor?: string
    darkLineColor?: string
  }
}

const RetroGrid = ({
  angle = 65,
  cellSize = 60,
  opacity = 0.5,
  lightLineColor = "gray",
  darkLineColor = "gray",
}) => {
  const gridStyles = {
    "--grid-angle": `${angle}deg`,
    "--cell-size": `${cellSize}px`,
    "--opacity": opacity,
    "--light-line": lightLineColor,
    "--dark-line": darkLineColor,
  } as React.CSSProperties

  return (
    <div
      className={cn(
        "pointer-events-none absolute size-full overflow-hidden [perspective:200px]",
        `opacity-[var(--opacity)]`,
      )}
      style={gridStyles}
    >
      <div className="absolute inset-0 [transform:rotateX(var(--grid-angle))]">
        <div className="animate-grid [background-image:linear-gradient(to_right,var(--light-line)_1px,transparent_0),linear-gradient(to_bottom,var(--light-line)_1px,transparent_0)] [background-repeat:repeat] [background-size:var(--cell-size)_var(--cell-size)] [height:300vh] [inset:0%_0px] [margin-left:-200%] [transform-origin:100%_0_0] [width:600vw] dark:[background-image:linear-gradient(to_right,var(--dark-line)_1px,transparent_0),linear-gradient(to_bottom,var(--dark-line)_1px,transparent_0)]" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent to-90% dark:from-black" />
    </div>
  )
}

const HeroSection = React.forwardRef<HTMLDivElement, HeroSectionProps>(
  (
    {
      className,
      title,
      subtitle,
      description,
      ctaText,
      ctaHref,
      video,
      gridOptions,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={cn("relative w-full min-h-screen flex flex-col justify-center", className)} ref={ref} {...props}>
        <div className="absolute inset-0 z-[0] w-full bg-purple-950/10 dark:bg-purple-950/10 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
        
        <div className="absolute inset-0 dark:bg-grid-white/[0.05] bg-grid-black/[0.05] pointer-events-none" />
        
        <section className="relative w-full flex flex-col justify-center flex-1 py-8 sm:py-12 md:py-16 lg:py-20">
          <RetroGrid {...gridOptions} />
          
          <div className="max-w-screen-xl mx-auto w-full px-4 sm:px-6 lg:px-8 z-10">
            <div className="space-y-4 sm:space-y-6 md:space-y-8 max-w-3xl mx-auto text-center">
              <h1 className="text-xs sm:text-sm text-transparent bg-clip-text bg-gradient-to-r from-gray-600 via-indigo-500 to-gray-600 dark:from-gray-400 dark:via-indigo-300 dark:to-gray-400 group mx-auto px-3 sm:px-4 py-1.5 sm:py-2 mt-3 bg-gradient-to-tr from-zinc-300/20 via-gray-400/20 to-transparent dark:from-zinc-300/5 dark:via-gray-400/5 border-[1.5px] sm:border-[2px] border-black/5 dark:border-white/5 rounded-2xl sm:rounded-3xl w-fit">
                {title}
                <ChevronRight className="inline w-3 h-3 sm:w-4 sm:h-4 ml-1.5 sm:ml-2 group-hover:translate-x-1 duration-300" />
              </h1>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tighter font-geist bg-clip-text text-transparent mx-auto leading-[1.1] sm:leading-[1.2] bg-[linear-gradient(180deg,_#000_0%,_rgba(0,_0,_0,_0.75)_100%)] dark:bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)] px-2">
                {subtitle?.regular}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-300 dark:to-orange-200">
                  {subtitle?.gradient}
                </span>
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4 leading-relaxed">
                {description}
              </p>
            </div>

            {/* Edge-to-edge video container with rounded corners */}
            <div className="relative w-full max-w-6xl mx-auto mt-6 sm:mt-8 -mx-4 sm:-mx-6 lg:-mx-8">
              <div className="relative aspect-[16/9] sm:aspect-[16/9] md:aspect-[16/9] lg:aspect-[16/9] xl:aspect-[16/9] overflow-hidden">
                {/* Only show GlowingEffect on desktop for better performance */}
                <div className="hidden lg:block">
                  <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={60}
                    inactiveZone={0.01}
                    borderWidth={1.5}
                  />
                </div>
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={video.poster}
                  className="w-full h-full object-cover relative z-10"
                  preload="metadata"
                >
                  <source src={video.src} type="video/mp4" />
                  <img
                    src={video.poster}
                    alt="Hero section video fallback"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </video>
                {/* Rounded corners overlay for mobile */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-0 left-0 w-4 h-4 bg-white dark:bg-black rounded-br-xl sm:rounded-br-2xl"></div>
                  <div className="absolute top-0 right-0 w-4 h-4 bg-white dark:bg-black rounded-bl-xl sm:rounded-bl-2xl"></div>
                  <div className="absolute bottom-0 left-0 w-4 h-4 bg-white dark:bg-black rounded-tr-xl sm:rounded-tr-2xl"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-white dark:bg-black rounded-tl-xl sm:rounded-tl-2xl"></div>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-6 sm:mt-8">
              <span className="relative inline-block overflow-hidden rounded-full p-[1px] sm:p-[1.5px]">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <div className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white dark:bg-gray-950 text-xs sm:text-sm font-medium backdrop-blur-3xl">
                  <a
                    href={ctaHref}
                    className="inline-flex rounded-full text-center group items-center justify-center bg-gradient-to-tr from-zinc-300/20 via-purple-400/30 to-transparent dark:from-zinc-300/5 dark:via-purple-400/20 text-gray-900 dark:text-white border-input border-[1px] hover:bg-gradient-to-tr hover:from-zinc-300/30 hover:via-purple-400/40 hover:to-transparent dark:hover:from-zinc-300/10 dark:hover:via-purple-400/30 transition-all py-3 px-4 sm:py-4 sm:px-6 md:px-10"
                  >
                    {ctaText}
                  </a>
                </div>
              </span>
            </div>
          </div>
        </section>
      </div>
    );
  }
);
HeroSection.displayName = "HeroSection"

export { HeroSection } 