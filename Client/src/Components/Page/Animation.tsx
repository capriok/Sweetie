import { motion } from 'framer-motion'

import 'Styles/components/page/animation.scss'

const PageAnimation: React.FC = (props) => {
	const { children } = props

	const animationProps = {
		initial: 'initial',
		animate: 'animate',
		exit: 'exit',
		style: { width: '100%' },
		transition: {
			type: 'spring',
			stiffness: 80,
			mass: .6
		},
		variants: {
			initial: { opacity: 0, y: 0, x: 350 },
			animate: { opacity: 1, y: 0, x: 0 },
			exit: { opacity: 0, y: 0, x: -350 }
		}
	}

	return (
		<motion.div {...animationProps}>
			<div className="page-animation">
				{children}
			</div>
		</motion.div>
	)
}

export default PageAnimation