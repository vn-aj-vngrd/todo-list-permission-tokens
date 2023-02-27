import Meta from "./Meta";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Meta />
      <div>
        <main className="flex min-h-screen items-center justify-center space-x-2 px-4 md:px-0">
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
