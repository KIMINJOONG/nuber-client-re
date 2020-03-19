import React from "react";

interface IProps {
    submitFn: any;
}

const Form: React.SFC<IProps> = ({ submitFn }) => (
    <form
        onSubmit={e => {
            e.preventDefault();
            submitFn();
        }}
    />
);

export default Form;
