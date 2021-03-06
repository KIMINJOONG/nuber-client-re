import React, { Component, createRef } from "react";
import FindAddressPresenter from "./FindAddressPresenter";
import ReactDOM from "react-dom";

class FindAddressContainer extends Component<any> {
    public mapRef: any;
    public map: google.maps.Map;
    constructor(props) {
        super(props);
        this.mapRef = createRef();
    }

    public componentDidMount() {
        const { google } = this.props;
        const maps = google.maps;

        const mapNode = ReactDOM.findDOMNode(this.mapRef.current);
        this.map = new maps.Map(mapNode);
    }
    public render() {
        return <FindAddressPresenter mapRef={this.mapRef} />;
    }
}

export default FindAddressContainer;
