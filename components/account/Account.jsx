import { Component } from 'react';
import Head from 'next/head';
import { StyledContainer } from '../styles/Page';
import CurrentUser from '../users/CurrentUser';
import { StyledAccount } from '../styles/Account';
import DisplayInfo from './DisplayInfo';
import ChangePassword from './ChangePassword';

const components = {
  displayInfo: 'DisplayInfo',
  changePassword: 'ChangePassword',
};

class Account extends Component {
  state = {
    selectedComponent: components.displayInfo,
  };

  handleSelect = selectedComponent => {
    this.setState({ selectedComponent });
  };

  render() {
    const { selectedComponent } = this.state;

    const handeleClassName = component =>
      selectedComponent === component ? 'active' : null;

    return (
      <CurrentUser>
        {({ currentUser }) => (
          <StyledContainer>
            <Head>
              <title>Flex Fits | Account Settings </title>
            </Head>
            <StyledAccount>
              <h1 className="centered">My Account Settings</h1>
              <div className="panel">
                <div className="left-panel">
                  <ul>
                    <li
                      className={handeleClassName(components.displayInfo)}
                      onClick={() => this.handleSelect(components.displayInfo)}
                    >
                      Display Info
                    </li>
                    <li
                      className={handeleClassName(components.changePassword)}
                      onClick={() =>
                        this.handleSelect(components.changePassword)
                      }
                    >
                      Change Password
                    </li>
                  </ul>
                </div>
                <div className="main-panel">
                  {selectedComponent === components.displayInfo && (
                    <DisplayInfo currentUser={currentUser} />
                  )}
                  {selectedComponent === components.changePassword && (
                    <ChangePassword />
                  )}
                </div>
              </div>
            </StyledAccount>
          </StyledContainer>
        )}
      </CurrentUser>
    );
  }
}

export default Account;
