import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AdminSite from '../AdminSite';

/*
    MEGJEGYZÉS:
    Nem írtam még tesztet eddig soha, az iskola tematikájába se nagyon volt benne, de igyekeztem utánajárni, hogyan tudnék elvégezni teszteket az oldalakra, így egy kis utánajárással sikerült ezeket a teszt kódokat megírnom.
*/

//Enzyme konfigurálása
Enzyme.configure({ adapter: new Adapter() });

// Adminsite div megjelenésének tesztelése
describe('AdminSite', () => {
    it('should show text', () => {
        const wrapper = shallow(<AdminSite />);
        const text = wrapper.find('div');
        expect(text.text()).toBe('Csomag adatai: Csomag mérete: (S,M,L,XL,XXL)Választott Box: A -> (S,M)B -> (L,XL)C -> (XXL)Átadás dátuma: Ideje: Ügyfél adatai: Azonosító: Jelszó: Email cím: JóváhagyCsomag sikeresen átadva!Kilépés');
    });
});