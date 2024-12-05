import './globals.css';
import MainHeader from "@/components/main-header/main-header";

// https://nextjs.org/docs/app/api-reference/functions/generate-metadata
export const metadata = {
  title: 'NextLevel Food',
  description: 'Delicious meals, shared by a food-loving community.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MainHeader></MainHeader>
        {children}
      </body>
    </html>
  );
}
