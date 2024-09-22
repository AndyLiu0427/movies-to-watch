import Image from "next/image";

function Hero() {
  return (
    <header className="relative w-full h-[50vh] sm:h-[60vh] flex items-center">
      <Image
        src="/hero_1.webp"
        alt="Hero background"
        fill
        style={{ objectFit: "cover" }}
        quality={90}
        priority
        className="z-0"
      />
      <div className="container mx-auto px-8 sm:px-16 relative z-10">
        <div className="flex flex-col gap-10 max-w-2xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white font-bold leading-[120%]">
            上百萬部電影、電視節目和人物在
            <span className="text-yellow-500">等你探索。</span>
          </h1>
        </div>
      </div>
    </header>
  );
}

export default Hero;