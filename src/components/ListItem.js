import React from "react";
import Div from "@vkontakte/vkui/dist/es6/components/Div/Div";

import gluko from '../img/gluko.png'
import bloodDrop from '../img/blood-drop.svg'

import Text from "@vkontakte/vkui/dist/es6/components/Typography/Text/Text";
import Icon16Clear from '@vkontakte/icons/dist/16/clear';
import Icon28CancelOutline from '@vkontakte/icons/dist/28/cancel_outline';

class ListItem extends React.Component {

    render() {
        return (
            <Div style={
                {
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around'
                }
            }>
                {
                    this.props.ed_izm === 'ммоль/л' &&
                    <img src={gluko} alt='glukometer' style={
                        {
                            width: '36px',
                            height: '36px',
                        }
                    }/>
                }

                {
                    this.props.ed_izm === 'ед.' &&
                    <img src={bloodDrop} alt='bloodDrop' style={
                        {
                            width: '36px',
                            height: '36px',
                        }
                    }/>
                }


                <Text weight='semibold' style={
                    {
                        fontSize: '16px'
                    }
                }>
                    {this.props.val} {this.props.ed_izm}
                </Text>

                <Text weight='semibold' style={
                    {
                        fontSize: '16px',
                        color: '#909499'
                    }
                }>
                    {this.props.date}
                </Text>

                <Icon28CancelOutline width={25} height={25} style={{color:'#909499'}}/>
            </Div>
        )
    }
}

export default ListItem
