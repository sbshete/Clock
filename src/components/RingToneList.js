import React, { Component, PropTypes } from 'react';
import {
    ListView,
    ScrollView,
    View,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { NavBar } from './common';
import Styles from '../constant/Styles';
import ButtonLabels from '../constant/ButtonLabels';
import RingToneListItem from './RingToneListItem';
import {
    changeRingTone,
    choosingRingTone
} from '../actions';

const propTypes = {
    ringTone: PropTypes.object.isRequired,
    tmpRingTone: PropTypes.object.isRequired,
    ringToneList: PropTypes.array.isRequired,
};

class RingToneList extends Component {

    componentWillMount() {
        this.createDataSource(this.props);
    }

    onCancelPress() {
        const { ringTone } = this.props;
        this.props.choosingRingTone({ item: ringTone });
        Actions.pop();
    }

    onSetPress() {
        const { tmpRingTone } = this.props;
        this.props.changeRingTone({ ringTone: tmpRingTone });
        Actions.pop();
    }

    createDataSource({ ringToneList }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(ringToneList);
    }

    renderRow(item) {
        return <RingToneListItem item={item} />;
    }

    render() {
        const { container, listViewStyle } = Styles;
        return (
            <View style={container}>
                <NavBar
                    title="When Timer Ends"
                    titleLeft={ButtonLabels.CANCEL}
                    onLeftPress={this.onCancelPress.bind(this)}
                    titleRight={ButtonLabels.SET}
                    onRightPress={this.onSetPress.bind(this)}
                    />
                <ScrollView indicatorStyle="white">
                    <ListView
                        style={listViewStyle}
                        enableEmptySections
                        dataSource={this.dataSource}
                        renderRow={this.renderRow}
                        renderSeparator={(sectionId, rowId) => <View key={rowId} style={Styles.separator} />}
                        />
                </ScrollView>
            </View>
        );
    }
}

RingToneList.propTypes = propTypes;

const mapStateToProps = (state) => {
    const { ringToneList, ringTone, tmpRingTone } = state.timer;
    return { ringToneList, ringTone, tmpRingTone };
};

export default connect(mapStateToProps, {
    changeRingTone,
    choosingRingTone
})(RingToneList);
