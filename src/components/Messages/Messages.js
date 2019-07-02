import React from "react";
import firebase from "../../firebase";
import { Segment, Comment } from "semantic-ui-react";
import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessagesForm";
import Message from "./Message";

class Messages extends React.Component {
    state ={
        messagesRef: firebase.database().ref("messages"),
        messages: [],
        messagesLoading: true,
        channel: this.props.currentChannel,
        user: this.props.currentUser
    };

    componentDidMount() {
        const { channel, user } = this.state;

        if (channel && user) {
            this.addListener(channel.id);
        }
    }

    addListener = channelId => {
        this.addMessageListener(channelId);
    };

    addMessageListener = channelId => {
        let loadedMessages = [];
        this.state.messagesRef.child(channelId).on("child_added", snap => {
            loadedMessages.push(snap.val());
            this.setState({
                messages: loadedMessages,
                messagesLoading: false
            });
        });
    };

    displayMessages = messages => {
        if (messages.length > 0) {
            return (
                messages.map(message => (
                    <Message
                        key={message.timestamp}
                        message={message}
                        user={this.state.user}
                    />
                ))
            );
        } else {
            // add a "be the first to post on this channel" message
        }
    };

    render() {
        const { messagesRef, messages, channel, user } = this.state;

        return (
            <React.Fragment>
                <MessagesHeader />

                <Segment>
                    <Comment.Group className="messages">
                    {this.displayMessages(messages)}
                    </Comment.Group>
                </Segment>

                <MessageForm
                    messagesRef={messagesRef}
                    currentChannel={channel}
                    currentUser={user}
                />
            </React.Fragment>
        );
    }
}

export default Messages;