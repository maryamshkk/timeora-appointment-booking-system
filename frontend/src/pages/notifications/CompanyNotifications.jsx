import NotificationsPage from "./NotificationsPage";
import {
    useCompanyNotifications,
    useCompanyMarkRead,
    useCompanyMarkAll,
} from "../../hooks/useNotifications";

export default function CompanyNotifications() {
    return (
        <NotificationsPage
            useList={useCompanyNotifications}
            useMarkRead={useCompanyMarkRead}
            useMarkAll={useCompanyMarkAll}
            basePath="/company"
        />
    );
}