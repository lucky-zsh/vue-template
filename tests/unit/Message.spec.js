import { shallowMount } from '@vue/test-utils';
import Message from '../../src/Message.vue';

describe('Message', () => {
    it('renders props.msg when passed', () => {
        const msg = 'new message';
        const wrapper = shallowMount(Message, {
            propsData: { msg }
        });
        expect(wrapper.text()).toMatch(msg);
    });
});
