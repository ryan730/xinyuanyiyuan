import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {
    DatetimePicker,
    NavBar,
    DatePicker,
    Picker,
    RadioGroup,
    Radio,
    Tab,
    Tabs,
    ActionBar,
    ActionBarIcon,
    ActionBarButton,
    Divider,
    Popup,
    Overlay,
    Loading,
    Dialog,
    ContactCard,
    Form,
    AddressEdit,
    AddressList,
    Field,
    CellGroup,
    Cell,
    SwipeCell,
    Icon,
    Stepper,
    Card,
    Checkbox,
    CheckboxGroup,
    Button,
    Swipe,
    SwipeItem,
    PullRefresh,
    List,
    SubmitBar,
    Toast,
    Skeleton,
    Col,
    Row,
    CountDown,
    showLoadingToast,
    showToast
} from "vant";
import "vant/lib/index.css"; // 全局引入样式
// import 'lib-flexible/flexible';
import xuexiTable from "./views/reportsComponent/xuexiTable.vue";
import suoluomenTable from "./views/reportsComponent/suoluomenTable.vue";
import suoluomenItem from "./views/reportsComponent/suoluomenItem.vue";

import "./config/rem.js";

const app = createApp(App);

app
    .use(DatetimePicker)
    .use(showToast)
    .use(showLoadingToast)
    .use(CountDown)
    .use(Col)
    .use(Row)
    .use(NavBar)
    .use(DatePicker)
    .use(Picker)
    .use(RadioGroup)
    .use(Radio)
    .use(Tab)
    .use(Tabs)
    .use(ActionBarButton)
    .use(ActionBarIcon)
    .use(ActionBar)
    .use(Divider)
    .use(Popup)
    .use(Overlay)
    .use(Loading)
    .use(Dialog)
    .use(Toast)
    .use(ContactCard)
    .use(Form)
    .use(AddressEdit)
    .use(AddressList)
    .use(Field)
    .use(CellGroup)
    .use(Cell)
    .use(SwipeCell)
    .use(Icon)
    .use(Stepper)
    .use(Card)
    .use(Button)
    .use(Swipe)
    .use(SwipeItem)
    .use(PullRefresh)
    .use(List)
    .use(SubmitBar)
    .use(Checkbox)
    .use(CheckboxGroup)
    .use(Skeleton)
    .component("xuexiTable", xuexiTable)
    .component("suoluomenTable", suoluomenTable)
    .component("suoluomenItem", suoluomenItem);

app.use(router);
app.use(store);

window.st = store;

app.mount("#app");
