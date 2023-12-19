import React from "react";
import Link from "next/link";

const Navbar = ({ discordUsername }) => {
  const isMonitoringEnabled = discordUsername === "loict1";
  
  return (
    <>
      <nav
        class="block w-full max-w-screen-xl px-6 py-3 mx-auto text-white bg-[#64748b] border shadow-md rounded-xl border-white/80 bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200">
        <div class="flex items-center justify-between text-blue-gray-900">
          <a href="/"
            class="mr-4 block cursor-pointer py-1.5 font-sans text-base font-semibold leading-relaxed tracking-normal text-inherit antialiased">
            Projet industriel
          </a>
          <div class="hidden lg:block">
            <ul class="flex flex-col gap-2 my-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
              <li class="block p-1 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
              {isMonitoringEnabled && (
                <a href="/monitoring" class="flex items-center transition-colors hover:text-black">
                  Monitoring
                </a>
              )}
              </li>
              <li class="block p-1 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
              {isMonitoringEnabled && (
                <a href="/technician" class="flex items-center transition-colors hover:text-black">
                  Technician
                </a>
              )}
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
