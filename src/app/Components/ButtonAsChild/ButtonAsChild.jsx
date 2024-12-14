import Link from "next/link"

import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"

export function ButtonAsChild() {
    const session = useSession();
    return (
        <>
            {
                session?.status !== 'authenticated' && <Button asChild className={'bg-red-600'}>
                <Link href="/sign-in">Login</Link>
              </Button>
            }
        </>
    )
}