import Link from "next/link";
import Image from "next/image";
export default function CtaSection() {
  return (
    <section className="py-[120px] container">
      <div className="w-full h-full bg-[url('/images/cta-background.png')] bg-cover bg-center py-[90px] flex flex-col items-center gap-[50px]">
        <div className="flex flex-col items-center gap-[50px]">
          <h2 className="text-[70px] font-semibold leading-[120%]">
            Ready to Create Your DAO?
          </h2>

          <p className="text-[30px] font-normal leading-[140%] opacity-70 max-w-[760px] text-center">
            Join the future of decentralized governance with tools that make
            management simple, efficient, and powerful.
          </p>

          <div className="flex items-center gap-[50px]">
            <Link
              href="/"
              className="py-[20px] px-[30px] rounded-[144px] flex items-center gap-[10px] text-[24px] font-semibold bg-[#202224] hover:opacity-80 transition-opacity"
            >
              <span>Let's talk with specialists</span>
              <Image
                src="/images/arrow-light.svg"
                alt="arrow"
                width={12.385}
                height={14.8}
              />
            </Link>

            <Link
              href="/"
              className="py-[20px] px-[30px] rounded-[144px] flex items-center gap-[10px] text-[24px] font-semibold bg-[var(--foreground)] text-[var(--background)] hover:opacity-80 transition-opacity"
            >
              <span>Launch App Now</span>
              <Image
                src="/images/arrow-dark.svg"
                alt="arrow"
                width={12.385}
                height={14.8}
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="cta-background">
        {/* Abstract background visual will be implemented with CSS/SVG */}
      </div>
    </section>
  );
}
