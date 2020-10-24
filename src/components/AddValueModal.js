import {Button, Div, Input, Radio, Slider, Title} from "@vkontakte/vkui";
import React, {useState} from "react";

class AddValueModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            curValue: 0,
            curDate: null
        }
    }

    render() {

        const handleButtonClick = () => {
            if (this.props.type === 'sugar') {
                console.log('sugar type')
                window.dispatchEvent(new CustomEvent('on-sugar-modal-close', {detail: {
                        curValue: this.state.curValue,
                        curDate: this.state.curDate
                    }}))
            } else {
                console.log('insulin type')
                window.dispatchEvent(new CustomEvent('on-insulin-modal-close', {detail: {
                        curValue: this.state.curValue,
                        curDate: this.state.curDate
                    }}))
            }

        }

        return (
            <Div className="column-container">
                <Title level="1" weight="regular" align='center'>{this.state.curValue.toFixed(1)} {this.props.ed_izm}</Title>
                <Div>
                    <Slider
                        min={0}
                        max={20}
                        value={(this.state.curValue)}
                        step={0.5}
                        onChange={(e) => {
                            this.setState({curValue: e})
                        }}
                    />
                </Div>
                <Div className="row-container">
                    <Input value={this.state.curDate}
                           required
                           type={"datetime-local"}
                           placeholder="date"
                           onChange={(e) => {
                               this.setState({curDate: e.target.value})
                           }}
                           className="sel-date-style"/>
                </Div>
                <Div>
                    {
                        (this.state.curValue > 0 && this.state.curDate) &&
                        <Button
                            mode="commerce"
                            size="xl"
                            onClick={handleButtonClick}
                        >Добавить</Button>
                    }

                    {
                        (this.state.curValue === 0 || !this.state.curDate) &&
                        <Button
                            disabled
                            mode="commerce"
                            size="xl"
                        >Добавить</Button>
                    }

                </Div>
            </Div>
        )
    }
}

export default AddValueModal
