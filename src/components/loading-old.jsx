const React = require('react');
const ReactDOM = require('react-dom');
import loadingpic from '../img/loading.png'
import loadingpicIE8 from '../img/ie8-loading.gif'
let div, _div, isIE = false, isIEinit = true
let fullBody = document.querySelector('body')


let loading = {
    init() {
        /**
         * 判断是否为ie浏览器
         * */
        if (isIEinit) {
            let explorer = navigator.userAgent
            if (explorer.indexOf("MSIE") >= 0) {
                isIE = true
            }
            isIEinit = false
        }
    },

    show(e) {
        let target = this.parents(e)
        _div = document.createElement('div')
        _div.classList.add('c-container')
        target.appendChild(_div)
        this.loadingTier(_div)
    },
    close(e) {
        let target = this.lookforParents(e)
        let _conter
        Array.prototype.map.call(target.children, function (t) {
            if (t.classList.contains('c-container')) {
                _conter = t
            }
        })
        ReactDOM.unmountComponentAtNode(_conter)
        _conter.parentNode.removeChild(_conter);
    },
    fullShow() {
        if (fullBody.classList.contains('c-loading-translate')) return
        _div = document.createElement('div')
        document.body.appendChild(_div)
        fullBody.classList.add('c-loading-translate')
        this.loadingTier(_div)
    },
    fullClose() {
        if (!fullBody.classList.contains('c-loading-translate')) return
        fullBody.classList.remove('c-loading-translate')
        ReactDOM.unmountComponentAtNode(_div)
        _div.parentNode.removeChild(_div);
        _div = null;
    },
    parents(e) {
        // 判断点击目标是否为c-loading-translate
        if (e.target.classList.contains('c-loading')) {
            e.target.classList.add('c-loading-translate')
            return e.target
        } else {
            return this.lookforParents(e)
        }
    },
    lookforParents(e) {
        /**
         * 触发孙级元素时候 查找c-loading
         * */
        let _t
        _t = e.target
        while (!_t.classList.contains('c-loading')) {
            _t = _t.parentNode
        }
        _t.classList.remove('c-loading-translate')
        return _t
    },
    loadingTier(targetDom) {
        ReactDOM.render(
            <div className="c-loading-animated">
                <div className="c-pic-module">
                    <Greeting isIE={isIE}/>
                </div>
            </div>
            , targetDom)
    }
}

function Greeting(props) {
    const _isIE = props.isIE;
    if (_isIE) {
        return <img src={loadingpicIE8}/>
    }
    return <img src={loadingpic}/>
}

module.exports = loading
