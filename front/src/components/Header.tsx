import { Form, NavLink, useLocation } from "react-router";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { useUser } from "@/providers/UserProvider";
import { Button } from "@/components/ui/button";

export default function Header() {
  const {isLoggedIn} = useUser();
  const path = useLocation().pathname;

  return (
    <header className="border-b-1">
      <div className="w-auto mx-auto md:w-3/4 p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">
          掲示板
        </h1>
        {path !== '/register' && isLoggedIn &&
        <NavigationMenu>
          <NavigationMenuList className="gap-2">
            <NavigationMenuItem>
              <NavigationMenuLink render={<NavLink to="/posts" end style={({ isActive }) => ({ backgroundColor: isActive ? 'lightgray' : '' })}>投稿一覧</NavLink>} />
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink render={<NavLink to="/posts/create" style={({ isActive }) => ({ backgroundColor: isActive ? 'lightgray' : '' })}>投稿する</NavLink>} />
            </NavigationMenuItem>
          </NavigationMenuList>
          <Form method="post" action="logout" className="ml-2">
            <Button type="submit">ログアウト</Button>
          </Form>
        </NavigationMenu>
        }
        {path !== '/register' && isLoggedIn === false &&
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem className="gap-2">
              <NavigationMenuLink render={<NavLink to="/" style={({ isActive }) => ({ backgroundColor: isActive ? 'lightgray' : '' })}>ログイン</NavLink>} />
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink render={<NavLink to="/preregister" style={({ isActive }) => ({ backgroundColor: isActive ? 'lightgray' : '' })}>新規登録</NavLink>} />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        }
      </div>
    </header>
  )
}
