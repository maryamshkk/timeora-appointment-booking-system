import NotificationsPage from "./NotificationsPage";
import {
    useStaffNotifications,
    useStaffMarkRead,
    useStaffMarkAll,
} from "../../hooks/useNotifications";

export default function StaffNotifications() {
    return (
        <NotificationsPage
            useList={useStaffNotifications}
            useMarkRead={useStaffMarkRead}
            useMarkAll={useStaffMarkAll}
            basePath="/staff"
        />
    );
}