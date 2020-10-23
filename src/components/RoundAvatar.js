import Div from "@vkontakte/vkui/dist/es6/components/Div/Div";
import React from "react";
import {Text} from "@vkontakte/vkui";
import Title from "@vkontakte/vkui/dist/es6/components/Typography/Title/Title";

class RoundAvatar extends React.Component {

    render() {
        function getColor(n) {
            if (n <= 30) {
                return '#FCE56D'
            }

            if (n <= 60) {
                return '#FCB26D'
            }

            return '#FC7E6D'
        }

        return (
            <Div style={
                {
                    borderRadius: '40px',
                    background: getColor(this.props.number),
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                <Text weight='regular'
                    style = {
                        {
                            fontSize: '20px',
                            color: 'white',
                            margin: 'auto'
                        }
                    }
                >
                    {this.props.number}
                </Text>
            </Div>
        )
    }
}

export default RoundAvatar
