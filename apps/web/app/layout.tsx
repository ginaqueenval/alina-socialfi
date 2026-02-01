export const metadata = {
  title: "ALINA",
  description: "Crypto-first social & dating platform"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ background: "#070A0E", color: "white", fontFamily: "sans-serif" }}>
        <header style={{ padding: 20, borderBottom: "1px solid #222" }}>
          <strong>ALINA</strong>
        </header>
        <main style={{ padding: 40 }}>{children}</main>
      </body>
    </html>
  );
}
