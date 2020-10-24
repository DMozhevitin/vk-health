import React from 'react';
import bridge from '@vkontakte/vk-bridge'
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import '@vkontakte/vkui/dist/vkui.css';
import PanelHeaderButton from "@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton";
import {Button, IOS, platform} from "@vkontakte/vkui";
import Icon28ChevronBack from "@vkontakte/icons/dist/28/chevron_back";
import Icon24Back from "@vkontakte/icons/dist/24/back";
import {FixedLayout} from "@vkontakte/vkui/dist/es6";
const osName = platform();
const GetStat = ({id, go, fetchedUser}) => {
     return (
        <Panel id={id}>
            <PanelHeader
                left={<PanelHeaderButton onClick={go} data-to={'main'}>
                    {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                </PanelHeaderButton>}
            >
                Получить статистику
            </PanelHeader>

            <Div style={{paddingTop: 12, paddingBottom: 0, color: 'gray'}}>
                Мы бережно храним Вашу информацию, которую Вы нам доверяете. Надеемся, она может помочь вам не только
                в интернете, но и в жизни.
                <br/>
                <br/>
                Специально для этого мы сделали чат-бота, который с радостью отправит вам PDF файл со всеми Вашими
                показаниями.
                <br/>
                <br/>
                Вы можете отправить отчет вашему врачу, сохранить с важными документами или распечатать и анализировать
                бумажный вариант, если Вам так удобнее.
                <br/>
                <br/>
                Для того, чтобы разрешить нам отправлять Вам отчеты, перейдите по кнопке ниже в диалог с ботом и
                напишите ему что-нибудь. Для того, чтобы получить pdf отчет, нажмите на кнопку "Получить отчет".
                <br/>
                <br/>
                С наилучшими пожеланиями, команда φλεξ❤
            </Div>

            <Div className="column-container" style={
                {
                    position: 'absolute',
                    bottom: '0',
                    width: '95%',
                    paddingLeft: '8px',
                    paddingRight: '8px'
                }
            }>
                <Button size="xl" style={{marginBottom: 12, paddingTop: 0}}
                        onClick={() => window.open("https://vk.com/im?media=&sel=-199696857")}>
                    Написать сообществу
                </Button>
                <Button size="xl"mode="commerce" onClick={() => writeStat()}>
                    Получить отчет
                </Button>
            </Div>
        </Panel>
    )
}

function writeStat() {
    bridge.send("VKWebAppCallAPIMethod",
        {
            "method": "messages.allowMessagesFromGroup",
            "request_id": "1",
            "params":  {"group_id": "199696857"}
        })
    let ID = window.location.search
    ID = ID.split("vk_user_id=")[1]
    ID = ID.split("&")[0]

    const query = fetch("https://hackaton-vk-bot.vercel.app/api/index.php?" + ID).then(function (response) {
    }).catch(function (err) {
        console.log(err)
    })
}


export default GetStat;
