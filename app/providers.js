import { Toaster } from "react-hot-toast"

function Providers({children}) {
  return (
    <>
      {children}
      <Toaster position="top-center" />
    </>
  );
}

export default Providers
