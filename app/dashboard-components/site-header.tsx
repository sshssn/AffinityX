"use client"

import { Button } from "../../components/ui/button"
import { Separator } from "../../components/ui/separator"

export function SiteHeader() {
  return (
    <header className="flex h-[--header-height] shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <h1 className="text-lg font-medium">Project Management</h1>
      </div>
      <Separator orientation="vertical" className="mr-auto h-4" />
      <div className="flex items-center gap-2 px-4">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <span className="sr-only">Toggle notifications</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="m13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </Button>
      </div>
    </header>
  )
}
