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
import {ModalCard, ModalRoot, Search, View} from "@vkontakte/vkui/dist/es6";
import Input from "@vkontakte/vkui/dist/es6/components/Input/Input";
import Icon24Filter from "@vkontakte/icons/dist/es6/24/filter";
import RoundAvatar from "../components/RoundAvatar";
import Counter from "@vkontakte/vkui/dist/es6/components/Counter/Counter";
import HorizontalScroll from "@vkontakte/vkui/dist/es6/components/HorizontalScroll/HorizontalScroll";
import ListItem from "../components/ListItem";
import FixedLayout from "@vkontakte/vkui/dist/es6/components/FixedLayout/FixedLayout";
import Separator from "@vkontakte/vkui/dist/es6/components/Separator/Separator";
import Icon24Add from '@vkontakte/icons/dist/24/add';
import Icon56MoneyTransferOutline from "@vkontakte/icons/dist/es6/56/money_transfer_outline";
import InsideModalSugar from "./InsideModalSugar";
import AddValueModal from "../components/AddValueModal";


const Main = ({id, go, fetchedUser}) => {
    const SUGAR_MODAL_CARD = 'sugar-modal-card'
    const INSULIN_MODAL_CARD = 'insulin-modal-card'
    const [activeTab, setActiveTab] = useState('main')
    const [searchQuery, setSearchQuery] = useState('')
    const [activeModal, setActiveModal] = useState(null)

    const [sugarItems, setSugarItems] = useState([
        {curValue: 3, curDate: new Date(2020, 10, 18, 12, 13).toLocaleString('ru')},
        {curValue: 5, curDate: new Date(2020, 10, 18, 13, 14).toLocaleString('ru')},
        {curValue: 4.5, curDate: new Date(2020, 10, 18, 15, 16).toLocaleString('ru')},
        {curValue: 6, curDate: new Date(2020, 10, 18, 22, 28).toLocaleString('ru')},
        {curValue: 4, curDate: new Date(2020, 10, 18, 14, 15).toLocaleString('ru')},
        {curValue: 6, curDate: new Date(2020, 10, 18, 10, 10).toLocaleString('ru')}
    ])
    const [sugarChartData, setSugarChartData] = useState(
        [['x', ''],
            ['18.10', 3],
            ['19.10', 5],
            ['20.10', 4.5],
            ['21.10', 6],
            ['22.10', 4],
            ['23.10', 6],
            ['24.10', 0]])


    const [insulinChartData, setInsulinChartData] = useState(
        [['x', ''],
            ['18.10', 2],
            ['19.10', 4],
            ['20.10', 3],
            ['21.10', 5],
            ['22.10', 3],
            ['23.10', 4],
            ['24.10', 0]]
    )
    const [insulinItems, setInsulinItems] = useState([
        {curValue: 2, curDate: new Date(2020, 10, 18, 12, 13).toLocaleString('ru')},
        {curValue: 4, curDate: new Date(2020, 10, 18, 13, 14).toLocaleString('ru')},
        {curValue: 3, curDate: new Date(2020, 10, 18, 15, 16).toLocaleString('ru')},
        {curValue: 5, curDate: new Date(2020, 10, 18, 22, 28).toLocaleString('ru')},
        {curValue: 3, curDate: new Date(2020, 10, 18, 14, 15).toLocaleString('ru')},
        {curValue: 4, curDate: new Date(2020, 10, 18, 10, 10).toLocaleString('ru')}
    ])

    const insulin = 'insulin'
    const sugar = 'sugar'
    const main = 'main'
    const carbo = 'carbo'
    const index = 'index'

    const shorten = (s) => {
        if (s.length <= 25) {
            return s
        } else {
            return s.slice(0, 25) + '...'
        }
    }

    useEffect(() => {
        window.addEventListener('on-sugar-modal-close', handleAddSugarEvent)

        return () => {
            window.removeEventListener('keydown', handleAddSugarEvent)
        }
    }, [])

    useEffect(() => {
        window.addEventListener('on-insulin-modal-close', handleAddInsulinEvent)

        return () => {
            window.removeEventListener('keydown', handleAddInsulinEvent)
        }
    }, [])

    const handleAddSugarEvent = (e) => {
        let newSugarItems = sugarItems
        newSugarItems.push({
            curValue: e.detail.curValue,
            curDate: (new Date(e.detail.curDate)).toLocaleString('ru')
        })
        setSugarItems(newSugarItems)

        setActiveModal(null)
        processDate({
            curValue: e.detail.curValue,
            curDate: new Date(e.detail.curDate)
        }, 'sugar')
    }

    const handleAddInsulinEvent = (e) => {
        let newInsulinItems = insulinItems
        newInsulinItems.push({
            curValue: e.detail.curValue,
            curDate: (new Date(e.detail.curDate)).toLocaleString('ru')
        })
        setInsulinItems(newInsulinItems)

        setActiveModal(null)
        processDate({
            curValue: e.detail.curValue,
            curDate: new Date(e.detail.curDate)
        }, 'insulin')
    }

    const processDate = (detail, type) => {
        const d = detail.curDate
        const v = detail.curValue

        if (d.getMonth() !== 9) {
            return
        }

        const day = +d.getDate() - 17
        if (day < 0 || day > 7) {
            return
        }

        if (type === 'sugar') {
            let newSugarChartData = sugarChartData
            newSugarChartData[day] = [sugarChartData[day][0], v]
            setSugarChartData(newSugarChartData)
        } else if (type === 'insulin') {
            console.log('insulin')
            let newInsulinChartData = insulinChartData
            newInsulinChartData[day] = [insulinChartData[day][0], insulinChartData[day][1] + v]
            setInsulinChartData(newInsulinChartData)
        }

    }

    const dailyInsuline = () => {
        return insulinChartData[insulinChartData.length - 1][1].toFixed(1);
    }

    const dailySugar = () => {
        return sugarChartData[insulinChartData.length - 1][1].toFixed(1);
    }

    const modal = (
        <ModalRoot
            activeModal={activeModal}
            onClose={() => {
                setActiveModal(null)
            }}
        >

            <ModalCard
                id={SUGAR_MODAL_CARD}
                onClose={() => setActiveModal(null)}
            >
                <AddValueModal type='sugar' ed_izm={'ммоль/л'}/>
            </ModalCard>

            <ModalCard
                id={INSULIN_MODAL_CARD}
                onClose={() => setActiveModal(null)}
            >
                <AddValueModal type='insulin' ed_izm={'ед.'}/>
            </ModalCard>
        </ModalRoot>
    )

    return (
        <Panel id={id}>
            <PanelHeader>Твой сахар</PanelHeader>
            <Tabs>
                <TabsItem
                    onClick={() => setActiveTab(insulin)}
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

                {/*<TabsItem onClick={() => setActiveTab(carbo)}*/}
                {/*          selected={activeTab === carbo}>*/}
                {/*    Углеводы*/}
                {/*</TabsItem>*/}

                <TabsItem onClick={() => setActiveTab(index)}
                          selected={activeTab === index}>
                    Индекс
                </TabsItem>
            </Tabs>

            {
                (activeTab === main) &&
                <div>
                    <Div className={'chart-container'}>
                        <Div className='chart-title-container'>
                            <Title className="chart-title" level="4" weight="semibold">
                                Уровень сахара за последнюю неделю
                            </Title>
                        </Div>

                        <Chart chartType="ColumnChart"
                               width={'100%'} height={'45vh'}
                               loader={<div>Loading Chart</div>}
                               data={sugarChartData}
                               legendToggle
                               options={{
                                   chartArea: {'width': '85%', 'height': '85%'},
                                   legend: "none"
                               }}
                               rootProps={{'data-testid': '1'}}
                        />
                    </Div>


                    <Div className={'cards-container'}>
                        <Title level='3' className='articles-container-title'>
                            Сегодня
                        </Title>
                        <Div className={'cards-container-top'}>
                            <Div className={'card daily-sugar'}>
                                <Title level='3' weight='semibold' className='card-subtitle'>Cахар</Title>
                                <Title level='3' weight='medium'>24 октября</Title>
                                <Title level='3' weight='medium'>{dailySugar()} ммоль/л</Title>
                            </Div>

                            <Div className={'card daily-insulin'}>
                                <Title level='3' weight='semibold' className='card-subtitle'>Инсулин</Title>
                                <Title level='3' weight='medium'>24 октября</Title>
                                <Title level='3' weight='medium'>{dailyInsuline()} ед.</Title>
                            </Div>


                        </Div>

                        <Div className={'card daily-stats'}>
                            <Title level='3' weight='semibold' className='card-subtitle'>Количество углеводов</Title>
                            <Title level='3' weight='semibold' className='card-subtitle'>10 единиц | 120 грамм</Title>
                        </Div>

                        <Div className='card article-getstat' onClick={go} data-to='getStat'
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                            }}>
                                <Title level='2' className='card-subtitle'  weight='semibold'
                                       style={{
                                           color: 'white'
                                       }}>Получить статистику</Title>
                                <Text weight='semibold' className='card-subtitle' style={{
                                    color: 'white'
                                }}>Держите свое здоровье под контролем</Text>
                        </Div>
                    </Div>

                    <Div className='articles-container'>
                        <Title level='3' className='articles-container-title'>
                            Статьи
                        </Title>


                        {/*<Div className='articles'>*/}
                        <Div className='article-diary' onClick={() => {
                            window.open("https://vk.com/@-199696857-samokontrol-pri-saharnom-diabete-1-go-i-2-go-tipa-kogda-kak")
                        }}>
                            <Div className='article-description'>
                                <Title level='2' weight='semibold'>Почему важно вести дневник</Title>
                                <Text weight='semibold'>Для человека, больного диабетом, крайне важно вести дневник.
                                    Расскажем почему</Text>
                            </Div>
                        </Div>

                        <Div className='article-gi' onClick={() => {
                            window.open("https://vk.com/@-199696857-glikemicheskii-indeks-i-chto-o-nem-dolzhen-znat-diabetik")
                        }}>
                            <Div className='article-description'>
                                <Title level='2' weight='semibold'>О гликемическом индексе</Title>
                                <Text weight='semibold'>Что такое гликемический индекс и
                                    почему его важно знать</Text>
                            </Div>
                        </Div>
                        {/*</Div>*/}
                    </Div>
                </div>
            }


            {
                activeTab === index &&
                <Div>
                    <Input onChange={(e) => {
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
                                    <Cell
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            outline: 'none'
                                        }}
                                        indicator={<RoundAvatar number={f.glycemic_index}/>}
                                        onClick={go} data-to='foodInfo' item={f}>
                                        <Text weight='regular'>{shorten(f.name)}</Text>
                                    </Cell>

                                ))}
                        </List>
                    </Group>
                </Div>
            }

            {
                activeTab === insulin &&
                <View modal={modal}>
                    <Div className={'chart-container'}>
                        <Div className='chart-title-container'>
                            <Title className="chart-title" level="4" weight="semibold">
                                Уровень инсулина за последнюю неделю
                            </Title>
                        </Div>

                        <Chart chartType="ColumnChart"
                               width={'100%'} height={'45vh'}
                               loader={<div>Loading Chart</div>}
                               data={sugarChartData}
                               legendToggle
                               options={{
                                   chartArea: {'width': '85%', 'height': '85%'},
                                   legend: "none"
                               }}
                               rootProps={{'data-testid': '1'}}
                        />
                    </Div>

                    <Tabs mode="buttons" style={
                        {
                            width: '100%',
                            borderRadius: '12px'
                        }
                    }>
                        <HorizontalScroll style={
                            {
                                width: '100%'
                            }
                        }>
                            <TabsItem className='tab-item-25'>
                                День
                            </TabsItem>
                            <TabsItem selected className='tab-item-25'>
                                Неделя
                            </TabsItem>
                            <TabsItem className='tab-item-25'>
                                Месяц
                            </TabsItem>
                            <TabsItem className='tab-item-25'>
                                Год
                            </TabsItem>
                        </HorizontalScroll>
                    </Tabs>

                    <List style={{
                        marginBottom: '75px'
                    }}>
                        {
                            insulinItems.map(item => (
                                <Cell>
                                    <ListItem val={item.curValue} date={item.curDate} ed_izm={'ед.'}/>
                                </Cell>
                            ))
                        }
                    </List>

                    <FixedLayout vertical="bottom" style={
                        {
                            background: '#FFFFFF',
                            paddingLeft: '8px',
                            paddingRight: '8px'
                        }
                    }>
                        <Div><Button
                            onClick={() => setActiveModal(INSULIN_MODAL_CARD)}
                            size='xl'
                            before={<Icon24Add/>}
                            mode="commerce"
                            style={{
                                width: '100%',
                                marginBottom: '8px'
                            }}>
                            Добавить
                        </Button>
                        </Div>
                    </FixedLayout>
                </View>
            }


            {
                activeTab === sugar &&
                <View modal={modal}>
                    <Div className={'chart-container'}>
                        <Div className='chart-title-container'>
                            <Title className="chart-title" level="4" weight="semibold">
                                Уровень сахара за последнюю неделю
                            </Title>
                        </Div>

                        <Chart chartType="ColumnChart"
                               width={'100%'} height={'45vh'}
                               loader={<div>Loading Chart</div>}
                               data={sugarChartData}
                               legendToggle
                               options={{
                                   chartArea: {'width': '85%', 'height': '85%'},
                                   legend: "none"
                               }}
                               rootProps={{'data-testid': '1'}}
                        />
                    </Div>

                    <Tabs mode="buttons" style={
                        {
                            width: '100%',
                            // background: '#EBEDF0',
                            borderRadius: '12px'
                        }
                    }>
                        <HorizontalScroll style={
                            {
                                width: '100%'
                            }
                        }>
                            <TabsItem className='tab-item-25'>
                                День
                            </TabsItem>
                            <TabsItem selected className='tab-item-25'>
                                Неделя
                            </TabsItem>
                            <TabsItem className='tab-item-25'>
                                Месяц
                            </TabsItem>
                            <TabsItem className='tab-item-25'>
                                Год
                            </TabsItem>
                        </HorizontalScroll>
                    </Tabs>

                    <List style={{
                        marginBottom: '75px'
                    }}>
                        {
                            sugarItems.map(item => (
                                <Cell>
                                    <ListItem val={item.curValue} date={item.curDate} ed_izm={'ммоль/л'}/>
                                </Cell>
                            ))
                        }
                    </List>

                    <FixedLayout vertical="bottom" style={
                        {
                            background: '#FFFFFF',
                            paddingLeft: '8px',
                            paddingRight: '8px'
                        }
                    }>
                        <Div><Button
                            onClick={() => setActiveModal(SUGAR_MODAL_CARD)}
                            size='xl'
                            before={<Icon24Add/>}
                            mode="commerce"
                            style={{
                                width: '100%',
                                marginBottom: '8px',
                                // display: 'flex',
                                // flexDirection: 'row',
                            }}>
                            Добавить
                        </Button>
                        </Div>
                    </FixedLayout>
                </View>
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
