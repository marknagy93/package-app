# Csomag kezelő alkalmazás

 1. Rövid ismertető
 2. Célja
 3. Működése

## 1. Rövid ismertető
Ez az alkalmazás csomagok leadását és átvételét működteti. Lehetőségünk van futárként (mint admin), és felhasználóként bejelentkezni. 

## 2. Célja
Az alkalmazás célja, hogy csomagokat tudjunk futárként átadni a csomaghoz rendelt vásárló, avagy felhasználónak. Ezt a csomagot az ügyfél a csomaghoz rendelt azonosító és jelszó megadásával az ügyfél bejelentkezés felületen, helyes adatok megadását követően megtekintheti, jóváhagyhatja, és ezáltal átveheti.
## 3. Működése
### Bejelentkezés futárként:
A futár az adatbázisban eltárolt felhasználónév és jelszó segítségével be tud jelentkezni az 'adminsite' oldalra, ahol feladhatja az adott csomagot. Itt meg kell adnia a csomag méretét, a mérettől függően a boxot, ahova csomagot elhelyezi, az átadás dátumát és idejét, a csomaghoz tartozó ügyfél azonosítóját, jelszavát, és email címét. Ha minden adat kitöltésre került, a "Jóváhagy" gombbal, bekerül a rendszerbe az átadott csomag, amire az ügyfél hivatkozni tud, és átveheti az ügyfél bejelentkező felületen.
### Bejelentkezés ügyfélként:
Ügyfélként lehetőségünk van a kapott azonosító és jelszó alapján a csomagunkat a rendszerből átvenni. Helyes adatok megadása után megtekinthetjük a csomag adatait, és ha mindent rendben találtunk, jóváhagyva átvehetjük a csomagot.
## Végrehajtott tesztek:

1. Home oldal megjelenésének tesztelése

Teszt kód:

import  React  from  'react';
import  Enzyme, { shallow } from  'enzyme';
import  Adapter  from  'enzyme-adapter-react-16';
import  Home  from  '../Home';
/*
MEGJEGYZÉS:
Nem írtam még tesztet eddig soha, az iskola tematikájába se nagyon volt benne, de igyekeztem utánajárni, hogyan tudnék elvégezni teszteket az oldalakra, így egy kis utánajárással sikerült ezeket a teszt kódokat megírnom.
*/

//Enzyme konfigurálása
Enzyme.configure({ adapter:  new  Adapter() });

// Home div megjelenésének tesztelése
describe('Home', () => {
	it('should show text', () => {
	const  wrapper = shallow(<Home  />);
	const  text = wrapper.find('div div');
	expect(text.text()).toBe('Belépés ügyfélkéntBelépés futárként');
	});
});

2. Adminlogin oldal megjelenésének tesztelése

Teszt kód:

import  React  from  'react';
import  Enzyme, { shallow } from  'enzyme';
import  Adapter  from  'enzyme-adapter-react-16';
import  Adminlogin  from  '../Adminlogin';

//Enzyme konfigurálása
Enzyme.configure({ adapter:  new  Adapter() });

// jest mock metódusa, hogy a teszt futása során ne fail-eljen el a useNavigate hook miatt.
jest.mock('react-router-dom', () => ({
...jest.requireActual('react-router-dom'),
useNavigate: () => (jest.fn())
}));

// Adminlogin div megjelenésének tesztelése
describe('Adminlogin', () => {
it('should show text', () => {
const  wrapper = shallow(<Adminlogin  />);
const  text = wrapper.find('div');
expect(text.text()).toBe('Bejelentkezés: Felhasználónév: Jelszó: Belépés');
});
});

3. Adminsite oldal megjelenésének tesztelése

Teszt kód:

import  React  from  'react';
import  Enzyme, { shallow } from  'enzyme';
import  Adapter  from  'enzyme-adapter-react-16';
import  AdminSite  from  '../AdminSite';

//Enzyme konfigurálása
Enzyme.configure({ adapter:  new  Adapter() });

// Adminsite div megjelenésének tesztelése
describe('AdminSite', () => {
it('should show text', () => {
const  wrapper = shallow(<AdminSite  />);
const  text = wrapper.find('div');
expect(text.text()).toBe('Csomag adatai: Csomag mérete: (S,M,L,XL,XXL)Választott Box: A -> (S,M)B -> (L,XL)C -> (XXL)Átadás dátuma: Ideje: Ügyfél adatai: Azonosító: Jelszó: Email cím: JóváhagyCsomag sikeresen átadva!Kilépés');
});
});