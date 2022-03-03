import { ReactElement } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import 'Styles/components/view/motion.scss'

interface Props {
	variants: any
	component: ReactElement<any>
}

const ViewMotion: React.FC<Props> = (props) => {
	const { variants, component } = props

	const fromLeftVariants = {
		hidden: { opacity: 0, y: 0, x: -300 },
		visible: { opacity: 1, y: 0, x: 0 },
		exit: { opacity: 0, y: 0, x: -300 }
	}
	const fromRightVariants = {
		hidden: { opacity: 0, y: 0, x: 300 },
		visible: { opacity: 1, y: 0, x: 0 },
		exit: { opacity: 0, y: 0, x: 300 }
	}

	const motionProps = {
		whileInView: 'visible',
		initial: 'hidden',
		exit: 'exit',
		viewport: { once: true },
		transition: {
			type: 'spring',
			duration: 0.1,
			stiffness: 80,
			mass: .6
		},
		variants
	}

	return (
		<AnimatePresence>
			<motion.div {...motionProps}>
				<div className="animated-content">
					{component}
				</div>
			</motion.div>
		</AnimatePresence>
	)
}

export default ViewMotion