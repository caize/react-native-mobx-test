/**
 * A-mili React Native App
 *
 * @flow
 */
'use strict';
import React, { Component, PropTypes } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    StatusBar,
    ScrollView,
    StyleSheet,
} from 'react-native';
import {observer} from 'mobx-react/native';
import { observable, computed, outrun, action, useStrict } from 'mobx';
import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '../assets/Colors';
import Network from '../mixins/Network';
import styles from './Style.css';

import Button from '../components/Button';
import ToggleButton from '../components/ToggleButton';
import Stepper from '../components/Stepper';
import HtmlView from '../components/HtmlView';
import InputEditor from '../components/InputEditor';
import SlideBox from '../components/SlideBox';
import ScrollBox from '../components/ScrollBox';
import Tabbar from '../components/Tabbar';
import Tabbody from '../components/Tabbody';

import Topbar from '../modules/Topbar';
import Module from '../modules/Module';

const titles = ['Eat', 'Drink', 'Think'];

class Todo {
    id = `${Date.now()}${Math.floor(Math.random()*10)}`;

    @observable
    title = '';

    @observable
    done = false;

    constructor(title) {
        this.title = title;
    }
}

function randomTodoTitle() {
    return titles[Math.floor(Math.random() * titles.length)];
}

@observer
export default class HomePage extends Component {

    @observable counter = 8;
    @observable counter2 = 0;

    static propTypes = {
        data: PropTypes.instanceOf(Todo),
    };

    static defaultProps = {
        data: new Todo('Test mobx style'),
    };

    constructor(props) {
        super(props);
        this.state = {
            //..
        };
    }

    componentDidMount() {
        //
    }

    componentWillUnmount(){
        this.unmounting = true;
    }

    //
    render() {
        const { data } = this.props;
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor='rgba(255,255,255,0.1)' hidden={false} animated={true} translucent={true} barStyle='default'/>
                <Topbar title='Mobx Test'/>
                <ScrollView style={styles.flex_1}>
                    <Module title='mobx base'>
                        <View style={[styles.flex_row, styles.align_center, styles.flex_wrap, styles.margin_bottom_10]}>
                            <Stepper disabled={false} maxValue={10} minValue={0} style={styles.stepper} onChanged={this._onChanged}>
                                <Button style={[styles.stepper_btn, styles.left_btn]} renderDisabled={()=>{
                                    return (
                                        <View style={[styles.stepper_btn_disabled, styles.left_btn]}>
                                            <Icon name='ios-remove' size={24} color={Colors.gray}/>
                                        </View>
                                    );
                                }}>
                                    <Icon name='ios-remove' size={24} color={Colors.pink}/>
                                </Button>
                                <TextInput style={styles.stepper_input} value={`${this.counter}`} />
                                <Button style={[styles.stepper_btn, styles.right_btn]} renderDisabled={()=>{
                                    return (
                                        <View style={[styles.stepper_btn_disabled, styles.right_btn]}>
                                            <Icon name='ios-add' size={24} color={Colors.gray}/>
                                        </View>
                                    );
                                }}>
                                    <Icon name='ios-add' size={24} color={Colors.pink}/>
                                </Button>
                            </Stepper>
                            <Button onPress={this._getValue} style={[styles.btn_default, styles.margin_left_5]} elementId={'btn1'} >
                                <Text style={[styles.color_deep,styles.font_size_14]}>Get Counter</Text>
                            </Button>
                            <Text style={[styles.stepper_txt]}>{`${this.counter2}`}</Text>
                            <Stepper disabled={false} initValue={0} maxValue={9999} minValue={0} style={styles.stepper} onChanged={this._onChanged2}>
                                <Button style={[styles.stepper_btn, styles.left_btn, ]} renderDisabled={()=>{
                                    return (
                                        <View style={[styles.stepper_btn_disabled, styles.left_btn]}>
                                            <Icon name='ios-remove' size={24} color={Colors.gray}/>
                                        </View>
                                    );
                                }}>
                                    <Icon name='ios-remove' size={24} color={Colors.pink}/>
                                </Button>
                                <Button style={[styles.stepper_btn, styles.right_btn]} renderDisabled={()=>{
                                    return (
                                        <View style={[styles.stepper_btn_disabled, styles.right_btn]}>
                                            <Icon name='ios-add' size={24} color={Colors.gray}/>
                                        </View>
                                    );
                                }}>
                                    <Icon name='ios-add' size={24} color={Colors.pink}/>
                                </Button>
                            </Stepper>
                        </View>
                        <Text
                            style={[styles.item, data.done && styles.done]}
                            onPress={this._onPress}>
                            {data.title}
                        </Text>

                    </Module>
                </ScrollView>
            </View>
        );
    }

    _onChanged=(value)=>{
        try {
            this.counter = parseInt(value);
        } catch (err) {

        }
    }


    _onChanged2=(value)=>{
        try {
            this.counter2 = parseInt(value);
        } catch (err) {

        }
    }

    _getValue=()=>{
        alert(this.counter)
    }

    _onPress = () => {
        const { data } = this.props;
        data.done = !data.done;
    };

}

