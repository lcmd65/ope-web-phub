import PageLayout from "components/layout/layout";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  // useEffect(() => {
  //   if (userStore.getState().access_token == "") {
  //     Router.push(PageUrls.AUTH.LOGIN);
  //   }
  // });
  return (
    <PageLayout>
      <Component {...pageProps} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </PageLayout>
  );
}
