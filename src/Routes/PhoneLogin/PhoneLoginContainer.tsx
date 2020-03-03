import React, { ChangeEventHandler, FormEventHandler } from "react";
import { RouteComponentProps } from "react-router-dom";
import PhoneLoginPresenter from "./PhoneLoginPresenter";

interface IState {
    countryCode: string;
    phoneNumber: string;
}
class PhoneLoginContainer extends React.Component<
    RouteComponentProps<any>,
    IState
> {
    public state = {
        countryCode: "+82",
        phoneNumber: "1234"
    };
    public render() {
        const { countryCode, phoneNumber } = this.state;
        return (
            <PhoneLoginPresenter
                countryCode={countryCode}
                phoneNumber={phoneNumber}
                onInputChange={this.onInputChange}
                onSubmit={this.onSubmit}
            />
        );
    }

    public onInputChange: ChangeEventHandler<
        HTMLInputElement | HTMLSelectElement
    > = event => {
        const {
            target: { name, value }
        } = event;
        this.setState({
            [name]: value
        } as any);
    };

    public onSubmit: FormEventHandler<HTMLFormElement> = event => {
        event.preventDefault();
        const { countryCode, phoneNumber } = this.state;
        // ts-lint:disable-next-line
        console.log(countryCode, phoneNumber);
    };
}

export default PhoneLoginContainer;
