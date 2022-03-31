import { printLog } from "./shared";

const copyTextToClipBoard = (text) => {
  printLog(text);
  const el = document.createElement("textarea");
  el.style.display = "none";
  el.value = text;
  document.body.appendChild(el);
  el.select();
  el.setSelectionRange(0, 99999);
  document.execCommand("copy");
  // document.body.removeChild(el);
};

export default copyTextToClipBoard;
