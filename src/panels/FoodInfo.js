import React from 'react';
import PropTypes from 'prop-types';
import {
    platform,
    IOS,
    ModalPage,
    Div,
    Input,
    Title,
    Text,
    Slider,
    Radio,
    Button,
    Separator,
    Headline
} from '@vkontakte/vkui';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';


import './FoodInfo.css';


const osName = platform();

const FoodInfo = props => (
    <Panel id={props.id}>
        <PanelHeader
            left={<PanelHeaderButton onClick={props.go} data-to="main">
                {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
            </PanelHeaderButton>}
        >
            Абрикосы (свежие)
        </PanelHeader>


        <Div className="column-container">
            <Div className="row-container">
                <Div className="column-container">
                    <Headline weight="regular" style={{color: "#828282", textAlign: "center"}}>Гликемический
                        индекс</Headline>
                    <Div><Title level="1" weight="medium"
                                style={{color: "#4BB34B", textAlign: "center"}}>20</Title></Div>
                </Div>

                <Div className="column-container">
                    <Headline weight="regular" style={{color: "#828282", textAlign: "center"}}>Порция</Headline>
                    <Div><Title level="1" weight="medium" style={{textAlign: "center"}}>100 г</Title></Div>
                </Div>
            </Div>
            <Separator/>
            <Div className="row-container">
                <Div className="column-container">
                    <Headline weight="regular" style={{color: "#828282"}}>Калорийность</Headline>
                    <Headline weight="regular" style={{color: "#828282"}}>Белки</Headline>
                    <Headline weight="regular" style={{color: "#828282"}}>Жиры</Headline>
                    <Headline weight="regular" style={{color: "#828282"}}>Углеводы</Headline>
                </Div>

                <Div className="column-container">
                    <Headline weight="meduim"> ккал</Headline>
                    <Headline weight="meduim">0.9 г</Headline>
                    <Headline weight="meduim">0.1 г</Headline>
                    <Headline weight="meduim">9 г</Headline>
                </Div>
            </Div>
            <Separator/>
            <Div>
                <Title level="2" weight="medium">
                    Состав и полезные свойства
                </Title>
            </Div>

            <Div>
                <Text>
                    Абрикосы считаются одними из самых полезных фруктов, ведь в их составе присутствуют: бета-каротин,
                    холин, витамины А, В3, В2, В5, В6, В9, С, Е, Н и РР, а также минеральные вещества: калий, магний,
                    железо, йод, фосфор и натрий, пектины, инулин, пищевые волокна, сахара, крахмал, дубильные вещества
                    и кислоты: яблочная, лимонная и винная. Употребление в пищу абрикосов в сезон способствует повышению
                    уровня гемоглобина крови, укреплению защитных свойств организма, является профилактикой появления
                    болезней щитовидной железы. Наличие магния делает фрукт очень полезным при любых нарушениях
                    деятельности сердечно-сосудистой системы за счёт нормализации работы сердечной мышцы.
                </Text>
            </Div>
            <Div>
                <Button size="xl" style={{
                    marginBottom:"12px"
                }}>Добавить в дневник еды</Button>
                <Button mode="commerce" size="xl">Добавить в избранное</Button>
            </Div>

        </Div>


    </Panel>
);

FoodInfo.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
};

export default FoodInfo;
