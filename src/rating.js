var React = require('react');
//You need this npm package to do createReactClass
var Rating = require('create-react-class');

    module.exports=Rating({
    propTypes: {
      disabled: true
    },
    getInitialState() {
      return {
        rating: this.props.rating || null,
        temp_rating: null
      };
    },
    rate(rating) {
      this.setState({
        rating: rating,
        temp_rating: rating
      });
    },
    star_over(rating) {
      this.state.temp_rating = this.state.rating;
      this.state.rating = rating;
      
      this.setState({
        rating: this.state.rating,
        temp_rating: this.state.temp_rating
      });
    },
    star_out() {
      this.state.rating = this.state.temp_rating;
      
      this.setState({ rating: this.state.rating });
    },
    render() {
      var stars = [];
      
      for(var i = 0; i < this.state.rating; i++) {
        var klass = 'star-rating__star';
        
        if (this.state.rating >= i && this.state.rating != null) {
          klass += ' is-selected';
        }
  
        stars.push(
          <label
          style={{color:'#FF9529'}}
            onClick={this.rate.bind(this, i)}
            onMouseOver={this.star_over.bind(this, i)}
            onMouseOut={this.star_out}>
        <i className="fa fa-star" aria-hidden="true"></i>
          </label>
        );
      }
      
      return (
        <div className="star-rating">
          {stars}
        </div>
      );
    }
  });
