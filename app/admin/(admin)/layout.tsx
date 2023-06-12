import AdminLayout from '@/components/admin/main-layout/AdminLayout';
import { cookies } from 'next/headers';
import React from 'react';
import { useCurrentUserAdmin } from '@/lib/server/helperServer';
import ClientOnly from '@/components/ClientOnly';
import AdminSideBar from '@/components/admin/AdminSideBar';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Admin Create Next App',
  description: 'Generated by create next app',
}

async function getData() {
  const nextCookies = cookies()
  const token = nextCookies.get('token-admin')

  const res = await fetch(process.env.NEXTAUTH_URL + '/api/admin/auth/me', {
    headers: {
      authorization: `bearer ${token?.value}`
    }
  })
  if (!res.ok) {
    return {user: null}
  }

  return res.json();
}

export default async function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  // const { user: data } = await getData()

  // console.log(data)

  const user = await useCurrentUserAdmin()

  if (!user) {
    redirect('/admin/login')
  }

  return (
    <div className="w-full h-screen flex bg-gray-100">
      <div className="flex-none h-full">
        <AdminSideBar user={user} />
      </div>
      <div className="flex-grow min-w-0 h-full">
        {children}
      </div>
    </div>
  )
}