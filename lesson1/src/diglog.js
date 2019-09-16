function Diglog(root) {
    this.element = document.createElement('div');
    root.append(this.element);
    this.element.style.display = "none";
    this.flag = false;
}
Diglog.prototype.show = function () {
    if(this.flag){
        this.element.style.display = "block";
    }else {
        this.element.style.display = "none";
    }
}
Diglog.prototype.open = function () {
    this.flag = true;
    this.element.innerHTML = "打开了"
    this.show();
}
Diglog.prototype.close = function () {
    this.element.innerHTML = "关闭了"
    this.flag = false;
    this.show();
}
export default Diglog;