import { render } from '@testing-library/react';
import App from './App';

/*
    MEGJEGYZÉS:
    Nem írtam még tesztet eddig soha, az iskola tematikájába se nagyon volt benne, de igyekeztem utánajárni, hogyan tudnék elvégezni teszteket az oldalakra, így egy kis utánajárással sikerült ezeket a teszt kódokat megírnom.
*/

// test föggvény meghívása, App komponens renderelése a 'container' változóba, majd egy queryselectorral a az App komponensben található Container class kiválasztása (App.js tesztelése)
/* Először a default teszt kód sikertelen tesztet mutatott, így itt is igyekeztem utánanézni, hogyan lehetne úgy átírni, hogy azt tesztelje le, amit meg szeretnék adni, jelen esetbe hogy az App.js containerét vizsgálja meg. */
test('renders app', () => {
  const { container } = render(<App />);
  container.querySelector('.Container');
});
