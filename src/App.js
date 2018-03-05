import React, { Component } from 'react';

import { connect } from 'react-redux';

import Header from './layout/Header';
import Main from './layout/Main';
import ProductDetail from './components/ProductDetail';
import debounce from 'lodash/debounce';
import { loadNextPage } from './store/actions';
class App extends Component {
  
  constructor(){
    super();
    this.debouncedLoad =  debounce(this.handleScroll, 100, {
       leading: true, trailing: true, maxWait: 1000
    });
  }
  handleScroll = (event) => {
      const target = event.target || event.srcElement;
      const scrollTop = target.scrollingElement.scrollTop;
      const offsetHeight = target.scrollingElement.offsetHeight;
      const clientHeight = target.scrollingElement.clientHeight;
      const { dispatch } = this.props;
      if ((clientHeight + scrollTop >= offsetHeight - 300) && !this.props.isLoading) 
        dispatch(loadNextPage());
  }
  componentDidMount () {
    window.addEventListener('scroll', this.debouncedLoad);
  }
  componentWillUnmount(){
    window.removeEventListener('scroll', this.debouncedLoad);
  }
  render() {
    return (
      [
        <Header key="header" />,
        <Main key="main" />,
        <ProductDetail key="product-detail"/>
      ]
    );
  }
}
const mapStateToProps = (state) => ({
  isLoading: state.products.fetching
})
export default connect(mapStateToProps)(App);
