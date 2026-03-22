// // import React from 'react';
// // import { Outlet, useLocation } from 'react-router-dom';
// // import { AnimatePresence, motion } from 'framer-motion';
// // import Header from './Header';

// // const pageVariants = {
// //   initial: { opacity: 0, y: 15, filter: 'blur(5px)' },
// //   in: { opacity: 1, y: 0, filter: 'blur(0px)' },
// //   out: { opacity: 0, y: -15, filter: 'blur(5px)' }
// // };

// // const pageTransition = {
// //   type: 'tween',
// //   ease: 'easeInOut',
// //   duration: 0.4
// // };

// // const Layout = () => {
// //   const location = useLocation();

// //   return (
// //     <div className="min-h-screen flex flex-col pt-24 font-sans text-blue-900">
// //       <Header />
// //       <main className="flex-grow p-4 md:p-8 max-w-7xl mx-auto w-full relative z-10">
// //         <AnimatePresence mode="wait">
// //           <motion.div
// //             key={location.pathname}
// //             initial="initial"
// //             animate="in"
// //             exit="out"
// //             variants={pageVariants}
// //             transition={pageTransition}
// //             className="w-full h-full"
// //           >
// //             <Outlet />
// //           </motion.div>
// //         </AnimatePresence>
// //       </main>
// //     </div>
// //   );
// // };

// // export default Layout;
// import React from 'react';
// import { Outlet, useLocation } from 'react-router-dom';
// import { AnimatePresence, motion } from 'framer-motion';
// import Header from './Header';

// const pageVariants = {
//   initial: { opacity: 0, y: 10 },
//   in: { opacity: 1, y: 0 },
//   out: { opacity: 0, y: -10 },
// };

// const pageTransition = {
//   type: 'tween',
//   ease: 'easeInOut',
//   duration: 0.25,
// };

// const Layout = () => {
//   const location = useLocation();

//   return (
//     <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800">
//       <Header />
//       <main className="flex-grow pt-16 px-4 md:px-8 max-w-7xl mx-auto w-full py-8">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={location.pathname}
//             initial="initial"
//             animate="in"
//             exit="out"
//             variants={pageVariants}
//             transition={pageTransition}
//             className="w-full h-full"
//           >
//             <Outlet />
//           </motion.div>
//         </AnimatePresence>
//       </main>
//     </div>
//   );
// };

// export default Layout;
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './Header';

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  in:      { opacity: 1, y: 0 },
  out:     { opacity: 0, y: -10 },
};

const pageTransition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.25,
};

const Layout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800">
      <Header />
      {/* pt-16 because Header is fixed h-16 */}
      <main className="flex-grow pt-16 px-4 md:px-8 max-w-7xl mx-auto w-full py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="w-full h-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Layout;
