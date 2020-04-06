import React, { Component } from "react";
import SettingsPresenter from "./SettingsPresenter";
import { Mutation, Query } from "react-apollo";
import { USER_PROFILE, GET_PLACES } from "../../sharedQueries";
import { userProfile, getPlaces } from "../../types/api";
import { LOG_USER_OUT } from "../../sharedQueries.local";

class MiniProfileQuery extends Query<userProfile> {}

class PlacesQuery extends Query<getPlaces> {}

class SettingsContainer extends Component {
    render() {
        return (
            <Mutation mutation={LOG_USER_OUT}>
                {(logUserOut) => (
                    <MiniProfileQuery query={USER_PROFILE}>
                        {({ data: userData, loading: userDataLoading }) => (
                            <PlacesQuery query={GET_PLACES}>
                                {({
                                    data: placesData,
                                    loading: placesLoading,
                                }) => (
                                    <SettingsPresenter
                                        userDataLoading={userDataLoading}
                                        placesLoading={placesLoading}
                                        userData={userData}
                                        placesData={placesData}
                                        logUserOut={logUserOut}
                                    />
                                )}
                            </PlacesQuery>
                        )}
                    </MiniProfileQuery>
                )}
            </Mutation>
        );
    }
}

export default SettingsContainer;
