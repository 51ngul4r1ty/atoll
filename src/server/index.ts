// externals
import * as express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import chalk from "chalk";
import manifestHelpers from "express-manifest-helpers";
import path from "path";

// libraries
import { configureStore, createServerHistory, storeHistoryInstance, getHistoryInstance } from "@atoll/shared";

// config
import paths from "../../config/paths";

// utils
import errorHandler from "./middleware/errorHandler";
import serverRenderer from "./middleware/serverRenderer";

// routes
import { router } from "./api/routes";

// data access
import { init } from "./dataaccess";

init();

require("dotenv").config();

const app = express.default();

// Use Nginx or Apache to serve static assets in production or remove the if() around the following
// lines to use the express.static middleware to serve assets for production (not recommended!)
if (process.env.NODE_ENV === "development") {
    app.use(paths.publicPath, express.static(path.join(paths.clientBuild, paths.publicPath)));
}

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const EXCLUDED_URLS: string[] = ["/favicon.ico"];

const isApiUrl = (url: string) => url.startsWith("/api");
const includeUrl = (url: string) => !EXCLUDED_URLS.includes(url) && !isApiUrl(url);

const addStore = (_req: express.Request, res: express.Response, next: express.NextFunction | undefined): void => {
    let history: any;
    if (includeUrl(_req.url)) {
        history = createServerHistory({ initialEntries: [_req.url] });
        storeHistoryInstance(history);
    } else {
        history = getHistoryInstance();
    }

    if (history) {
        res.locals.store = configureStore({ history, middleware: [] });
    } else {
        console.log("INFO: skipping store creation - REST API call must have preceded app url request");
    }
    if (typeof next !== "function") {
        throw new Error("Next handler is missing");
    }
    next();
};

app.use(addStore);

const manifestPath = path.join(paths.clientBuild, paths.publicPath);

app.use(
    manifestHelpers({
        manifestPath: `${manifestPath}/manifest.json`
    })
);

app.use("/api/v1", router);

app.use(serverRenderer());

app.use(errorHandler);

app.listen(process.env.PORT || 8500, () => {
    console.log(`[${new Date().toISOString()}]`, chalk.blue(`App is running: http://localhost:${process.env.PORT || 8500}`));
});

export default app;
