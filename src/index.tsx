import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const { worker } = await import("./mock/browser");

  await worker.start({
    onUnhandledRequest: "bypass",
  });
}

enableMocking().then(() => {
  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  );

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  });


// async function mountApp() {
//   if (process.env.NODE_ENV === "development") {
//     const {worker} = require("./mock/browser")
//     worker.start(); // MSW 시작
//   }
  
//     const root = ReactDOM.createRoot(
//     document.getElementById('root') as HTMLElement
//   );
//   root.render(
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   );
// }

// mountApp();

