var React = require('react');




var List = React.createClass({

	deleteItem: function(index){
		
		console.log(index)
	},


	render: function(props){
		return (
			<li className='listItem' >{this.props.entry}
				<input className="entry-btn" onClick={this.props.onClick} type='submit' value={this.props.btnOne} />
				<input className="entry-btn" onClick={this.props.onClickAdd} type='submit' value={this.props.btnTwo} />
			</li>
		)
	}

})

module.exports = List;