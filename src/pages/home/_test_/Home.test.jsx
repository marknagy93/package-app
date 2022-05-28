import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Home from '../Home';

/*
    MEGJEGYZÉS:
    Nem írtam még tesztet eddig soha, az iskola tematikájába se nagyon volt benne, de igyekeztem utánajárni, hogyan tudnék elvégezni teszteket az oldalakra, így egy kis utánajárással sikerült ezeket a teszt kódokat megírnom.
*/

//Enzyme konfigurálása
Enzyme.configure({ adapter: new Adapter() });

// Home div megjelenésének tesztelése
describe('Home', () => {
    it('should show text', () => {
        const wrapper = shallow(<Home />);
        const text = wrapper.find('div div');
        expect(text.text()).toBe('Belépés ügyfélkéntBelépés futárként');
    });
});