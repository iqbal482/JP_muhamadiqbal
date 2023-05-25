import createCache from "@emotion/cache";

/**
 * @date 2022-09-11
 * @return {any}
 */
export default function createEmotionCache() {
  return createCache({ key: "css", prepend: true });
}
