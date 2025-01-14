import Link from "next/link"
import { Info, RefreshCw, Users } from "lucide-react"

export default function Staking() {
  const links = [
    {
      href: "/staking/info",
      icon: Info,
      title: "Staking Information",
      description: "Learn about the different staking options available on SHIDO Network and their pros and cons."
    },
    {
      href: "/staking/restake",
      icon: RefreshCw,
      title: "Restake Information",
      description: "Learn about auto-compounding rewards and how to maximize your staking returns through restaking."
    },
    {
      href: "/staking/validators",
      icon: Users,
      title: "Validators",
      description: "View the list of active validators on the SHIDO Network."
    }
  ]

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl relative pb-4 uppercase mb-6">Staking
        <span className="absolute bottom-2.5 left-0 w-[40px] border-b-2 border-sidebar-primary"></span>
        </h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => {
          const Icon = link.icon
          return (
            <Link
              key={link.href}
              href={link.href}
              className="group relative rounded-lg border p-6 hover:bg-accent/50 transition-colors"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <Icon className="h-6 w-6 text-muted-foreground" />
                  <h2 className="font-semibold">{link.title}</h2>
                </div>
                <p className="text-sm text-muted-foreground">{link.description}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}