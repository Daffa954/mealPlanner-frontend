// import {
//     Disclosure,
//     DisclosureButton,
//     DisclosurePanel,
//   } from "@headlessui/react";
//   import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
//   import Logo from "../assets/logo-nobg.png";
  
//   const navigation = [
//     { name: "Home", href: "/", current: true },
//     { name: "Our Product", href: "about", current: false },
//     { name: "Our Teams", href: "myprojects", current: false },
//   ];
  
//   function classNames(...classes: string[]) {
//     return classes.filter(Boolean).join(" ");
//   }
  
//   export default function Navbar() {
//     return (
//       <div className="min-h-full">
//         <Disclosure as="nav" className="bg-white/70 backdrop-blur-md shadow-md py-4 px-2 fixed top-0 left-0 w-full">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex h-16 items-center justify-between">
//               {/* Left - Logo */}
//               <div className="flex items-center">
//                 <img
//                   className="h-28 w-auto"
//                   src={Logo}
//                   alt="Logo"
//                 />
//               </div>
  
//               {/* Middle - Navigation */}
//               <div className="hidden md:flex space-x-8">
//                 {navigation.map((item) => (
//                   <a
//                     key={item.name}
//                     href={item.href}
//                     className={classNames(
//                       item.current
//                         ? "text-blue-700 font-semibold"
//                         : "text-gray-600 hover:text-blue-600 hover:underline",
//                       "transition text-lg px-3 py-2"
//                     )}
//                   >
//                     {item.name}
//                   </a>
//                 ))}
//               </div>
  
//               {/* Right - Buttons */}
//               <div className="hidden md:flex space-x-4">
//                 <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
//                   Login
//                 </button>
//                 <button className="bg-gray-100 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-200 transition">
//                   Register
//                 </button>
//               </div>
  
//               {/* Mobile menu button */}
//               <div className="md:hidden">
//                 <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 border-2 border-blue-500 hover:bg-blue-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition">
//                   <span className="sr-only">Open main menu</span>
//                   <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
//                   <XMarkIcon className="hidden h-6 w-6" aria-hidden="true" />
//                 </DisclosureButton>
//               </div>
//             </div>
//           </div>
  
//           {/* Mobile panel */}
//           <DisclosurePanel className="md:hidden px-4 pt-4 pb-6 space-y-4 bg-white border-t mt-2 shadow-sm">
//             {navigation.map((item) => (
//               <DisclosureButton
//                 key={item.name}
//                 as="a"
//                 href={item.href}
//                 className={classNames(
//                   item.current
//                     ? "text-blue-700 font-semibold"
//                     : "text-gray-600 hover:text-blue-700 hover:underline",
//                   "block text-base"
//                 )}
//               >
//                 {item.name}
//               </DisclosureButton>
//             ))}
  
//             <div className="pt-4 space-y-3">
//               <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
//                 Login
//               </button>
//               <button className="w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition">
//                 Register
//               </button>
//             </div>
//           </DisclosurePanel>
//         </Disclosure>
//       </div>
//     );
//   }
  

// import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import {
      Disclosure,
      DisclosureButton,
      DisclosurePanel,
    } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "../assets/logo-nobg.png";

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Our Product", href: "about", current: false },
  { name: "Our Teams", href: "myprojects", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  return (
    <Disclosure as="nav" className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img className="h-24 w-auto" src={Logo} alt="Logo" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current
                    ? "text-[#7B5E3C] font-semibold" // Earthy brown for active
                    : "text-gray-600 hover:text-[#9C7248]", // Lighter brown hover
                  "transition text-lg px-3 py-2"
                )}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex space-x-4">
            <button className="bg-[#7B5E3C] text-white px-6 py-2 rounded-lg hover:bg-[#9C7248] transition">
              Login
            </button>
            <button className="border border-[#7B5E3C] text-[#7B5E3C] px-6 py-2 rounded-lg hover:bg-[#FCD47F]/20 transition">
              Register
            </button>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-[#7B5E3C] border-2 border-[#7B5E3C] hover:bg-[#FCD47F]/10">
              <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <DisclosurePanel className="md:hidden px-4 pt-4 pb-6 space-y-4 bg-white border-t">
        {navigation.map((item) => (
          <DisclosureButton
            key={item.name}
            as="a"
            href={item.href}
            className={classNames(
              item.current
                ? "text-[#7B5E3C] font-semibold"
                : "text-gray-600 hover:text-[#9C7248]",
              "block text-base"
            )}
          >
            {item.name}
          </DisclosureButton>
        ))}
        <div className="pt-4 space-y-3">
          <button className="w-full bg-[#7B5E3C] text-white px-4 py-2 rounded-lg hover:bg-[#9C7248]">
            Login
          </button>
          <button className="w-full border border-[#7B5E3C] text-[#7B5E3C] px-4 py-2 rounded-lg hover:bg-[#FCD47F]/10">
            Register
          </button>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}