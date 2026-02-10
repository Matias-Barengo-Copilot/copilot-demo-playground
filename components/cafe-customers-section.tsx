"use client";

import { useState } from "react";
import Image from "next/image";
import type { CafeCustomer } from "@/lib/cafe-customers";

const CAFE_IMAGE_SRC =
  "https://images.unsplash.com/photo-1764391836704-8053c8a6e209?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";

type CafeCustomersSectionProps = {
  customers: CafeCustomer[];
};

export function CafeCustomersSection({ customers }: CafeCustomersSectionProps) {
  const [hoveredCustomer, setHoveredCustomer] = useState<string | null>(null);

  return (
    <section className="min-h-screen w-full bg-linear-to-b from-zinc-900 to-black py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl text-white mb-6">
            Customers in the Café
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            They come for the latte, they stay for the AI. Hover to meet them.
          </p>
        </div>

        {/* Café Scene */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
          <Image
            src={CAFE_IMAGE_SRC}
            alt="Customers working in café"
            className="object-cover"
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
          <div className="absolute inset-0 bg-black/20" aria-hidden />

          {/* Customer markers */}
          {customers.map((customer) => (
            <div
              key={customer.id}
              className="absolute"
              style={{
                left: customer.position.left,
                top: customer.position.top,
              }}
              onMouseEnter={() => setHoveredCustomer(customer.id)}
              onMouseLeave={() => setHoveredCustomer(null)}
            >
              {/* Pulsing indicator */}
              <div className="relative">
                <div className="w-6 h-6 bg-blue-500 rounded-full animate-ping absolute opacity-75" />
                <div className="w-6 h-6 bg-blue-500 rounded-full relative cursor-pointer" />
              </div>

              {/* Info card on hover */}
              {hoveredCustomer === customer.id && (
                <div className="absolute left-8 top-1/2 -translate-y-1/2 w-96 bg-white rounded-xl shadow-2xl p-6 z-10 animate-in fade-in slide-in-from-left-2 duration-200">
                  <div className="mb-4">
                    <h3 className="text-xl font-medium mb-1">{customer.name}</h3>
                    <p className="text-sm text-zinc-600 mb-0.5">
                      {customer.title}
                    </p>
                    <p className="text-sm text-zinc-500">{customer.company}</p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <p className="text-sm text-zinc-700 leading-relaxed mb-3">
                      {customer.aiUseCase}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-sm font-medium text-green-700">
                        {customer.impact}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-200">
                    <a
                      href={customer.externalLink ?? "#"}
                      className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 transition-colors font-medium"
                      onClick={(e) => {
                        e.preventDefault();
                        // Will redirect to industry-specific experience when implemented
                      }}
                    >
                      See how {customer.name.split(" ")[0]} uses AI at work
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional context */}
        <div className="mt-12 text-center">
          <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
            The best ideas are brewed over coffee. And the best businesses?
            They&apos;re powered by AI that travels with every cup.
          </p>
        </div>
      </div>
    </section>
  );
}
