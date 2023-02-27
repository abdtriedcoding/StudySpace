import "@/styles/globals.css";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LoadingBar from "react-top-loading-bar";
import { UserAuthContext } from "@/context/UserAuthContext";
import { FetchDataContextWrapper } from "@/context/DataFetchContext";
export default function App({ Component, pageProps }) {
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(40);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });
  }, []);

  return (
    <>
      <LoadingBar
        color="#f11946"
        progress={progress}
        waitingTime={400}
        height={4}
        onLoaderFinished={() => setProgress(0)}
      />
      <UserAuthContext>
        <FetchDataContextWrapper>
          <Component {...pageProps} />
        </FetchDataContextWrapper>
      </UserAuthContext>
    </>
  );
}
