import NotificationsPage from "./NotificationsPage";
import {
    useCustomerNotifications,
    useCustomerMarkRead,
    useCustomerMarkAll,
} from "../../hooks/useNotifications";

export default function CustomerNotifications() {
    return (
        <NotificationsPage
            useList={useCustomerNotifications}
            useMarkRead={useCustomerMarkRead}
            useMarkAll={useCustomerMarkAll}
            basePath="/customer"
        />
    );
}