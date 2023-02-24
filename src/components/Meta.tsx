// components/Meta.tsx

import Head from "next/head";

type Props = {
  title?: string;
};

const Meta = ({ title = "My Tasks - Vanguardia" }: Props) => {
  return (
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      <meta name="title" content="My Tasks - Vanguardia" />
      <meta
        name="description"
        content="My Tasks is an open-source utility web application that allows users to keep track of their activities."
      />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="author" content="Van AJ Vanguardia" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default Meta;
