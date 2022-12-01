import { Link, Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Navigation from "./Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMoralis } from "react-moralis";
import { contractAddresses } from "../utils/constants";
import { ConnectButton, Link as UILink } from "web3uikit";

const Layout = () => {
  const { isWeb3Enabled, chainId } = useMoralis();
  const { pathname } = useLocation();
  const isHome = pathname === "/"
  const supportedChains = Object.keys(contractAddresses);
  return (
    <>
      <Navigation />
      {isWeb3Enabled? (
        <div>
          {supportedChains.includes(parseInt(chainId).toString()) || !isHome? (
            <div>
              <Outlet />
            </div>
          ) : (
            <section className="bg-white dark:bg-white-900 m-auto">
              <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                  <h1 className="mb-4  text-7xl tracking-tight font-extrabold lg:text-5xl text-primary-600 dark:text-primary-500">
                    Not Supported Chain
                  </h1>
                  <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                    Sorry, Please Connect To A Supported Chain : Supported Chains
                    are {supportedChains.join(", ")}{" "}
                  </p>
                  <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                  You can know more by  <a href="https://chainlist.org/">clicking here</a> 
                  </p>
                  <Link
                    to="/faq"
                    className="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </section>
          )}
        </div>
      ) : (
        <section className="bg-white dark:bg-white-900 m-auto">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center">
              <h1 className="mb-4  text-7xl tracking-tight font-extrabold lg:text-5xl text-primary-600 dark:text-primary-500">
                Connect A Wallet
              </h1>
              <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                You Need To Connect A Wallet To Use This Dapp Effectively
              </p>
              <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                If you dont have a wallet{" "}
                <a href="https://metamask.io/download/">click here</a> to
                download one. Click the number{" "}
                <a href="https://wa.me/%2B2347068448786?text=Hi%20Odeyemi%20Increase%20Ayobami.%20Tried%20out%20your%20Dapp%2C%20having%20some%20slight%20difficulty.%20Can%20you%20be%20of%20any%20assistance%3F">
                  07068448786
                </a>{" "}
                to contact us. Thank you!!!
              </p>
              <p className="inline-flex text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4">
                <ConnectButton moralisAuth={false} />
              </p>
            </div>
          </div>
        </section>
      )}

      <Footer />
      <ToastContainer />
    </>
  );
};
export default Layout;
