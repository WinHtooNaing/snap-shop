import React from "react";

export default function ConfirmEmailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="max-w-xl mx-auto">{children}</main>;
}
