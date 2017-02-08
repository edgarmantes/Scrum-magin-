var React = require('react');




var List = React.createClass({

	deleteItem: function(index){
		
		console.log(index)
	},


	render: function(props){
		return (
			<li className='listItem' >
				<div className='entry'>{this.props.entry}</div>
				<div className='btn-container'>
					<input className="entry-btn" onClick={this.props.onClick} type='submit' value={this.props.btnOne} />
					<input className="entry-btn" onClick={this.props.onClickAdd} type='submit' value={this.props.btnTwo} />
				</div>
			</li>
		)
	}

})

module.exports = List;