import React, { useEffect, useState } from "react";

interface AlertProps {
  resMessage: string;
  onClose: () => void; // Callback to handle closing the alert
}

export const Alert: React.FC<AlertProps> = ({ resMessage, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (resMessage) {
      setIsVisible(true);

      // Auto-dismiss after 5 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, 5000);

      return () => clearTimeout(timer); // Cleanup timeout on unmount
    }
  }, [resMessage, onClose]);

  if (!isVisible || !resMessage) return null;

  return (
    <div className="flex align-center justify-end">
      <div className="rounded-lg bg-white text-[0.8125rem]/5 text-slate-900 ring-1 shadow-xl shadow-black/5 ring-slate-700/10 w-4/12 absolute m-2">
        <div className="z-10 flex items-center relative p-4">
          <div className="rounded-full border-2 p-2 text-center border-[#FFA500] flex-none bg-orange-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-10 text-[#FFA500]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          </div>
          <div className="ml-4 flex-auto">
            <div className="font-[family-name:var(--interSemiBold)]">
              {resMessage}
            </div>
          </div>
          <div
            className="shadow-xl rounded-lg bg-white absolute right-0 top-0 cursor-pointer"
            onClick={() => {
              setIsVisible(false);
              onClose();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};


// export const Alert = ({resMessage}) => {
//   console.log("resMessage", resMessage);
  
//   return (
//     <div className="flex align-center justify-end ">
//       <div className="rounded-lg bg-white text-[0.8125rem]/5 text-slate-900 ring-1 shadow-xl shadow-black/5 ring-slate-700/10 w-4/12 absolute m-2">
//         <div className=" z-10 flex items-center relative p-4">
//           <div className="rounded-full border-2 p-2 text-center border-[#FFA500] flex-none bg-orange-50">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="currentColor"
//               className="size-10 text-[#FFA500]"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
//               />
//             </svg>
//           </div>
//           {/* <Image src="/plus/img/avatar-3.jpg" alt="succes" width={40} height={40} className="size-10 flex-none rounded-full"/> */}
//           <div className="ml-4 flex-auto">
//             <div className="font-[family-name:var(--interSemiBold)]">
//               {/* Success message */}
//               {resMessage}
//             </div>
//             <div className="mt-1 text-slate-500 font-[family-name:var(--interSemiBold)]">
//               Sent you an invite to connect.
//             </div>
//           </div>
//           <div className="shadow-xl rounded-lg bg-white absolute right-0 top-0 cursor-pointer">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="currentColor"
//               className="size-8"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
//               />
//             </svg>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };