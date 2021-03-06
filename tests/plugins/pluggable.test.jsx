// Copyright (c) 2017-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import React from 'react';
import {mount, shallow} from 'enzyme';

import Pluggable from 'plugins/pluggable/pluggable.jsx';
import {mountWithIntl} from 'tests/helpers/intl-test-helper';
import ProfilePopover from 'components/profile_popover.jsx';

class ProfilePopoverPlugin extends React.PureComponent {
    render() {
        return <span id='pluginId'>{'ProfilePopoverPlugin'}</span>;
    }
}

describe('plugins/Pluggable', () => {
    beforeEach(() => {
        window.mm_config = {
            EnableWebrtc: 'true',
            ShowEmailAddress: 'true'
        };
    });

    test('should match snapshot with no overridden component', () => {
        const wrapper = mountWithIntl(
            <Pluggable
                components={{}}
                theme={{}}
            >
                <ProfilePopover
                    user={{name: 'name'}}
                    src='src'
                />
            </Pluggable>
        );
        expect(wrapper).toMatchSnapshot();
    });

    test('should match snapshot with overridden component', () => {
        const wrapper = mount(
            <Pluggable
                components={{ProfilePopover: {component: ProfilePopoverPlugin}}}
                theme={{id: 'theme_id'}}
            >
                <ProfilePopover
                    user={{name: 'name'}}
                    src='src'
                />
            </Pluggable>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('#pluginId').text()).toBe('ProfilePopoverPlugin');
    });

    test('should match snapshot with overridden component with pluggableName', () => {
        const wrapper = mountWithIntl(
            <Pluggable
                pluggableName='ProfilePopover'
                components={{ProfilePopover: {component: ProfilePopoverPlugin}}}
                theme={{id: 'theme_id'}}
            >
                <ProfilePopover
                    user={{name: 'name'}}
                    src='src'
                />
            </Pluggable>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('#pluginId').text()).toBe('ProfilePopoverPlugin');
    });

    test('should return null if neither pluggableName nor children is is defined in props', () => {
        const wrapper = shallow(
            <Pluggable
                components={{ProfilePopover: {component: ProfilePopoverPlugin}}}
                theme={{id: 'theme_id'}}
            />
        );

        expect(wrapper.type()).toBe(null);
    });

    test('should return null if with pluggableName but no children', () => {
        const wrapper = shallow(
            <Pluggable
                pluggableName='ProfilePopover'
                components={{}}
                theme={{id: 'theme_id'}}
            />
        );

        expect(wrapper.type()).toBe(null);
    });
});
