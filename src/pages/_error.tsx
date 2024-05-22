import Head from "next/head";

export default function Index() {
  return (
    <>
      <Head>
        <title>Under Construction</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex items-center justify-center w-full h-screen">
        <div className="unset-img w-[500px]">
          <p className="mt-6 mb-2 text-center text-titleXlarge text-neutral-6">404 NOT FOUND</p>
        </div>
      </div>
    </>
  );
}
