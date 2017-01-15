import React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import FilterMonitor from 'redux-devtools-filter-actions';
import {CHANGE_SOURCE_CODE, FETCH_SUBMISSIONS} from "./constants/ActionTypes";

const DevTools = createDevTools(
    <DockMonitor toggleVisibilityKey='ctrl-h'
                 changePositionKey='ctrl-q'
                 defaultIsVisible={false}>
        <FilterMonitor blacklist={[CHANGE_SOURCE_CODE, FETCH_SUBMISSIONS]}>
            <LogMonitor theme='tomorrow' />
        </FilterMonitor>
    </DockMonitor>
);

export default DevTools;