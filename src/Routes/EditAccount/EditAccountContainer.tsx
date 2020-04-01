import React from "react";
import { Mutation } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { updateProfile, updateProfileVariables } from "../../types/api";
import EditAccountPresenter from "./EditAccountPresenter";
import { UPDATE_PROFILE } from "./EditAccountQueries";
import { USER_PROFILE } from "src/sharedQueries";
import { toast } from "react-toastify";

interface IState {
    firstName: string;
    lastName: string;
    email: string;
    profilePhoto: string;
}

interface IProps extends RouteComponentProps<any> {}

class UpdateProfileMutation extends Mutation<
    updateProfile,
    updateProfileVariables
> {}

class EditAccountContainer extends React.Component<IProps, IState> {
    public state = {
        email: "",
        firstName: "",
        lastName: "",
        profilePhoto: ""
    };
    public render() {
        const { email, firstName, lastName, profilePhoto } = this.state;
        return (
            <UpdateProfileMutation
                mutation={UPDATE_PROFILE}
                refetchQueries={[{ query: USER_PROFILE }]}
                onCompleted={data => {
                    const { UpdateMyProfile } = data;
                    if (UpdateMyProfile.ok) {
                        toast.success("Profile updated!");
                    } else if (UpdateMyProfile.error) {
                        toast.error(UpdateMyProfile.error);
                    }
                }}
                variables={{
                    email,
                    firstName,
                    lastName,
                    profilePhoto
                }}
            >
                {(updateProfileFn, { loading }) => (
                    <EditAccountPresenter
                        email={email}
                        firstName={firstName}
                        lastName={lastName}
                        profilePhoto={profilePhoto}
                        onInputChange={this.onInputChange}
                        loading={loading}
                        onSubmit={updateProfileFn}
                    />
                )}
            </UpdateProfileMutation>
        );
    }
    public onInputChange: React.ChangeEventHandler<
        HTMLInputElement
    > = event => {
        const {
            target: { name, value }
        } = event;

        this.setState({
            [name]: value
        } as any);
    };
}

export default EditAccountContainer;
