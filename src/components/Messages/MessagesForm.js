import React from "react";
import firebase from "../../firebase";
import { Segment, Button, Input } from "semantic-ui-react";
import FileModal from "./FileModal";

class MessagesForm extends React.Component {
    state = {
        message: "",
        channel: this.props.currentChannel,
        user: this.props.currentUser,
        loading: false,
        errors: [],
        modal: false
    };

    openModal = () => this.setState({ modal: true });
    closeModal = () => this.setState({ modal: false });

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    createMessage = () => {
        const { user } = this.state;
        const message = {
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user: {
                id: user.uid,
                name: user.displayName,
                avatar: user.photoURL
            },
            content: this.state.message
        };
        return message;
    };

    sendMessage = () => {
        const { messagesRef } = this.props;
        const { message, channel, errors } = this.state;

        if (message) {
            this.setState({ loading: true });
            messagesRef
                .child(channel.id)
                .push()
                .set(this.createMessage())
                .then(() => {
                    this.setState({ loading: false, message: "", errors: [] });
                })
                .catch(err => {
                    console.error(err);
                    this.setState({
                        loading: false,
                        errors: errors.concat(err)
                    });
                });
        } else {
            this.setState({
                errors: errors.concat({ message: "Add a message" })
            });
        }
    };

    render() {
        const { errors, message, loading, modal } = this.state;

        return (
            <Segment className="message__form">
                <Input
                    fluid
                    name="message"
                    onChange={this.handleChange}
                    value={message}
                    style={{ marginBottom: "0.7em" }}
                    label={<Button icon={"add"} />}
                    labelPosition="left"
                    className={
                        errors.some(error => error.message.includes("message"))
                            ? "error" : ""
                    }
                    placeholder="Write your message"
                />
                <Button.Group icon widths="2">
                    <Button
                        onClick={this.sendMessage}
                        disabled={loading}
                        color="orange"
                        content="Add Reply"
                        labelPosition="left"
                        icon="edit"
                    />
                    <Button
                        color="teal"
                        onClick={this.openModal}
                        content="Upload Media"
                        labelPosition="right"
                        icon="cloud upload"
                    />
                    <FileModal
                        modal={modal}
                        closeModal={this.closeModal}
                    />
                </Button.Group>
            </Segment>
        )
    }
}

// Put Media File In State, Add Mimetype Validation
// https://www.learningcrux.com/video/build-a-slack-chat-app-with-react-redux-and-firebase/8/1

export default MessagesForm;