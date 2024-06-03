import MainComponent from "../components/MainComponent";
import { MentionProvider } from "../contexts/MentionContext";
import { ProfileProvider } from "../contexts/ProfileContext";
import { TabProvider } from "../contexts/TabContext";
import { UserDataProvider } from "../contexts/UserDataContext";
export default function App() {
    return (
        <ProfileProvider>
            <UserDataProvider>
                <TabProvider>
                    <MentionProvider>
                        <MainComponent />
                    </MentionProvider>
                </TabProvider>
            </UserDataProvider>
        </ProfileProvider>
    );
}
