"use client";
import Image from "next/image";
import Categories from "./components/categories";

export default function Home() {
  return (
    <div className="p-5">
      <Image
        src="/banner-desconto.png"
        height={0}
        width={0}
        alt="até 55 porcento de desconto esse mês!"
        sizes="100vw"
        className="h-auto w-full"
      />
      <div className="mt-8">
        <Categories/>
      </div>
    </div>
  );
}
