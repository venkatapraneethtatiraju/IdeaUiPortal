import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null, errorinfo: null }
    }

    componentDidCatch(error, errorinfo) {
        this.setState({
            error: error,
            errorinfo: errorinfo
        })
        console.log(errorinfo);
    }

    render() {
        if (this.state.errorinfo) {
            return (
                <div className="errorBoundary">
                    <p>Something Not Working</p>
                </div>
            )
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
