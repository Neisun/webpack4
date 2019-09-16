function Content(){
    var root = document.getElementById("root");
    var content = document.createElement('div');
    content.innerText = "content部分";
    root.append(content);
}
export default Content;