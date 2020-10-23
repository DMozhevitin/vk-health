import React, {useState, useEffect} from 'react';
import '@vkontakte/vkui/dist/vkui.css';
import {Button, Panel, PanelHeader, Placeholder, TabsItem} from "@vkontakte/vkui";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import {Chart} from "react-google-charts";
import PropTypes from "prop-types";
import Title from "@vkontakte/vkui/dist/es6/components/Typography/Title/Title";
import './Main.css'
import redIn from '../img/redIn.png'
import perCarb from '../img/perCarb.svg'
import Text from "@vkontakte/vkui/dist/es6/components/Typography/Text/Text";
import Subhead from "@vkontakte/vkui/dist/es6/components/Typography/Subhead/Subhead";
import Tabs from "@vkontakte/vkui/dist/es6/components/Tabs/Tabs";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import List from "@vkontakte/vkui/dist/components/List/List";
import Avatar from "@vkontakte/vkui/dist/es6/components/Avatar/Avatar";
import Cell from "@vkontakte/vkui/dist/es6/components/Cell/Cell";
import {food} from '../food'
import {Search} from "@vkontakte/vkui/dist/es6";
import Input from "@vkontakte/vkui/dist/es6/components/Input/Input";
import Icon24Filter from "@vkontakte/icons/dist/es6/24/filter";
import RoundAvatar from "../components/RoundAvatar";

const Main = ({id, go, fetchedUser}) => {
    const [activeTab, setActiveTab] = useState('main')
    const [searchQuery, setSearchQuery] = useState('')

    const insulin = 'insulin'
    const sugar = 'sugar'
    const main = 'main'
    const carbo = 'carbo'
    const index = 'index'

    return (
        <Panel id={id}>
            <PanelHeader>Основное</PanelHeader>
            <Tabs>
                <TabsItem onClick={() => setActiveTab(insulin)}
                          selected={activeTab === insulin}>
                    Инсулин
                </TabsItem>

                <TabsItem onClick={() => setActiveTab(sugar)}
                          selected={activeTab === sugar}>
                    Сахар
                </TabsItem>

                <TabsItem onClick={() => setActiveTab(main)}
                          selected={activeTab === main}>
                    Общее
                </TabsItem>

                <TabsItem onClick={() => setActiveTab(carbo)}
                          selected={activeTab === carbo}>
                    Углеводы
                </TabsItem>

                <TabsItem onClick={() => setActiveTab(index)}
                          selected={activeTab === index}>
                    Индекс
                </TabsItem>
            </Tabs>

            {
                (activeTab === main) &&
                <Div>
                    <Div className={'chart-container'}>
                        <Div className='chart-title-container'>
                            <Title className="chart-title" level="3" weight="semibold">
                                Уровень сахара за последнюю неделю
                            </Title>
                        </Div>

                        <Chart chartType='LineChart'
                               width={'100vw'} height={'450px'}
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


                    <Div className={'cards-container'}>
                        <Title level='3' className='cards-container-title'>
                            Сегодня
                        </Title>
                        <Div className={'cards-container-top'}>
                            <Div className={'card daily-sugar'}>
                                <Title level='3' weight='semibold' className='card-subtitle'>Средний сахар</Title>
                                <Title level='3' weight='medium'>23 октября</Title>
                                <Title level='3' weight='medium'>5.55 ммоль/л</Title>
                            </Div>

                            <Div className={'card daily-insulin'}>
                                <Title level='3' weight='semibold' className='card-subtitle'>Средний сахар</Title>
                                <Title level='3' weight='medium'>23 октября</Title>
                                <Title level='3' weight='medium'>5.55 ммоль/л</Title>
                            </Div>


                        </Div>

                        <Div className={'card daily-stats'}>
                            <Title level='3' weight='semibold' className='card-subtitle'>Количество углеводов</Title>
                            <Title level='3' weight='semibold' className='card-subtitle'>10 единиц | 120 грамм</Title>
                            {/*<img className={'full-size-img'} src={perCarb} alt={'daily-calories'}/>*/}
                        </Div>
                    </Div>

                    <Div className='articles-container'>
                        <Title level='3' className='articles-container-title'>
                            Статьи
                        </Title>

                        <Div className='articles'>
                            <Div className='article'>
                                <Div className='article-description'>
                                    <Title level='2' weight='semibold'>Почему важно вести дневник</Title>
                                    <Text weight='semibold'>Для человека, больного диабетом, крайне важно вести дневник.
                                        Расскажем почему</Text>
                                </Div>
                            </Div>

                            <Div className='article'>
                                <Div className='article-description'>
                                    <Title level='2' weight='semibold'>Почему важно вести дневник</Title>
                                    <Text weight='semibold'>Для человека, больного диабетом, крайне важно вести дневник.
                                        Расскажем почему</Text>
                                </Div>
                            </Div>

                            <Div className='article'>
                                <Div className='article-description'>
                                    <Title level='2' weight='semibold'>Почему важно вести дневник</Title>
                                    <Text weight='semibold'>Для человека, больного диабетом, крайне важно вести дневник.
                                        Расскажем почему</Text>
                                </Div>
                            </Div>
                        </Div>
                    </Div>
                </Div>
            }


            {
                activeTab === index &&
                <Div>
                    <Input onChange={(e) => {
                        console.log(e.target.value)
                        setSearchQuery(e.target.value)
                    }}
                           type="text"/>

                    <Group>
                        <List>
                            {food.filter(f => {
                                return searchQuery === '' ? true : f.name.toLowerCase()
                                    .includes(searchQuery.toLowerCase())
                            })
                                .map(f => (
                                    <Cell indicator={<RoundAvatar number={f.glycemic_index}/>}>
                                        <Title level='2' weight='regular'>{f.name}</Title>
                                    </Cell>

                                ))}
                        </List>
                    </Group>
                </Div>
            }
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
