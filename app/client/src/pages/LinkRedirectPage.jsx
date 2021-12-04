import React from 'react';
import { Http } from '../_helpers'
import { alertActions } from '../_actions';
import { connect } from 'react-redux';

class LinkRedirectPage extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        const userId = parseInt(this.props.match.params.userId);
        const campaignId = parseInt(this.props.match.params.campaignId);
        Http.patch(`/posts`, { userId, campaignId })
            .then(res => {
                console.log(res);
                window.location.href = res.data;
                return;
            })
            .catch(err => this.props.dispatch(alertActions.error(err.message)));
    }

    render() { 
        return <div className="page">This is Inforum's redirect page.</div>;
    }
}

function mapStateToProps(state) {
    return {};
}
const connectedLinkRedirectPage = connect(mapStateToProps)(LinkRedirectPage);
export { connectedLinkRedirectPage as LinkRedirectPage }; 
