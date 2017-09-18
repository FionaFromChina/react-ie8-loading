import React, {Component} from 'react';
import Loading from '../components/loading'

 class Sample extends Component {
    constructor () {
        super()
        this.state = { flag: true }
    }

    componentDidMount () {
        /**
         *  // TODO 浏览器判断移至 loading 中
         * 判断是否为 ie 浏览器， 按需加载 css3 动画样式。
         * */
        // let explorer = navigator.userAgent
        // if (explorer.indexOf("MSIE") >= 0) {
        //     alert("ie");
        // } else {
        //     document.querySelector('head').innerHTML += '<link href="loading.css" rel="stylesheet">'
        // }
        Loading.init()

    }

    /**
     * 动画切换
     * */
    transAnimatied (e) {
        // TODO 移除loading窗口获取父级类名

        if (this.state.flag) {
            alert('>>>-1')
            Loading.show(e)
            this.setState({
                flag: !this.state.flag
            })
        } else {
            alert('>>>-2')
            Loading.close(e)
            this.setState({
                flag: !this.state.flag
            })
        }
    }

    fullShow () {
        Loading.fullShow()
    }

    fullClose () {
        Loading.fullClose()
    }

    render() {
        return (
            <div className="container">
                <div className="sample-list c-loading"
                     onClick={this.transAnimatied.bind(this)}>
                    <p>321321312</p>
                    123
                </div>

                <button className="test-bottom test-bottom-1 " onClick={this.fullShow.bind(this)}>fullShow</button>
                <button  className="test-bottom test-bottom-2"onClick={this.fullClose.bind(this)}>fullClose</button>
            </div>
        )
    }
}

module.exports =Sample