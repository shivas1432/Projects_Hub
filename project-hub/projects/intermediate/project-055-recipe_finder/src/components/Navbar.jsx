import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const handleLogout = () => {
    setCookie("token", "");
    window.localStorage.removeItem("userID");
    navigate("/login");
  };

  const [cookies, setCookie] = useCookies(["token"]);
  let navigation = [
    { name: "RecipeBook", href: "/", current: true },
    { name: "Create Recipe", href: "/create-recipe", current: false },
    { name: "Saved Recipe", href: "/saved-recipe", current: false },
    {
      name: cookies.token ? "Logout" : "Login",
      href: cookies.token ? "#" : "/login",
      current: false,
      onClick: cookies.token ? handleLogout : undefined,
    },
  ];

  return (
    <Disclosure as="nav" className="bg-indigo-600">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="https://emojigraph.org/media/facebook/fork-and-knife-with-plate_1f37d-fe0f.png"
                    alt="Recipe Book"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block ">
                  <div className="flex space-x-4">
                    {navigation.map((item) =>
                      item.name === "Logout" ? (
                        <button
                          key={item.name}
                          onClick={handleLogout}
                          className={classNames(
                            "rounded-md px-3 py-2 text-lg font-medium",
                            item.current
                              ? "bg-indigo-900 text-white"
                              : "text-gray-200 hover:bg-indigo-700 hover:text-white"
                          )}
                        >
                          {item.name}
                        </button>
                      ) : (
                        <NavLink
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            "rounded-md px-3 py-2 text-lg font-medium",
                            item.current
                              ? "bg-indigo-900 text-white"
                              : "text-gray-200 hover:bg-indigo-700 hover:text-white"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </NavLink>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) =>
                      item.name === "Logout" ? (
                        <button
                          key={item.name}
                          onClick={handleLogout}
                          className={classNames(
                            "rounded-md px-3 py-2 text-lg font-medium",
                            item.current
                              ? "bg-indigo-900 text-white"
                              : "text-gray-200 hover:bg-indigo-700 hover:text-white"
                          )}
                        >
                          {item.name}
                        </button>
                      ) : (
                        <NavLink
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            "rounded-md px-3 py-2 text-base block font-medium",
                            item.current
                              ? "bg-indigo-900 text-white"
                              : "text-gray-200 hover:bg-indigo-700 hover:text-white"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </NavLink>
                      )
                    )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
export default Navbar;
