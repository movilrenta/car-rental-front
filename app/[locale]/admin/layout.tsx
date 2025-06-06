import { getUserInformation } from '@/actions/auth/getUser'
import '../css/style.css'

import Sidebar from './sidebar'
import Header from '@/components/ui/header'
import getAuthorized from '@/components/utils/get-authorized'

export default async function AlternativeLayout({
  children,
}: {
  children: React.ReactNode
}) {  
  const { user, role } = await getUserInformation()
  const authorized_roles = getAuthorized(role, 'roles')
  const authorized_create_user = getAuthorized(role, 'crearUsuarios')
  const authorized_log = getAuthorized(role, 'log')
  return (
    <div className="flex h-[100dvh] overflow-hidden">

      {/* Sidebar */}
      <Sidebar variant="v2" authorized_roles={authorized_roles} authorized_create_user={authorized_create_user} authorized_log={authorized_log} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header variant="v2" user={user} role={role} />

        <main className="grow [&>*:first-child]:scroll-mt-16">
          {children}
        </main>        

      </div>

    </div>
  )
}
