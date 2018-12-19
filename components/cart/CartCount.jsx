import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { StyledCartCount, StyledCartCountAnimation } from '../styles/Cart';

const CartCount = ({ count }) => (
	<StyledCartCountAnimation>
		<TransitionGroup>
			<CSSTransition
				unmountOnExit
				className="count"
				classNames="count"
				key={count}
				timeout={{
					enter: 500,
					exit: 500
				}}
			>
				<StyledCartCount>{count}</StyledCartCount>
			</CSSTransition>
		</TransitionGroup>
	</StyledCartCountAnimation>
);

CartCount.propTypes = {
	count: PropTypes.number.isRequired
};

export default CartCount;
