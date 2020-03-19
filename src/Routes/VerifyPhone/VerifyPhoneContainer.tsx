import React from "react";
import { RouteComponentProps } from "react-router-dom";
import VerifyPhonePresenter from "./VerifyPhonePresenter";
import { Mutation } from "react-apollo";
import { verifyPhone, verifyPhoneVariables } from "src/types/api";
import { VERIFY_PHONE } from "./VerifyPhoneQueries";
import { toast } from "react-toastify";
import { LOG_USER_IN } from "src/sharedQueries";

interface IState {
    verificationKey: string;
    phoneNumber: string;
}

interface IProps extends RouteComponentProps<any> {}

class VerifyMutation extends Mutation<verifyPhone, verifyPhoneVariables> {}

class VerifyPhoneContainer extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        if (!props.location.state) {
            props.history.push("/");
        }
        const location: any = props.location;
        this.state = {
            phoneNumber: location.phone,
            verificationKey: ""
        };
    }
    public render() {
        const { verificationKey, phoneNumber } = this.state;
        return (
            <Mutation mutation={LOG_USER_IN}>
                {logUserIn => (
                    <VerifyMutation
                        mutation={VERIFY_PHONE}
                        variables={{
                            key: verificationKey,
                            phoneNumber
                        }}
                        onCompleted={data => {
                            const { CompletePhoneVerification } = data;
                            if (CompletePhoneVerification.ok) {
                                if (CompletePhoneVerification.token) {
                                    logUserIn({
                                        variables: {
                                            token:
                                                CompletePhoneVerification.token
                                        }
                                    });
                                }
                                toast.success("You're verified, loggin in now");
                            } else {
                                toast.error(CompletePhoneVerification.error);
                            }
                        }}
                    >
                        {(mutation, { loading }) => (
                            <VerifyPhonePresenter
                                onSubmit={mutation}
                                onChange={this.onInputChange}
                                verificationKey={verificationKey}
                                loading={loading}
                            />
                        )}
                    </VerifyMutation>
                )}
            </Mutation>
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

export default VerifyPhoneContainer;
