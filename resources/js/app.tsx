import "./bootstrap";
import "../css/app.css";

import { createRoot, hydrateRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { ThemeProvider } from "@/Context/ThemeContext";
import { LanguageProvider } from "@/Context/LanguageContext";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${appName} • ${title} `,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob("./Pages/**/*.tsx")
        ),
    setup({ el, App, props }) {
        const root = el.hasChildNodes()
            ? hydrateRoot(el, <App {...props} />)
            : createRoot(el).render(
                  <LanguageProvider>
                      <ThemeProvider>
                          <App {...props} />
                      </ThemeProvider>
                  </LanguageProvider>
              );
    },
    progress: {
        color: "#4B5563",
    },
});
