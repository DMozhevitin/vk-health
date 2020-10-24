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
import SugarListItem from "../components/SugarListItem";
import FixedLayout from "@vkontakte/vkui/dist/es6/components/FixedLayout/FixedLayout";
import Separator from "@vkontakte/vkui/dist/es6/components/Separator/Separator";
import Icon24Add from '@vkontakte/icons/dist/24/add';
import Icon56MoneyTransferOutline from "@vkontakte/icons/dist/es6/56/money_transfer_outline";
import InsideModalSugar from "./InsideModalSugar";
import AddSugarModal from "../components/AddSugarModal";


const Main = ({id, go, fetchedUser}) => {
    const SUGAR_MODAL_CARD = 'sugar-modal-card'

    const [activeTab, setActiveTab] = useState('main')
    const [searchQuery, setSearchQuery] = useState('')

    const [sugarItems, setSugarItems] = useState([])
    const [sugarActiveModal, setSugarActiveModal] = useState(null)
    const [lastSugarButtonPress, setLastSugarButtonPress] = useState(+(new Date()))

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

    const handleAddSugarEvent = (e) => {
        console.log(e)
        onAddSugarItem(e.detail)
        setSugarActiveModal(null)
    }

    const onAddSugarItem = (e) => {
        let newSugarItems = sugarItems
        newSugarItems.push(e)

        setSugarItems(newSugarItems)
    }

    const sugarModal = (
        <ModalRoot
            activeModal={sugarActiveModal}
            onClose={() => {
                setSugarActiveModal(null)
            }}
        >

            <ModalCard
                id={SUGAR_MODAL_CARD}
                onClose={() => setSugarActiveModal(null)}
                // actions={[{
                //     title: 'Добавить',
                //     mode: 'commerce',
                //     action: () => {
                //         setTimeout(() => setSugarActiveModal(null), 100)
                //     }
                // }]}
            >
                <AddSugarModal/>
            </ModalCard>
        </ModalRoot>
    )

    return (
        <Panel id={id}>
            <PanelHeader>Основное</PanelHeader>
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
                <div>
                    <Div className={'chart-container'}>
                        <Div className='chart-title-container'>
                            <Title className="chart-title" level="3" weight="semibold">
                                Уровень сахара за последнюю неделю
                            </Title>
                        </Div>

                        <Chart chartType='LineChart'
                               width={'100%'} height={'45vh'}
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
                        <Title level='3' className='articles-container-title'>
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

                        {/*<Div className='articles'>*/}
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
                                    <Cell indicator={<RoundAvatar number={f.glycemic_index}/>}>
                                        <Text weight='regular'>{shorten(f.name)}</Text>
                                    </Cell>

                                ))}
                        </List>
                    </Group>
                </Div>
            }

            {
                activeTab === sugar &&
                <View modal={sugarModal}>
                    <Chart chartType='LineChart'
                           width={'80vw'} height={'45vh'}
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

                    <List>
                        {
                            sugarItems.map(item => (
                                <Cell>
                                    <SugarListItem val={item.curValue} date={item.curDate}/>
                                </Cell>
                            ))
                        }
                        {/*<Cell>*/}
                        {/*    <SugarListItem val='3.75'/>*/}
                        {/*</Cell>*/}

                        {/*<Cell>*/}
                        {/*    <SugarListItem val='3.75'/>*/}
                        {/*</Cell>*/}

                        {/*<Cell>*/}
                        {/*    <SugarListItem val='3.75'/>*/}
                        {/*</Cell>*/}
                    </List>

                    <FixedLayout vertical="bottom" style={
                        {
                            background: '#FFFFFF',
                            paddingLeft: '8px',
                            paddingRight: '8px'
                        }
                    }>
                        <Button
                            onClick={() => setSugarActiveModal(SUGAR_MODAL_CARD)}
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
