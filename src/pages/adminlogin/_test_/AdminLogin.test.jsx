import {render, fireEvent} from '@testing-library/react';
import AdminLogin from '../Adminlogin';

it('checkAdminLoginSite', () => {
    const { queryByTitle } = render(<AdminLogin />);
    const login = queryByTitle("submit");
    expect(login).toBeTruthy();
});