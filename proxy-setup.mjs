import { setGlobalDispatcher, ProxyAgent } from 'undici';
if (process.env.HTTPS_PROXY) {
  setGlobalDispatcher(new ProxyAgent(process.env.HTTPS_PROXY));
}
