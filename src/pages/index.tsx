import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Navbar from "./nav";
import router from "next/router";

export default function Home() {
  // Création d'une session
  const { data: sessionData } = useSession();

  const discordUsername = sessionData?.user?.name as string;

  function handleAdminPage(): void {
    if (discordUsername === "loict1") {
      router.push("/monitoring");
    } else {
      throw new Error("You do not have permission to access this page.");
    }
  }

  function handleTechnicianPage(): void {
    if (discordUsername === "loict1") {
      router.push("/technician");
    } else {
      throw new Error("You do not have permission to access this page.");
    }
  }

  return (
    <>
      <Navbar discordUsername={discordUsername}/>
      <Head>
        <title>Projet industriel</title>
        <meta name="description" content="Projet industriel - ewon" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight text-black sm:text-[5rem]">
            Bienvenue!
          </h1>
          <h2 className="font-bold tracking-tight text-black sm:text-[1rem] text-center">
            Dans le cadre du cours de projet industriel, Technocampus nous a ouvert ses portes vers la miniusine.<br/>
            Nos compétences en programmation ont été mises en avant pour mener à bien ce projet.</h2>
          <div className="flex flex-col items-center gap-2">
            <AuthShowcase />
            {discordUsername === "loict1" && ( // Afficage des boutons uniquement lorsque loict1 est connecté (admin)
              <>
                <button
                  className="bg-[#64748b] hover:bg-[#1e293b] text-white py-2 px-4 rounded-full"
                  onClick={handleAdminPage}
                >
                  Go to Monitoring
                </button>
                <button
                  className="bg-[#64748b] hover:bg-[#1e293b] text-white py-2 px-4 rounded-full"
                  onClick={handleTechnicianPage}
                >
                  Go to user page
                </button>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-black">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p>
      <button
        className="bg-[#64748b] hover:bg-[#1e293b] text-white py-2 px-4 rounded-full"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}