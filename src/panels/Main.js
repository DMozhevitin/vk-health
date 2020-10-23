import React from "react";
import '@vkontakte/vkui/dist/vkui.css';
import {Button, Panel, PanelHeader, Placeholder} from "@vkontakte/vkui";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import {Chart} from "react-google-charts";
import PropTypes from "prop-types";
import Title from "@vkontakte/vkui/dist/es6/components/Typography/Title/Title";
import './Main.css'
// import grS from '../img/grS.svg'
import redIn from '../img/redIn.png'
import perCarb from '../img/perCarb.svg'

const Main = ({id, go, fetchedUser}) => {

    return (
        <Panel id={id}>
            <PanelHeader>Основное</PanelHeader>
            <Div className={'chart-container'}>
                <Div className='chart-title-container'>
                    <Title className="chart-title" level="3" weight="semibold">
                        Уровень сахара за последнюю неделю
                    </Title>
                </Div>

                <Chart chartType='LineChart'
                       width={'100vw'} height={'300px'}
                       loader={<div>Loading Chart</div>}
                       data={[
                           ['x', 'dogs'],
                           ['16.10', 0],
                           ['17.10', 10],
                           ['18.10', 23],
                           ['19.10', 17],
                           ['20.10', 18],
                           ['21.10', 9],
                           ['22.10', 11]
                       ]}

                       options={{
                           chartArea: {'width': '95%', 'height': '85%'}
                       }}
                       rootProps={{'data-testid': '1'}}
                />
            </Div>

            <Div className={'values-container'}>

                <Div className={'values-container-top'}>
                    <Div className={'daily-sugar'}>
                        {/*<img className='half-size-img' src={redIn} alt={'daily-sugar'}/>*/}
                    </Div>

                    <Div className={'daily-insulin'}>
                        {/*<img className='half-size-img' src={redIn} alt={'daily-insulin'}/>*/}
                    </Div>

                </Div>

                <Div className={'values-container-bottom'}>
                    {/*<img className={'full-size-img'} src={perCarb} alt={'daily-calories'}/>*/}
                </Div>

            </Div>
        </Panel>
    )
}

Main.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
    fetchedUser: PropTypes.shape({
        photo_200: PropTypes.string,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        city: PropTypes.shape({
            title: PropTypes.string,
        }),
    }),
};

export default Main;
