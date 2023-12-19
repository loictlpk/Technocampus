import React from "react";
import Link from "next/link";

const Navbar = ({ discordUsername }) => {
  const isMonitoringEnabled = discordUsername === "loict1";

  return (
    <>
      <div className="w-full h-20 bg-black sticky top-0">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <ul className="hidden md:flex gap-x-6 text-white">
              <li>
                <Link href="/">
                  <p>Accueil</p>
                </Link>
              </li>
              {isMonitoringEnabled && (
                <li>
                  <Link href="/monitoring">
                    <p>Monitoring</p>
                  </Link>
                </li>
              )}
              {isMonitoringEnabled && (
                <li>
                  <Link href="/technician">
                    <p>Technician</p>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
