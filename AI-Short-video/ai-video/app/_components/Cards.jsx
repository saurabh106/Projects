import * as React from "react";
import Image from 'next/image';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function Cards() {
//   return (
//     <div className="flex flex-col items-center gap-10 mt-15">
//       <div className="flex flex-wrap gap-10 justify-center">
//       <Card className="w-[350px] h-[450px] overflow-hidden">
//   <CardContent className="p-0 h-full">
//     <img
//       src="/public/"
//       alt="Random Unsplash"
//       className="w-full h-full object-cover"
//     />
//   </CardContent>
// </Card>


//         <Card className="w-[350px] h-[450px]">
//           <CardHeader>
//             <CardTitle></CardTitle>
//             <CardDescription></CardDescription>
//           </CardHeader>
//           <CardContent>{/* Content goes here */}</CardContent>
//           <CardFooter className="flex justify-between">
//             {/* Footer actions go here */}
//           </CardFooter>
//         </Card>

//         <Card className="w-[350px] h-[450px]">
//           <CardHeader>
//             <CardTitle></CardTitle>
//             <CardDescription></CardDescription>
//           </CardHeader>
//           <CardContent>{/* Content goes here */}</CardContent>
//           <CardFooter className="flex justify-between">
//             {/* Footer actions go here */}
//           </CardFooter>
//         </Card>
//       </div>

//       <div className="flex flex-wrap gap-10 justify-center">
//         <Card className="w-[350px] h-[450px]">
//           <CardHeader>
//             <CardTitle></CardTitle>
//             <CardDescription></CardDescription>
//           </CardHeader>
//           <CardContent>{/* Content goes here */}</CardContent>
//           <CardFooter className="flex justify-between">
//             {/* Footer actions go here */}
//           </CardFooter>
//         </Card>

//         <Card className="w-[350px] h-[450px]">
//           <CardHeader>
//             <CardTitle></CardTitle>
//             <CardDescription></CardDescription>
//           </CardHeader>
//           <CardContent>{/* Content goes here */}</CardContent>
//           <CardFooter className="flex justify-between">
//             {/* Footer actions go here */}
//           </CardFooter>
//         </Card>
//       </div>
//     </div>
//   );
return (
  <div className="flex flex-col items-center gap-10 mt-[60px]">
    <div className="w-[350px] h-[450px] bg-white shadow-md rounded overflow-hidden relative">
      <Image
        src="https://source.unsplash.com/random/350x450"
        alt="Random from Unsplash"
        layout="fill"
        objectFit="cover"
      />
    </div>
  </div>
);
}
