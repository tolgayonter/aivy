import { UserButton } from "@clerk/nextjs";

const DashboardLayout = ({ children }) => {
  return (
    <div className="w-screen h-screen relative">
      <aside className="absolute w-48 top-0 left-0 h-full border-r border-black/10">
        Aivy
      </aside>
      <div className="ml-48 h-full">
        <header className="h-16 border-b border-black/10">
          <div className="w-full h-full px-6 flex items-center justify-end">
            <UserButton />
          </div>
        </header>
        <div className="h-[calc(100vh-64px)]">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
