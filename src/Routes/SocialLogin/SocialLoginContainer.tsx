import React from "react";
import SocialLoginPresenter from "./SocialLoginPresenter";
import { Mutation, MutationFn } from "react-apollo";
import { facebookConnect, facebookConnectVariables } from "../../types/api";
import { FACEBOOK_CONNECT } from "./SocialLoginQueries";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";

class LoginMutation extends Mutation<
    facebookConnect,
    facebookConnectVariables
> {}

interface IState {
    firstName: string;
    lastName: string;
    email?: string;
    fbId: string;
}

interface IProps extends RouteComponentProps<any> {}

class SocialLoginContainer extends React.Component<IProps, IState> {
    public state = {
        firstName: "",
        lastName: "",
        email: "",
        fbId: ""
    };
    public facebookMutation: MutationFn;
    public render() {
        return (
            <LoginMutation mutation={FACEBOOK_CONNECT}>
                {(facebookMutation, { loading }) => {
                    this.facebookMutation = facebookMutation;
                    return (
                        <SocialLoginPresenter
                            loginCallback={this.loginCallback}
                        />
                    );
                }}
            </LoginMutation>
        );
    }

    public loginCallback = response => {
        const {
            name,
            first_name,
            last_name,
            email,
            id,
            accessToken
        } = response;
        if (accessToken) {
            toast.success(`Welcome ${name}`);
            this.facebookMutation({
                variables: {
                    firstName: first_name,
                    lastName: last_name,
                    email,
                    fbId: id
                }
            });
        } else {
            toast.error("Could not log you in ");
        }
    };
}

export default SocialLoginContainer;
