import { browser } from "$app/environment";

export const isMac = browser
    ? ('userAgentData' in navigator)
        ? (navigator as any).userAgentData?.platform?.toLowerCase()?.includes('mac')
        : navigator.userAgent.toLowerCase().includes('mac')
    : false;

export const isMobile = browser
    ? /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    : false;
