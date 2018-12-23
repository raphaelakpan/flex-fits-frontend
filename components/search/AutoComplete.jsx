import { Component, Fragment } from 'react';
import Downshift, { resetIdCounter } from 'downshift';
import { ApolloConsumer } from 'react-apollo';
import debounce from 'lodash.debounce';
import Router from 'next/router';
import { DropDown, DropDownItem, SearchStyles } from '../styles/DropDown';
import { SEARCH_ITEMS_QUERY } from '../queries/search';
import Spinner from '../common/Spinner';

class AutoComplete extends Component {
  state = {
    items: [],
    loading: false,
    searchTerm: '',
    open: false,
  }

  handleChange = e => {
    this.setState({ searchTerm: e.target.value });
    if (!this.state.open) this.setOpen(true);
  }

  search = debounce(async (e, client) => {
    const searchTerm = e.target.value;
    if (searchTerm.trim() === '') {
      this.resetItems();
      return;
    }

    this.toggleLoading();
    // manually query apollo
    const response = await client.query({
      query: SEARCH_ITEMS_QUERY,
      variables: { searchTerm },
    });
    this.setState({
      items: response.data.items,
    }, this.toggleLoading);
  }, 350);

  toggleLoading = () => {
    this.setState(({ loading }) => ({ loading: !loading }));
  }

  setOpen = open => {
    this.setState({ open });
  }

  resetItems = () => {
    this.setState({ items: [] });
  }

  routeToItem = async ({ id, title }) => {
    this.setState({ searchTerm: title }, () => this.setOpen(false));
    await Router.push({
      pathname: '/item',
      query: { id }
    });
    this.setState({ searchTerm: '' });
  }

  render() {
    const { items, loading, searchTerm, open } = this.state;

    resetIdCounter(); // to reset Downshit counter id on each (re)render
    return (
      <SearchStyles>
        <Downshift
          onChange={this.routeToItem}
          itemToString={item => item ? item.title : ''}
        >
          {({ getInputProps, getItemProps, highlightedIndex }) => (
            <div>
              <ApolloConsumer>
                {client =>
                  <input
                    {...getInputProps({
                      id: 'search',
                      type: 'search',
                      placeholder: 'Search for products',
                      className: loading ? 'loading': '',
                      value: searchTerm,
                      onChange: e => {
                        e.persist();
                        this.handleChange(e);
                        this.search(e, client);
                      },
                      onBlur: () => this.setOpen(false),
                      onFocus: () => this.setOpen(true),
                    })}
                  />
                }
              </ApolloConsumer>
              {!searchTerm && <i className="fas fa-search search__icon"></i>}
              {open && searchTerm && (
                <DropDown>
                  {loading && (
                    <DropDownItem className="no__pointer">
                      <Spinner />
                    </DropDownItem>
                  )}
                  {!loading && (
                    <Fragment>
                      <DropDownItem className="no__pointer">
                        <div className="results">
                          Results found: <strong>{ items.length }</strong>
                        </div>
                      </DropDownItem>
                      {items.map((item, index) =>
                        <DropDownItem
                          {...getItemProps({ item })}
                          key={item.id}
                          highlighted={index === highlightedIndex}
                        >
                          <img width="50" src={item.image} alt={item.title} />
                          {item.title}
                        </DropDownItem>
                      )}
                    </Fragment>
                  )}
                </DropDown>
              )}
            </div>
          )}
        </Downshift>
      </SearchStyles>
    )
  }
}

export default AutoComplete;
