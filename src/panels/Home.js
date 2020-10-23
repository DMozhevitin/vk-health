import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import {Chart} from "react-google-charts";
import './Home.css'
const Home = ({id, go, fetchedUser}) => {

    const events = [
        {
            eventName: "select",
            callback({ chartWrapper }) {
                // console.log("Selected ", chartWrapper.getChart().getSelection());
                alert("Selected " +  chartWrapper.getChart().getSelection())
                console.log(JSON.stringify(chartWrapper.getChart().getSelection()))
            }
        }
    ]

    return (
        <Panel id={id}>
            <PanelHeader>Example</PanelHeader>
            {fetchedUser &&
            <Group title="User Data Fetched with VK Bridge">
                <Cell
                    before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
                    description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
                >
                    {`${fetchedUser.first_name} ${fetchedUser.last_name}`}
                </Cell>
            </Group>}

            <Group title="Navigation Example">
                <Div>
                    <Button size="xl" level="2" onClick={go} data-to="persik">
                        Show me the Persik, please
                    </Button>
                </Div>
            </Group>

            <Chart chartType='LineChart'
                   width={'600px'} height={'400px'}
                   loader={<div>Loading Chart</div>}
                   data={[
                       ['x', 'dogs'],
                       [0, 0],
                       [1, 10],
                       [2, 23],
                       [3, 17],
                       [4, 18],
                       [5, 9],
                       [6, 11],
                       [7, 27],
                       [8, 33],
                       [9, 40],
                       [10, 32],
                       [11, 35],
                   ]}

                   options={{
                       hAxis: {
                           title: 'Time',
                       },
                       vAxis: {
                           title: 'Popularity',
                       },
                   }}
                   rootProps={{'data-testid': '1'}}

                   chartEvents={events}
            />
        </Panel>
    )
}

Home.propTypes = {
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

export default Home;
