import React from 'react'
import Slider from './Slider'

export class SlideOut extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      childPosition: Slider.CENTER,
      curChild: props.children,
      curUniqId: props.uniqId,
      prevChild: null,
      prevUniqId: null,
      animationCallback: null
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const prevUniqId = prevProps.uniqKey || prevProps.children.type;
    const uniqId = this.props.uniqKey || this.props.children.type;

    if (prevUniqId !== uniqId) {
      this.setState({
        childPosition: Slider.TO_LEFT,
        curChild: this.props.children,
        curUniqId: uniqId,
        prevChild: prevProps.children,
        prevUniqId,
        animationCallback: this.swapChildren
      });
    }
  }

  swapChildren = () => {
    this.setState({
      childPosition: Slider.FROM_RIGHT,
      prevChild: null,
      prevUniqId: null,
      animationCallback: null
    });
  };

  render() {
    return (
      <Slider
        position={this.state.childPosition}
        animationCallback={this.state.animationCallback}
      >
        {this.state.prevChild || this.state.curChild}
      </Slider>
    );
  }
}