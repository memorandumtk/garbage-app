// If not use "use client", I got this window is not defined error. which 'Error: window is not defined'.
// "use client";
import dynamic from "next/dynamic";
import React from "react";

const MapPage = () => {
  const MyMap = React.useMemo(
    () =>
      dynamic(
        () => import("./map"),         {
          loading: () => <p>A map is loading</p>,
          ssr: false, // This line is important. It's what prevents server-side render
        }
      ),
    []
  );
  return <MyMap />;
};

export default MapPage;

// Below is a solution from this link.
// https://stackoverflow.com/a/74334431/21951181
// import { FunctionComponent } from 'react';
// import { useState, useEffect } from "react";
// export default function Map () {
//     const [Client, setClient] = useState<FunctionComponent>();

//     useEffect(() => {
//         (async () => {
//             if (typeof global.window !== "undefined") {
//                 const newClient = (await import('./map2')).default
//                 setClient(() => newClient);
//             }
//         })();
//     }, [])

//     if (typeof global.window === "undefined" || !Client) {
//         return null;
//     }

//     return Client ? <Client /> : null;
// }
