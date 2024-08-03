import MainComponent from "../components/MainComponent";
import { MentionProvider } from "../contexts/MentionContext";
import { ProfileProvider } from "../contexts/ProfileContext";
import { TabProvider } from "../contexts/TabContext";
import { UserDataProvider } from "../contexts/UserDataContext";
import { SettingsProvider } from "../contexts/SettingsContext";

export default function App() {
    return (
        <SettingsProvider>
            <ProfileProvider>
                <UserDataProvider>
                    <TabProvider>
                        <MentionProvider>
                            <MainComponent />
                        </MentionProvider>
                    </TabProvider>
                </UserDataProvider>
            </ProfileProvider>
        </SettingsProvider>
    );
}
