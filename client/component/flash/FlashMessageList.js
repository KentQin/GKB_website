import React from 'react';
import FlashMessageFlashMessage from './FlashMessage'
import { connect } from 'react-redux';

class FlashMessageList extends React.Component {
    render() {
        const messages = this.props.messages.map(message =>
            <FlashMessageList key={message.id} message={message}/>
        );
        return (
            <div>
                {messages}
            </div>
        );
    }
}

FlashMessageList.propTypes = {
    message: React.PropTypes.array.isRequired
}

function mapStateToProps(state) {
    messages: state.flashMessages
}

export default connect(mapStateToProps)(FlashMessageList);