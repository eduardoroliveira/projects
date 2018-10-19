export function showMessage(message) {
  const messageEl = document.getElementById("message");
  messageEl.replaceChild(
    document.createTextNode(message),
    messageEl.childNodes[0]
  );
}
