import React, { Component } from "react";
import SettingsPresenter from "./SettingsPresenter";
import { Mutation, Query } from "react-apollo";
import { USER_PROFILE } from "../../sharedQueries";
import { userProfile } from "../../types/api";
import { LOG_USER_OUT } from "../../sharedQueries.local";

class MiniProfileQuery extends Query<userProfile> {}
class SettingsContainer extends Component {
    render() {
        return (
            <Mutation mutation={LOG_USER_OUT}>
                {(logUserOut) => (
                    <MiniProfileQuery query={USER_PROFILE}>
                        {({ data, loading: userDataLoading }) => (
                            <SettingsPresenter
                                userDataLoading={userDataLoading}
                                userData={data}
                                logUserOut={logUserOut}
                            />
                        )}
                    </MiniProfileQuery>
                )}
            </Mutation>
        );
    }
}

export default SettingsContainer;
