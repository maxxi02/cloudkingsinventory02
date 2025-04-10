export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-auto">
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-full mx-w-4xl mx-auto h-auto overflow-x-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
