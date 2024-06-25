import { TAG_MAP, RENDER_COMMAND } from "./constant.js";
export const handleProps = (ele, props) => {
  if (props?.style) ele.style = props.style;
  if (props?.class) {
    const classArr = props.class.split(" ");
    classArr.forEach((item) => {
      ele.classList.add(item);
    });
  }
  if (props.src) ele.src = props.src;
  if (props.hIf !== undefined && props.hIf === "false") {
    ele.style.display = "none";
  }
  if (props?.eventclick) {
    ele.onclick = function () {
      const eventName = props?.eventclick;
      window.JSBridge.postNativeMessage({
        type: "event",
        eventName,
        pageId: window.pageId,
      });
    };
  }
};
export const handleCommand = (commandList) => {
  commandList
    .sort((a, b) => a.nodeId - b.nodeId)
    .forEach((command) => {
      const { type, tag, parentId, content, nodeId, props } = command;
      if (type === RENDER_COMMAND.CREATE) {
        let element = null;
        if (TAG_MAP[tag]) {
          element = document.createElement(`${TAG_MAP[tag]}`);
        } else {
          element = document.createElement(tag);
        }
        element.id = "node" + nodeId;
        if (content) element.innerText = content;
        if (tag !== "page" && props !== null) handleProps(element, props);
        if (parentId === "root") {
          document.querySelector("#root").appendChild(element);
        } else {
          const parentElement = document.querySelector(`#node${parentId}`);
          if (parentElement) parentElement.appendChild(element);
        }
      } else if (type === RENDER_COMMAND.DELETE) {
        const parentElement = document.querySelector(`#node${parentId}`);
        const element = document.querySelector(`#node${nodeId}`);
        parentElement.removeChild(element);
      } else if (type === RENDER_COMMAND.UPDATE) {
        const element = document.querySelector(`#node${nodeId}`);
        if (content) element.innerText = content;
      }
    });
};
export function setCssToStyleHead(styleString) {
  let styleText = "";
  styleText = styleString.replace("page", "body");
  styleText = styleText.replace(/rpx/g, "px");
  const headElement = document.head;
  const style = document.createElement("style");
  style.innerHTML = styleText;
  headElement.appendChild(style);
}
