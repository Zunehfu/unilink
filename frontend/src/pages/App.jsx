import MainComponent from "../components/MainComponent";
import { ProfileProvider } from "../contexts/ProfileContext";
import { TabProvider } from "../contexts/TabContext";
import { UserDataProvider } from "../contexts/UserDataContext";

export default function App() {
    return (
        <ProfileProvider>
            <UserDataProvider>
                <TabProvider>
                    <MainComponent />
                </TabProvider>
            </UserDataProvider>
        </ProfileProvider>
    );
}
