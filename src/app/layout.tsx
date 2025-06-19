import "./globals.css";
import { Providers } from "./provders";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="relative flex flex-col">
        <Providers>
          <main className="flex-grow md:pb-0">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
