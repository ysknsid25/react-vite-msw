import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

async function enableMocking() {
    if (process.env.NODE_ENV !== "development") {
        return;
    }

    const { worker } = await import("./mocks/browser");

    // デフォルトの設定だと、モックされていないAPIリクエストに対して、コンソールに警告が出てうるさいので、
    // このオプションを設定して黙らせる
    return worker.start({
        onUnhandledRequest: "bypass",
    });
}

enableMocking().then(() => {
    createRoot(document.getElementById("root")!).render(
        <StrictMode>
            <App />
        </StrictMode>
    );
});
