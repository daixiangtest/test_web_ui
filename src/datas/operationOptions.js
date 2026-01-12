// 页面操作
const pageSteps = [
    {
        keyword: '启动浏览器',
        method: "open_browser",
        params: {
            "browser_type": "chromium"
        },
    },
    {
        keyword: '访问网站URL',
        method: "open_url",
        params: {
            url: '',
            wait_until: 'load',
            timeout: 30000
        }
    },
    {
        keyword: '刷新页面',
        method: "refresh",
        params: {}
    },
    {
        keyword: '页面后退',
        method: "go_back",
        params: {}
    },
    {
        keyword: '清空cookie',
        method: "reset_browser_context",
        params: {}
    },
    {
        keyword: '新建窗口页',
        method: "open_new_page",
        params: {
            tag: ""
        }
    },
    {
        keyword: '切换页面',
        method: "switch_to_page",
        params: {
            tag: '',
            index: '',
            title: '',
            url: ''
        }
    },
    {
        keyword: '关闭页面',
        method: "close_page",
        params: {
            tag: '',
            index: '',
            title: '',
            url: ''
        }
    },
    {
        keyword: "关闭浏览器",
        method: "close",
        params: {}
    },
    {
        keyword: '滚动到指定高度位置',
        method: "scroll_to_height",
        params: {
            height: 0,
        }
    },
    {
        keyword: '执行JavaScript脚本',
        method: "execute_script",
        params: {
            script: '',
            args: []
        }

    },
]
// 元素操作
const elementSteps = [
    {
        keyword: '输入内容',
        method: "fill_value",
        params: {
            locator: '',
            value: "",
            timeout: 20000
        }
    },
    {
        keyword: '点击元素',
        method: "click_ele",
        params: {
            locator: "",
            button: 'left',
            count: 1,
            timeout: 20000
        }

    },
    {
        keyword: '清空输入框内容',
        method: "clear_value",
        params: {
            locator: "",
            timeout: 20000
        }

    },
    {
        keyword: '选中复选框',
        method: "set_checked",
        params: {
            locator: "",
            timeout: 20000
        }

    },
    {
        keyword: '鼠标悬停到元素上方',
        method: "hover",
        params: {
            locator: "",
            timeout: 20000
        }

    },
    {
        keyword: '聚焦元素',
        method: "focus_element",
        params: {
            locator: "",
            timeout: 20000
        }

    }, {
        keyword: '选择下拉框的选项',
        method: "select_option",
        params: {
            locator: "下拉框定位表达式",
            value: "选项的值",
            timeout: 20000
        }

    },
    {
        keyword: '键盘输入值',
        method: "type_value",
        params: {
            locator: "",
            value: "输入的值",
            timeout: 20000
        }

    },
    {
        keyword: '拖拽元素',
        method: "drag_and_drop",
        params: {
            start_selector: "",
            end_selector: "",
            timeout: 20000
        }
    },
    {
        keyword: '长按元素',
        method: "long_click_element",
        params: {
            locator: "",
            delay: 0.1,
        }
    }
]

// 鼠标操作步骤
const mouseSteps = [
    {
        keyword: '鼠标点击',
        method: "mouse_click",
        params: {
            x: 0,
            y: 0,
            button: 'left',
            count: 1
        }
    },
    {
        keyword: '鼠标移动',
        method: "move_mouse",
        params: {
            x: 0,
            y: 0,
        }
    },
    {
        keyword: '鼠标按下',
        method: "mouse_down",
        params: {
            button: 'left',
        }
    },
    {
        keyword: '鼠标抬起',
        method: "mouse_up",
        params: {
            button: 'left',
        }
    },
    {
        keyword: '鼠标滚动',
        method: "mouse_wheel",
        params: {
            x: 0,
            y: 0
        }
    },
    {
        keyword: '键盘按键',
        method: "press_key",
        params: {
            key: 'enter',
        }
    },

]
// IframeS操作
const IframeSteps = [
    {
        keyword: 'iframe内元素输入',
        method: "frame_fill_value",
        params: {
            frame: "",
            locator: '',
            value: "",
            timeout: 20000
        }
    },
    {
        keyword: 'iframe内元素点击',
        method: "frame_click_element",
        params: {
            frame: "",
            locator: "",
            button: "left",
            count: 1,
            timeout: 20000
        }
    },
    {
        keyword: 'iframe内元素悬停',
        method: "frame_hover",
        params: {
            frame: "",
            locator: "",
            timeout: 20000
        }
    },
    {
        keyword: 'iframe内元素聚焦',
        method: "frame_focus_element",
        params: {
            frame: "",
            locator: "",
            timeout: 20000
        }
    },
    {
        keyword: 'iframe内元素键盘输入',
        method: "frame_type_value",
        params: {
            frame: "",
            value: "",
            locator: "",
            timeout: 20000
        }
    },
    {
        keyword: 'iframe内元素长按',
        method: "frame_long_click_element",
        params: {
            frame: "",
            value: "",
            delay: 0.1,
        }
    },
    {
        keyword: 'iframe内元素拖拽',
        method: "frame_drag_and_drop",
        params: {
            frame: "",
            start_selector: "",
            end_selector: '',
            timeout: 20000
        }
    },

]

// 等待操作
const waitSteps = [
    {
        keyword: '设置默认等待时间',
        method: "set_default_timeout",
        params: {
            timeout: 20000,
        }
    },
    {
        keyword: '强制等待',
        method: "wait_for_time",
        params: {
            timeout: 2000,
        }
    },
    {
        keyword: '等待页面加载完成',
        method: "wait_for_load",
    },
    {
        keyword: '等待网络请求完成',
        method: "wait_for_network",
    },
    {
        keyword: '等待元素可见',
        method: "wait_for_element",
        params: {
            locator: "",
            timeout: 20000
        }
    }
]
// 断言处理
const assertSteps = [
    {
        keyword: '断言页面标题',
        method: "assert_page_title",
        params: {
            expect_results: "",
            is_equal: false,

        }
    },
    {
        keyword: '断言页面url地址',
        method: "assert_page_url",
        params: {
            expect_results: "",
            is_equal: false,

        }
    },
    {
        keyword: '断言元素value属性',
        method: "except_to_have_value",
        params: {
            locator: "",
            expect_results: "",
            is_equal: false
        }
    },
    {
        keyword: '断言元素文本值',
        method: "except_to_have_text",
        params: {
            locator: "",
            expect_results: "",
            is_equal: false
        }
    },
    {
        keyword: '断言元素属性值',
        method: "except_to_have_attribute",
        params: {
            locator: "",
            attr_name: "",
            expect_results: "",
            is_equal: false
        }
    },
    {
        keyword: '断言元素可见',
        method: "except_to_be_visible",
        params: {
            locator: "",
            index: 1,
        }
    },
    {
        keyword: '断言元素隐藏',
        method: "except_to_be_hidden",
        params: {
            locator: "",
            index: 1,
        }
    },
    {
        keyword: '断言元素可用',
        method: "except_to_be_enabled",
        params: {
            locator: "",
            index: 1,
        }
    },
    {
        keyword: '断言元素禁用',
        method: "except_to_be_disabled",
        params: {
            locator: "",
            index: 1,
        }
    },
    {
        keyword: '断言元素被选中',
        method: "except_to_be_checked",
        params: {
            locator: "",
            index: 1,
        }
    },
    {
        keyword: '断言元素可编辑',
        method: "except_to_be_editable",
        params: {
            locator: "",
            index: 1,
        }
    },
    {
        keyword: '断言元素获取焦点',
        method: "except_to_be_focused",
        params: {
            locator: "",
            index: 1,
        }
    },
]
// 其他操作
const otherSteps = []

const actionGroup = [
    {
        groupId: "1",
        groupIcon: 'Reading',
        name: '页面操作',
        items: pageSteps,
    },
    {
        groupId: "2",
        groupIcon: 'Edit',
        name: '元素操作',
        items: elementSteps,
    },
    {
        groupId: "3",
        groupIcon: 'Mouse',
        name: '鼠标键盘',
        items: mouseSteps,
    },
    {
        groupId: "4",
        groupIcon: 'Clock',
        name: '等待操作',
        items: waitSteps,
    },
    {
        groupId: "5",
        groupIcon: 'Guide',
        name: '断言处理',
        items: assertSteps,
    },
    {
        groupId: "6",
        groupIcon: 'Connection',
        name: 'Iframe操作',
        items: IframeSteps,
    },
    {
        groupId: "7",
        groupIcon: 'Loading',
        name: '其他操作',
        items: otherSteps,
    }
]
export default actionGroup