import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Adminlogin from '../Adminlogin';

/*
    MEGJEGYZÉS:
    Nem írtam még tesztet eddig soha, az iskola tematikájába se nagyon volt benne, de igyekeztem utánajárni, hogyan tudnék elvégezni teszteket az oldalakra, így egy kis utánajárással sikerült ezeket a teszt kódokat megírnom.
*/

//Enzyme konfigurálása
Enzyme.configure({ adapter: new Adapter() });

// jest mock metódusa, hogy a teszt futása során ne fail-eljen el a useNavigate hook miatt.
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => (jest.fn())
  }));

// Adminlogin div megjelenésének tesztelése
describe('Adminlogin', () => {
    it('should show text', () => {
        const wrapper = shallow(<Adminlogin />);
        const text = wrapper.find('div');
        expect(text.text()).toBe('Bejelentkezés: Felhasználónév: Jelszó: Belépés');
    });
});