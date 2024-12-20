import * as url from "url";
const config = {
  PORT: 9000,
  DIRNAME: url.fileURLToPath(new URL(".", import.meta.url)),

  get UPLOADS_DIR() {
    return `${this.DIRNAME}/public/uploads`;
  },
};
export default config;
