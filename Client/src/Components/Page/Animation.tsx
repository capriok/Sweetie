import { motion } from 'framer-motion'

import 'Styles/components/page/animation.scss'

interface Props {
	dir: string
}

const PageAnimation: React.FC<Props> = (props) => {
	const { dir, children } = props

	const leftVariants = {
		initial: { opacity: 0, y: 0, x: -350 },
		animate: { opacity: 1, y: 0, x: 0 },
		exit: { opacity: 0, y: 0, x: -350 }
	}
	const rightVariants = {
		initial: { opacity: 0, y: 0, x: 350 },
		animate: { opacity: 1, y: 0, x: 0 },
		exit: { opacity: 0, y: 0, x: 350 }
	}

	let variants = dir === 'right'
		? rightVariants
		: leftVariants

	const animationProps = {
		initial: 'initial',
		animate: 'animate',
		exit: 'exit',
		transition: {
			type: 'spring',
			stiffness: 80,
			mass: .6
		},
		variants
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