import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import './ProgressBar.style';

import {
    LEFT,
    RIGHT
} from './ProgressBar.config'

const CHECKPOINT_WIDTH = 50; // px

/** @namespace Component/ProgressBar/Component */
export class ProgressBar extends PureComponent {
    static propTypes = {
        progressList: PropTypes.arrayOf(PropTypes.string),
        currentID: PropTypes.number
    };

    renderEdgeLine(side) {
        const {
            progressList,
            currentID
        } = this.props;
        
        return (
            <div
              block={`Line ${side}EdgeLine ${(side === LEFT || currentID > progressList.length - 1) && 'Filled'}`}
              style={{ width: `calc(${100 / (progressList.length + 1)}% - ${CHECKPOINT_WIDTH / 2}px` }}
            />
        );
    }

    renderCheckpoint(index) {
        const {
            currentID
        } = this.props;

        return (
            <div
              block={`Checkpoint ${currentID >= index && 'Filled'}`}
              style={currentID >= index ? { color: "white" } : {}}
            >
                {currentID > index ? '\u2713' : index + 1}
            </div>
        );
    }

    renderProgressLine(startCheckpointIndex) {
        const {
            progressList,
            currentID
        } = this.props;

        return (
            <div
                block={`Line ${currentID > startCheckpointIndex && 'Filled'}`}
                style={{width: `calc(${100 / (progressList.length + 1)}% - ${CHECKPOINT_WIDTH}px` }}
            />
        );
    }

    renderLabel(index) {
        const {
            progressList,
            currentID
        } = this.props;
        return (
            <div
                block={`Label`}
                style={index <= currentID ? {
                    width: `calc(${100 / (progressList.length + 1)}%`,
                    color: "black"
                } :
                {
                    width: `calc(${100 / (progressList.length + 1)}%` 
                }}
            >
                {progressList[index]}
            </div>
        );
    }

    render() {
        const {
            progressList
        } = this.props;

        return (

            <div
                block="ProgressBar"
            >
                <div block="Progress">
                    { this.renderEdgeLine(LEFT) }
                    { progressList.map((_, index) => {
                        return [
                            this.renderCheckpoint(index),
                            index !== progressList.length - 1 ? this.renderProgressLine(index) : <></>
                        ];
                    }).flat() }
                    { this.renderEdgeLine(RIGHT) }
                </div>
                <div block="Labels">
                    { progressList.map((_, index) => {
                        return this.renderLabel(index);
                    }) }
                </div>
            </div>
        );
    }
}

export default ProgressBar;
