var React = require('react');

var List = React.createClass({

	render: function(props){
		return (
			<li className='listItem' >
				<div className='entry'>{this.props.entry}</div>
				<div className='btn-container'>
					<input className={"entry-btn back" + this.props.moveBack} onClick={this.props.onClick} type="button"/>
					<input className={"entry-btn forward" + this.props.moveForward} onClick={this.props.onClickAdd} type="button"/>
				</div>
			</li>
		)
	}

})

module.exports = List;