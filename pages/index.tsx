import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import TwForm from './form';

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">Example form</h1>

        <p className="mt-3 text-2xl">
          Built from{' '}
          <Link href="https://github.com/pricklywiggles/wise-test-form/blob/d07cbd93323a8e54c768febd3221c2d946828fd1/pages/api/hello.ts#L13">
            this data
          </Link>{' '}
          <code className="rounded-md bg-gray-100 p-3 font-mono text-lg">
            {``}
          </code>
        </p>

        <div className="mt-6 max-w-4xl flex-wrap items-center justify-around sm:w-full">
          <TwForm />
        </div>
      </main>
    </div>
  );
};

export default Home;
