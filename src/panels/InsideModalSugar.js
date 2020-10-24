// import React from 'react';
// import PropTypes from 'prop-types';
// import {platform, IOS, ModalPage, Div, Input, Title, Text, Slider, Radio, Button} from '@vkontakte/vkui';
// import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
// import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
// import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
// import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
// import Icon24Back from '@vkontakte/icons/dist/24/back';
//
//
// import './InsideModalSugar.css';
//
//
// const osName = platform();
//
// const InsideModalSugar = props => (
//     <Panel id={props.id}>
//         <PanelHeader
//             left={<PanelHeaderButton onClick={props.go} data-to="home">
//                 {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
//             </PanelHeaderButton>}
//         >
//             Сахар в крови
//         </PanelHeader>
//
//
//         <Div className="column-container">
//             <Title level="1" weight="bold" align='center'>15.0 ммоль/л</Title>
//             <Div>
//                 <Slider
//                     min={0}
//                     max={20}
//                     // value={10.0}
//                     // onChange={value1 => this.setState({value1})}
//                     // top="Simple [10, 30]"
//                 />
//             </Div>
//             <Div className="row-container">
//                 <Radio>
//                     Сейчас
//                 </Radio>
//                 <Input required type={"datetime-local"} placeholder="date" className="sel-date-style"/>
//             </Div>
//             <Div>
//                 <Button mode="commerce" size="xl">ДОБАВИТЬ</Button>
//             </Div>
//         </Div>
//
//     </Panel>
// );
//
// InsideModalSugar.propTypes = {
//     id: PropTypes.string.isRequired,
//     go: PropTypes.func.isRequired,
// };
//
// export default InsideModalSugar;
