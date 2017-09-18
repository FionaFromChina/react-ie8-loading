const React = require('react');
const ReactDOM = require('react-dom');
import loadingpic from '../img/loading.png'
import loadingpicIE8 from '../img/ie8-loading.gif'
import $ from 'jquery'
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
        console.log('1=>')
        let target = this.parents(e)
        _div = document.createElement('div')
        $(_div).addClass('c-container')
        $(target).append(_div)
        this.loadingTier(_div)
    },
    close(e) {
        alert('2=>')
        let target = this.lookforParents(e)
        // let _conter
        $(target).find('.c-container').remove()
        // ReactDOM.unmountComponentAtNode(_conter[0])
        // _conter.remove()
    },
    fullShow() {
        if ($('body').hasClass('c-loading-translate')) return
        _div = document.createElement('div')
        $('body').append(_div)
        $('body').addClass('c-loading-translate')
        this.loadingTier(_div)
    },
    fullClose() {
        if (!$('body').hasClass('c-loading-translate')) return
        $('body').removeClass('c-loading-translate')
        ReactDOM.unmountComponentAtNode(_div)
        _div.parentNode.removeChild(_div);
        _div = null;
    },
    parents(e) {
        // 判断点击目标是否为c-loading-translate
        if ($(e.target).hasClass('c-loading')) {
            $(e.target).addClass('c-loading-translate')
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
        if (!$(e.target).hasClass('c-loading')) {
            _t = $(e.target).parents('.c-loading')
        }
        console.log('3=>')
        // _t.removeClass('c-loading-translate')
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
