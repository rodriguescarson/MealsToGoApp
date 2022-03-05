import React, { useContext, useCallback, useState } from "react";
import styled from "styled-components/native";
import { useFocusEffect } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { List, Avatar } from "react-native-paper";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "../../../infrastructure/theme/colors";
const TransparentSafeArea = styled(SafeArea)`
    background-color: transparent;
`;
const SettingsBackground = styled.ImageBackground.attrs({
    source: require("../../../../assets/home_bg.jpg")
})`
    position: absolute;
    height: 100%;
    width: 100%;
`;
const SettingsItem = styled(List.Item)`
    padding: ${props => props.theme.space[3]};
    background-color: rgba(255, 255, 255, 0.4);
`;
const AvatarContainer = styled.View`
    align-items: center;
`;

export const SettingsScreen = ({ navigation }) => {
    const { onLogout, user } = useContext(AuthenticationContext);
    const [photo, setPhoto] = useState(null);

    const getProfilePicture = async currentUser => {
        const photoUri = await AsyncStorage.getItem(`${currentUser.uid}-photo`);
        setPhoto(photoUri);
    };

    useFocusEffect(
        useCallback(() => {
            getProfilePicture(user);
        }, [user])
    );
    return (
        <SettingsBackground>
            <TransparentSafeArea>
                <AvatarContainer>
                    <TouchableOpacity onPress={() => navigation.navigate("CameraScreen")}>
                        {!photo ? (
                            <Avatar.Icon
                                size={180}
                                icon="human"
                                backgroundColor={colors.brand.primary}
                            />
                        ) : (
                            <Avatar.Image
                                size={180}
                                source={{ uri: photo || "../../../../assets/favicon.png" }}
                                backgroundColor={colors.brand.primary}
                            />
                        )}
                    </TouchableOpacity>
                    <Spacer position="top" size="large">
                        <Text variant="label">{user.email}</Text>
                    </Spacer>
                </AvatarContainer>

                <List.Section>
                    <SettingsItem
                        title="Favourites"
                        description="View your favourites"
                        left={props => (
                            <List.Icon {...props} color={colors.ui.error} icon="heart" />
                        )}
                        onPress={() => navigation.navigate("FavouritesScreen")}
                    />
                    <Spacer />
                    <SettingsItem
                        title="Payment"
                        left={props => (
                            <List.Icon {...props} color={colors.ui.secondary} icon="cart" />
                        )}
                        onPress={() => null}
                    />
                    <Spacer />
                    <SettingsItem
                        title="Past Orders"
                        left={props => (
                            <List.Icon {...props} color={colors.ui.secondary} icon="history" />
                        )}
                        onPress={() => null}
                    />
                    <Spacer />
                    <SettingsItem
                        title="Logout"
                        left={props => (
                            <List.Icon {...props} color={colors.ui.secondary} icon="door" />
                        )}
                        onPress={onLogout}
                    />
                </List.Section>
            </TransparentSafeArea>
        </SettingsBackground>
    );
};
