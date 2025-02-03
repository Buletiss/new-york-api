import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { dataNavMain } from "../../public/mocks/dataMock";

import { SearchForm } from "@/components/search-form";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  search: (query: string) => void;
}

export function AppSidebar({
  search,
  fetchItem,
  fetchArticles,
  ...props
}: AppSidebarProps & {
  fetchItem: (query: string) => void;
  fetchArticles: () => void;
}) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="bg-prussian-blue">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild></SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SearchForm search={search} />
      </SidebarHeader>
      <SidebarContent className="bg-prussian-blue">
        <SidebarGroup>
          <SidebarMenu>
            {dataNavMain.navMain.map((item, index) => (
              <Collapsible
                key={item.title}
                defaultOpen={index === 1}
                className="group/collapsible text-white"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      {item.title}
                      <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                      <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.items?.length ? (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton
                              asChild
                              onClick={() => {
                                if (item.title === "Articles") {
                                  fetchArticles();
                                } else {
                                  fetchItem(item.url);
                                }
                              }}
                            >
                              <button className="text-white leading-relaxed min-h-[40px]">
                                {item.title}
                              </button>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
