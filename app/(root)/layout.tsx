import { isAuthenticated } from '@/lib/actions/auth.action';
import { redirect } from 'next/navigation';
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

const RootLayout = async ({ children }: { children: ReactNode }) => {
  try {
    const isUserAuthenticated = await isAuthenticated();
    if (!isUserAuthenticated) {
      redirect("/sign-in");
    }
    return (
      <div className='root-layout'>
        <div className='root-layout'>
          <nav className=''>
            <Link href={"/"} className='flex items-center gap-2'>
              <Image src={"/logo.svg"} alt='logo' width={38} height={32} />
              <h2 className='text-primary-100'>Mock<span className='text-yellow-400'>Mate</span></h2>
            </Link>
          </nav>
          {children}
        </div>
      </div>
    );
  } catch (e) {
    console.error("Layout Auth Error:", e);
    redirect("/sign-in");
  }
}

export default RootLayout;