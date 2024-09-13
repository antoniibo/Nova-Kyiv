import AboutData from "../ForAbout/AboutData";
import PayDelivery from "../ForAbout/PayDelivery";
import SwapReturn from "../ForAbout/SwapReturn";
import Oferta from "../ForAbout/Oferta";
import Policies from "../ForAbout/Policies";

export const aboutlinks = [
    { id: 0, path: '/about', heading: "Про нас", component: AboutData },
    { id: 1, path: '/pay-delivery', heading: "Оплата і доставка", component: PayDelivery },
    { id: 2, path: '/swap-return', heading: "Обмін та повернення", component: SwapReturn },
    { id: 3, path: '/oferta', heading: "Публічний договір", component: Oferta },
    { id: 4, path: '/policy', heading: "Політика конфіденційності", component: Policies }
];